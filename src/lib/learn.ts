import { getCourseContent, type ContentBlock } from "@/data/courses-content";
import { getCourseLearning } from "@/data/course-learning";
import { getInteractiveUnits, type InteractiveUnit } from "@/data/learn-extras";
import { getAnswerKey } from "@/data/quiz-answers";

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  multiple: boolean;
  correct?: number[]; // verified answer key (option indices); absent when not available
  explanation?: string;
};

export type LearnUnit =
  | { id: string; title: string; type: "reading"; blocks: ContentBlock[] }
  | { id: string; title: string; type: "outline"; items: string[] }
  | { id: string; title: string; type: "video"; youtubeId: string; section?: string }
  | { id: string; title: string; type: "quiz"; questions: QuizQuestion[]; section?: string }
  | { id: string; title: string; type: "exercise"; section?: string }
  | {
      id: string;
      title: string;
      type: "interactive";
      section?: string;
      activityType: InteractiveUnit["activityType"];
      launchLabel: string;
      status?: string;
      helperText?: string;
      embedUrl?: string;
      externalLaunchUrl?: string;
    };

// Quiz unit titles that are generic boilerplate in the source data (one per question). These are
// collapsed: a run of quiz questions becomes ONE quiz unit instead of many "Question" sidebar items.
const GENERIC_QUIZ_TITLE = /^(question|multiple\s*choice(\s*#?\d+)?|exercise(\s*-\s*multiple\s*(choice|answer))?|quiz|test)\s*$/i;

const isMeaningfulQuizTitle = (title: string) => title.trim().length > 0 && !GENERIC_QUIZ_TITLE.test(title.trim());

type RawQuiz = { t: string; q: { p: string; o: string[]; m: 0 | 1 } };
const isQuiz = (unit: unknown): unit is RawQuiz =>
  typeof unit === "object" && unit !== null && "q" in unit;

// Real learning units come from the live course player (Open edX blocks API): each course's
// YouTube videos, grouped quizzes/tests and graded exercises, in order, grouped by section. The
// scraped reading (overview / objectives / background) is shown first as the course introduction.
// Consecutive quiz questions are grouped into a SINGLE quiz unit (one sidebar entry, all questions
// on one page) so the player matches the live BoostMySkills course.
// getLearnUnits is a pure function of the static course data, but it is called multiple times per
// request (the learn page + indexCourseUnits/calculateCourseCompletion, the MCQ and progress
// routes). Memoise the built units per slug so the build runs once per course, not on every call.
const unitsCache = new Map<string, LearnUnit[]>();

export function getLearnUnits(slug: string): LearnUnit[] {
  const cached = unitsCache.get(slug);
  if (cached) return cached;
  const content = getCourseContent(slug);
  const units: LearnUnit[] = [];

  (content?.contentSections ?? []).forEach((section, index) => {
    units.push({ id: `reading-${index}`, title: section.title, type: "reading", blocks: section.blocks });
  });

  const sections = getCourseLearning(slug);
  const interactive = getInteractiveUnits(slug);
  const usedTitles = new Map<string, number>();
  let counter = 0;

  const uniqueTitle = (title: string) => {
    const seen = usedTitles.get(title) ?? 0;
    usedTitles.set(title, seen + 1);
    return seen === 0 ? title : `${title} (${seen + 1})`;
  };

  sections.forEach((section) => {
    let quizGroupIndex = 0;
    let openGroup: { unitId: string; questions: QuizQuestion[]; lead: string } | null = null;

    const flushGroup = () => {
      if (!openGroup) return;
      const meaningful = isMeaningfulQuizTitle(openGroup.lead);
      const baseTitle = meaningful
        ? openGroup.lead.trim()
        : isMeaningfulQuizTitle(section.title)
        ? `${section.title.trim()} — Exercise ${quizGroupIndex}`
        : `Exercise ${quizGroupIndex}`;
      units.push({
        id: openGroup.unitId,
        title: uniqueTitle(baseTitle),
        type: "quiz",
        questions: openGroup.questions,
        section: section.title
      });
      openGroup = null;
    };

    section.units.forEach((unit) => {
      if (isQuiz(unit)) {
        const meaningful = isMeaningfulQuizTitle(unit.t);
        // A meaningful title (e.g. "Exercise 1.2.1", "Final test") always starts a new set;
        // generic "Question"/"Multiple Choice" rows append to the current set.
        if (meaningful || !openGroup) {
          flushGroup();
          quizGroupIndex += 1;
          counter += 1;
          openGroup = { unitId: `quiz-${counter}`, questions: [], lead: unit.t };
        }
        const qIndex = openGroup!.questions.length;
        const key = getAnswerKey(slug, unit.q.p);
        openGroup!.questions.push({
          id: `${openGroup!.unitId}-q${qIndex}`,
          prompt: unit.q.p,
          options: unit.q.o,
          multiple: unit.q.m === 1,
          correct: key?.correct,
          explanation: key?.explanation
        });
        return;
      }

      // Non-quiz unit ends any open quiz set.
      flushGroup();
      counter += 1;
      if ("y" in unit) {
        units.push({ id: `v-${counter}`, title: unit.t, type: "video", youtubeId: unit.y, section: section.title });
      } else {
        units.push({
          id: `x-${counter}`,
          title: isMeaningfulQuizTitle(unit.t) ? unit.t : "Interactive exercise",
          type: "exercise",
          section: section.title
        });
      }
    });

    flushGroup();

    // Inject interactive activity units (e.g. Serious Game) after their section.
    interactive
      .filter((extra) => extra.section === section.title)
      .forEach((extra) => {
        counter += 1;
        units.push({
          id: `i-${counter}`,
          title: extra.title,
          type: "interactive",
          section: section.title,
          activityType: extra.activityType,
          launchLabel: extra.launchLabel,
          status: extra.status,
          helperText: extra.helperText,
          embedUrl: extra.embedUrl,
          externalLaunchUrl: extra.externalLaunchUrl
        });
      });
  });

  // Interactive units whose section wasn't found in the scraped data: append at the end.
  const placedSections = new Set(sections.map((s) => s.title));
  interactive
    .filter((extra) => !placedSections.has(extra.section))
    .forEach((extra) => {
      counter += 1;
      units.push({
        id: `i-${counter}`,
        title: extra.title,
        type: "interactive",
        section: extra.section,
        activityType: extra.activityType,
        launchLabel: extra.launchLabel,
        status: extra.status,
        helperText: extra.helperText,
        embedUrl: extra.embedUrl,
        externalLaunchUrl: extra.externalLaunchUrl
      });
    });

  if (!sections.length && content?.modules?.length) {
    units.push({ id: "outline", title: "Course outline", type: "outline", items: content.modules });
  }

  unitsCache.set(slug, units);
  return units;
}
