import type { CourseListing } from "@/data/courses-catalogue";
import { getCourseContent, type ContentBlock } from "@/data/courses-content";
import { CourseEnrolButton } from "@/components/courses/course-enrol-button";

const SOCIAL_ICONS = [
  { label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" }
];

function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) =>
        block.type === "list" ? (
          <ul className="bms-cd-bullets" key={index}>
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="bms-cd-text" key={index}>{block.text}</p>
        )
      )}
    </>
  );
}

export function CourseDetail({ course }: { course: CourseListing }) {
  const content = getCourseContent(course.slug);
  const courseNumber = `${course.code} | ${course.project}`;
  const createdBy = content?.createdBy ?? course.org;
  const sections = content?.contentSections ?? [];
  const modules = content?.modules ?? [];

  return (
    <article className="bms-cd">
      <header className="bms-cd-hero">
        <div className="bms-cd-hero-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={`${course.title} ${course.code}`} src={course.image} />
        </div>
        <div className="bms-cd-hero-info">
          <h1 className="bms-cd-title">{course.title}</h1>
          <p className="bms-cd-by">by {course.org}</p>
          <div className="bms-cd-hero-actions">
            <CourseEnrolButton slug={course.slug} />
            <div className="bms-cd-social" aria-hidden="true">
              {SOCIAL_ICONS.map((icon) => (
                <svg fill="currentColor" height="18" key={icon.label} role="img" viewBox="0 0 24 24" width="18">
                  <path d={icon.path} />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="bms-cd-body">
        <div className="bms-cd-main">
          {sections.length > 0 ? (
            sections.map((section, index) => (
              <section key={index}>
                <h2 className="bms-cd-heading">{section.title}</h2>
                <ContentBlocks blocks={section.blocks} />
              </section>
            ))
          ) : (
            <p className="bms-cd-text">
              {course.title} is a self-paced micro-credential delivered by {course.org} as part of the {course.project} project on BoostMySkills.
            </p>
          )}
        </div>

        <aside className="bms-cd-aside">
          <div className="bms-cd-meta">
            <p><span>ⓘ</span> Course Number: <strong>{courseNumber}</strong></p>
            {content?.workload ? <p><span>◷</span> {content.workload}</p> : null}
          </div>

          {modules.length > 0 ? (
            <div className="bms-cd-sections">
              <h2 className="bms-cd-sections-title">Sections</h2>
              <ol className="bms-cd-sections-list">
                {modules.map((module, index) => (
                  <li key={index}>
                    <span className="bms-cd-section-num">{index + 1}</span>
                    <span>{module}</span>
                  </li>
                ))}
              </ol>
              <p className="bms-cd-createdby">
                Created and delivered by:
                {createdBy.split(" — ").map((line, index) => (
                  <span key={index}>{line}</span>
                ))}
              </p>
            </div>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
