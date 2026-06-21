import Link from "next/link";
import type { CourseListing } from "@/data/courses-catalogue";
import { CourseEnrolButton } from "@/components/courses/course-enrol-button";

export function NotEnrolled({ course }: { course: CourseListing }) {
  return (
    <section className="bms-learn-locked">
      <p className="bms-learn-eyebrow">{course.code} | {course.project}</p>
      <h1 className="bms-learn-locked-title">{course.title}</h1>
      <p className="bms-learn-text">You are not enrolled in this course yet. Enrol to start learning.</p>
      <div className="bms-learn-locked-actions">
        <CourseEnrolButton className="bms-cd-enrol" slug={course.slug} />
        <Link className="bms-learn-back" href={`/courses/${course.slug}`}>View course details</Link>
      </div>
    </section>
  );
}
