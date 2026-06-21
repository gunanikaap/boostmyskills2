"use client";

import { ArrowRight, ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { coursesCatalogue, courseFacets, type Facet } from "@/data/courses-catalogue";
import { CourseEnrolButton } from "@/components/courses/course-enrol-button";

type FilterKey = "project" | "org" | "topic" | "programme";

const FILTERS: { key: FilterKey; label: string; options: Facet[] }[] = [
  { key: "project", label: "Project", options: courseFacets.project },
  { key: "org", label: "Organisation", options: courseFacets.org },
  { key: "topic", label: "Topic", options: courseFacets.topic },
  { key: "programme", label: "Micro-Programme", options: courseFacets.programme }
];

export function CoursesListing() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<FilterKey, string>>({
    project: "",
    org: "",
    topic: "",
    programme: ""
  });
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);

  // Search is the active filter over the live course set. The refine dropdowns mirror
  // the live facet lists exactly (names/counts) and keep their own selection state.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return coursesCatalogue;
    return coursesCatalogue.filter((course) =>
      `${course.title} ${course.org} ${course.code} ${course.project}`.toLowerCase().includes(q)
    );
  }, [query]);

  const setFilter = (key: FilterKey, value: string) => {
    setSelected((prev) => ({ ...prev, [key]: prev[key] === value ? "" : value }));
    setOpenFilter(null);
  };

  return (
    <section className="bms-courses">
      <h1 className="bms-courses-heading">Viewing {visible.length} courses</h1>
      <div className="bms-courses-layout">
        <div className="bms-courses-grid">
          {visible.map((course) => (
            <article className="bms-course-card" key={course.slug}>
              <Link className="bms-course-image" href={`/courses/${course.slug}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={`${course.title} ${course.code}`} loading="lazy" src={course.image} />
              </Link>
              <div className="bms-course-body">
                <span className="bms-course-org">{course.org}</span>
                <span className="bms-course-code">{course.code} | {course.project}</span>
                <h2 className="bms-course-title">
                  <Link href={`/courses/${course.slug}`}>{course.title}</Link>
                </h2>
                <div className="bms-course-actions">
                  <CourseEnrolButton className="bms-course-enrol" slug={course.slug} />
                  <Link className="bms-course-more" href={`/courses/${course.slug}`}>
                    More info
                    <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
          {visible.length === 0 ? <p className="bms-courses-empty">No courses match your search.</p> : null}
        </div>

        <aside className="bms-courses-sidebar">
          <label className="bms-courses-search">
            <Search aria-hidden="true" size={20} />
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for a course"
              type="search"
              value={query}
            />
          </label>
          <h2 className="bms-courses-refine">Refine Your Search</h2>
          {FILTERS.map((filter) => {
            const current = selected[filter.key];
            const isOpen = openFilter === filter.key;
            return (
              <div className="bms-course-filter" key={filter.key}>
                <button
                  aria-expanded={isOpen}
                  className="bms-course-dropbtn"
                  onClick={() => setOpenFilter(isOpen ? null : filter.key)}
                  type="button"
                >
                  <span className="bms-course-dropbtn-label">{filter.label}</span>
                  <span className="bms-course-dropbtn-value">{current || "All Default"}</span>
                  <ChevronDown aria-hidden="true" className="bms-course-dropbtn-arrow" size={20} />
                </button>
                {isOpen ? (
                  <ul className="bms-course-dropdown">
                    {filter.options.map((option) => (
                      <li key={option.name}>
                        <button
                          className={current === option.name ? "is-selected" : undefined}
                          onClick={() => setFilter(filter.key, option.name)}
                          type="button"
                        >
                          <span>{option.name}</span>
                          <span className="bms-course-dropdown-count">{option.count}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </aside>
      </div>
    </section>
  );
}
