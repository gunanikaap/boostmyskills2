"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Award, Check, CircleCheck, Lock, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CourseListing } from "@/data/courses-catalogue";
import type { LearnUnit, QuizQuestion } from "@/lib/learn";
import type { CompletionSummary } from "@/lib/completion";

type Attempt = { selected: number[]; isCorrect: boolean | null; correct: number[] | null };
type AttemptMap = Record<string, Attempt>;

// ---------- YouTube IFrame API (auto-complete at 90% watched) ----------
type YTPlayer = { getDuration?: () => number; getCurrentTime?: () => number; destroy?: () => void };
type YTNamespace = { Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer };
let ytReady: Promise<void> | null = null;
function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const w = window as unknown as { YT?: YTNamespace; onYouTubeIframeAPIReady?: () => void };
  if (w.YT?.Player) return Promise.resolve();
  if (ytReady) return ytReady;
  ytReady = new Promise((resolve) => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    const prev = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => { prev?.(); resolve(); };
  });
  return ytReady;
}

function VideoUnit({ unit, completed, onComplete }: { unit: Extract<LearnUnit, { type: "video" }>; completed: boolean; onComplete: () => void }) {
  const holder = useRef<HTMLDivElement>(null);
  const fired = useRef(completed);

  useEffect(() => {
    fired.current = completed;
  }, [completed]);

  useEffect(() => {
    let player: YTPlayer | null = null;
    let timer: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;
    const init = async () => {
      await loadYouTubeApi();
      if (cancelled || !holder.current) return;
      const w = window as unknown as { YT?: YTNamespace };
      if (!w.YT?.Player) return;
      const mount = document.createElement("div");
      holder.current.innerHTML = "";
      holder.current.appendChild(mount);
      player = new w.YT.Player(mount, {
        videoId: unit.youtubeId,
        host: "https://www.youtube-nocookie.com",
        playerVars: { rel: 0, modestbranding: 1 }
      });
      timer = setInterval(() => {
        try {
          const d = player?.getDuration?.() ?? 0;
          const t = player?.getCurrentTime?.() ?? 0;
          if (d > 0 && t / d >= 0.9 && !fired.current) {
            fired.current = true;
            onComplete();
          }
        } catch {
          /* player not ready yet */
        }
      }, 3000);
    };
    void init();
    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      try { player?.destroy?.(); } catch { /* ignore */ }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit.youtubeId]);

  return (
    <>
      <div className="bms-learn-video" ref={holder} />
      <p className="bms-learn-video-hint">{completed ? "Watched ✓ — this video is marked complete." : "This video is marked complete automatically once you have watched 90%."}</p>
    </>
  );
}

// ---------- One-attempt MCQ set ----------
function McqQuestion({
  question,
  index,
  courseSlug,
  attempt,
  onAttempt
}: {
  question: QuizQuestion;
  index: number;
  courseSlug: string;
  attempt?: Attempt;
  onAttempt: (questionId: string, result: Attempt, summary: CompletionSummary | null) => void;
}) {
  const [selected, setSelected] = useState<Set<number>>(new Set(attempt?.selected ?? []));
  const [submitting, setSubmitting] = useState(false);
  const locked = Boolean(attempt);

  const toggle = (i: number) => {
    if (locked) return;
    setSelected((prev) => {
      const next = new Set(question.multiple ? prev : []);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const submit = async () => {
    if (locked || selected.size === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/courses/mcq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug, questionId: question.id, selected: [...selected] })
      });
      const payload = (await res.json()) as { selected?: number[]; isCorrect?: boolean | null; correct?: number[] | null; summary?: CompletionSummary | null };
      if (res.ok) {
        onAttempt(
          question.id,
          { selected: payload.selected ?? [...selected], isCorrect: payload.isCorrect ?? null, correct: payload.correct ?? null },
          payload.summary ?? null
        );
      }
    } catch {
      /* allow retry on network error (no attempt was recorded) */
    }
    setSubmitting(false);
  };

  const chosen = attempt ? new Set(attempt.selected) : selected;
  const correct = attempt?.correct ?? null;
  const verdict = attempt ? attempt.isCorrect : null;

  return (
    <fieldset className="bms-learn-question">
      <legend>
        <span className="bms-learn-qnum">Question {index + 1}</span>
        <span className="bms-learn-qhint">{question.multiple ? "Select all that apply" : "Select one answer"}{locked ? " · submitted" : ""}</span>
      </legend>
      <p className="bms-learn-qprompt">{question.prompt}</p>
      {question.options.map((option, i) => {
        const isChosen = chosen.has(i);
        const isAnswer = locked && correct?.includes(i);
        const wrongChosen = locked && isChosen && correct && !correct.includes(i);
        return (
          <label className={`bms-learn-option${isChosen ? " is-chosen" : ""}${isAnswer ? " is-answer" : ""}${wrongChosen ? " is-wrong" : ""}${locked ? " is-locked" : ""}`} key={i}>
            <input checked={isChosen} disabled={locked} onChange={() => toggle(i)} type={question.multiple ? "checkbox" : "radio"} />
            <span>{option}</span>
          </label>
        );
      })}
      {locked ? (
        <>
          {verdict === null ? (
            <p className="bms-learn-feedback bms-learn-feedback-neutral">Your response has been recorded. The answer key for this question is not available locally yet.</p>
          ) : verdict ? (
            <p className="bms-learn-feedback bms-learn-feedback-correct">Correct.</p>
          ) : (
            <p className="bms-learn-feedback bms-learn-feedback-incorrect">Incorrect. The correct answer is: {(correct ?? []).map((i) => question.options[i]).join(", ")}.</p>
          )}
          <p className="bms-learn-locked"><Lock aria-hidden="true" size={13} /> You have already submitted this answer.</p>
        </>
      ) : (
        <button className="bms-learn-check" disabled={selected.size === 0 || submitting} onClick={() => void submit()} type="button">
          {submitting ? "Submitting…" : "Submit answer"}
        </button>
      )}
    </fieldset>
  );
}

function QuizSet({
  questions,
  courseSlug,
  attempts,
  onAttempt
}: {
  questions: QuizQuestion[];
  courseSlug: string;
  attempts: AttemptMap;
  onAttempt: (questionId: string, result: Attempt, summary: CompletionSummary | null) => void;
}) {
  return (
    <div className="bms-learn-quiz">
      <p className="bms-learn-quiz-warn">Each question can be answered <strong>once</strong>. Your answer is final after you submit it.</p>
      {questions.map((q, i) => (
        <McqQuestion attempt={attempts[q.id]} courseSlug={courseSlug} index={i} key={q.id} onAttempt={onAttempt} question={q} />
      ))}
    </div>
  );
}

function InteractiveActivity({ unit }: { unit: Extract<LearnUnit, { type: "interactive" }> }) {
  const [embedded, setEmbedded] = useState(false);
  if (unit.embedUrl) {
    return (
      <div className="bms-learn-activity">
        <h3 className="bms-learn-activity-title">{unit.title}</h3>
        {embedded ? (
          <div className="bms-learn-activity-frame">
            <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture" allowFullScreen src={unit.embedUrl} title={unit.title} />
          </div>
        ) : (
          <button className="bms-learn-play" onClick={() => setEmbedded(true)} type="button"><Play aria-hidden="true" fill="currentColor" size={18} /> {unit.launchLabel}</button>
        )}
        {unit.helperText ? <p className="bms-learn-activity-help">{unit.helperText}</p> : null}
      </div>
    );
  }
  return (
    <div className="bms-learn-activity">
      <h3 className="bms-learn-activity-title">{unit.title}</h3>
      {unit.externalLaunchUrl ? (
        <a className="bms-learn-play" href={unit.externalLaunchUrl} rel="noopener noreferrer" target="_blank"><Play aria-hidden="true" fill="currentColor" size={18} /> {unit.launchLabel}</a>
      ) : (
        <button className="bms-learn-play" disabled type="button"><Play aria-hidden="true" fill="currentColor" size={18} /> {unit.launchLabel}</button>
      )}
      {unit.status ? <span className="bms-learn-status">Status: {unit.status}</span> : null}
      {unit.helperText ? <p className="bms-learn-activity-help">{unit.helperText}</p> : null}
    </div>
  );
}

function CertificatePanel({ course, summary, issued }: { course: CourseListing; summary: CompletionSummary | null; issued: boolean }) {
  if (!summary) return null;
  const eligible = summary.eligible || issued;
  return (
    <div className={`bms-learn-cert${eligible ? " is-eligible" : ""}`}>
      <div className="bms-learn-cert-head">
        <Award aria-hidden="true" size={20} />
        <h3>Certificate</h3>
        {summary.totalMcq > 0 ? <span className="bms-learn-cert-score">Score: {summary.mcqScorePercent}%</span> : null}
      </div>
      {eligible ? (
        <>
          <p className="bms-learn-cert-msg">{issued ? "Your certificate has been issued." : "You have met all requirements — your certificate is ready."}</p>
          <a className="bms-learn-cert-btn" href={`/api/certificates/${course.slug}`}>
            <Award aria-hidden="true" size={16} /> Download certificate
          </a>
        </>
      ) : (
        <ul className="bms-learn-cert-reasons">
          {summary.reasons.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      )}
    </div>
  );
}

function UnitBody({
  unit,
  courseSlug,
  completed,
  attempts,
  onComplete,
  onAttempt
}: {
  unit: LearnUnit;
  courseSlug: string;
  completed: boolean;
  attempts: AttemptMap;
  onComplete: () => void;
  onAttempt: (questionId: string, result: Attempt, summary: CompletionSummary | null) => void;
}) {
  if (unit.type === "reading") {
    return (
      <>
        {unit.blocks.map((block, index) =>
          block.type === "list" ? (
            <ul className="bms-learn-bullets" key={index}>{block.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
          ) : (
            <p className="bms-learn-text" key={index}>{block.text}</p>
          )
        )}
      </>
    );
  }
  if (unit.type === "outline") {
    return (
      <ol className="bms-learn-outline">
        {unit.items.map((item, index) => (
          <li key={index}><span className="bms-learn-outline-num">{index + 1}</span><span>{item}</span></li>
        ))}
      </ol>
    );
  }
  if (unit.type === "video") return <VideoUnit completed={completed} onComplete={onComplete} unit={unit} />;
  if (unit.type === "quiz") return <QuizSet attempts={attempts} courseSlug={courseSlug} onAttempt={onAttempt} questions={unit.questions} />;
  if (unit.type === "interactive") return <InteractiveActivity unit={unit} />;
  return (
    <div className="bms-learn-exercise">
      <p className="bms-learn-exercise-tag">Interactive exercise</p>
      <p className="bms-learn-text">This is a graded exercise from the course. Work through it, then mark it complete to track your progress.</p>
    </div>
  );
}

export function CoursePlayer({
  course,
  units,
  completedUnits,
  attempts: initialAttempts,
  summary: initialSummary,
  certificateIssued
}: {
  course: CourseListing;
  units: LearnUnit[];
  completedUnits: string[];
  attempts: AttemptMap;
  summary: CompletionSummary | null;
  certificateIssued: boolean;
}) {
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set(completedUnits));
  const [attempts, setAttempts] = useState<AttemptMap>(initialAttempts);
  const [summary, setSummary] = useState<CompletionSummary | null>(initialSummary);
  const [saving, setSaving] = useState(false);

  const unit = units[active];
  const isDone = unit ? completed.has(unit.id) : false;
  const isQuiz = unit?.type === "quiz";

  const markComplete = async (unitId: string) => {
    if (completed.has(unitId)) return;
    setSaving(true);
    try {
      const response = await fetch("/api/courses/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug: course.slug, unitId })
      });
      if (response.ok) {
        const payload = (await response.json()) as { summary?: CompletionSummary | null };
        setCompleted((prev) => new Set(prev).add(unitId));
        if (payload.summary) setSummary(payload.summary);
      }
    } catch {
      /* keep state; user can retry */
    }
    setSaving(false);
  };

  const onAttempt = (questionId: string, result: Attempt, newSummary: CompletionSummary | null) => {
    setAttempts((prev) => ({ ...prev, [questionId]: result }));
    if (newSummary) setSummary(newSummary);
  };

  return (
    <div className="bms-learn">
      <aside className="bms-learn-sidebar">
        <Link className="bms-learn-back" href="/dashboard"><ArrowLeft aria-hidden="true" size={16} /> Back to dashboard</Link>
        <p className="bms-learn-eyebrow">{course.code} | {course.project}</p>
        <h1 className="bms-learn-course-title">{course.title}</h1>
        <p className="bms-learn-progress">{summary ? `${summary.completionPercent}% complete` : `${completed.size} / ${units.length} complete`}</p>
        <ol className="bms-learn-units">
          {units.map((item, index) => (
            <li key={item.id}>
              <button className={index === active ? "is-active" : undefined} onClick={() => setActive(index)} type="button">
                {completed.has(item.id) ? <CircleCheck aria-hidden="true" className="bms-learn-tick" size={18} /> : <span className="bms-learn-dot" />}
                <span>{item.title}</span>
              </button>
            </li>
          ))}
        </ol>
        <CertificatePanel course={course} issued={certificateIssued} summary={summary} />
      </aside>

      <main className="bms-learn-main">
        {unit ? (
          <>
            {"section" in unit && unit.section ? <p className="bms-learn-section-eyebrow">{unit.section}</p> : null}
            <h2 className="bms-learn-unit-title">{unit.title}</h2>
            <UnitBody
              attempts={attempts}
              completed={isDone}
              courseSlug={course.slug}
              onAttempt={onAttempt}
              onComplete={() => void markComplete(unit.id)}
              unit={unit}
            />
            <div className="bms-learn-actions">
              <button className="bms-learn-nav" disabled={active === 0} onClick={() => setActive((i) => Math.max(0, i - 1))} type="button"><ArrowLeft aria-hidden="true" size={16} /> Previous</button>
              {isQuiz ? (
                <span className="bms-learn-quiz-progress">Answers are saved automatically</span>
              ) : (
                <button className="bms-learn-complete" disabled={isDone || saving} onClick={() => void markComplete(unit.id)} type="button">
                  <Check aria-hidden="true" size={16} /> {isDone ? "Completed" : saving ? "Saving…" : "Mark as complete"}
                </button>
              )}
              <button className="bms-learn-nav" disabled={active === units.length - 1} onClick={() => setActive((i) => Math.min(units.length - 1, i + 1))} type="button">Next <ArrowRight aria-hidden="true" size={16} /></button>
            </div>
          </>
        ) : (
          <p className="bms-learn-text">This course&apos;s learning units are being prepared.</p>
        )}
      </main>
    </div>
  );
}
