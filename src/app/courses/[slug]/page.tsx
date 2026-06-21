import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CourseDetail } from "@/components/courses/course-detail";
import { coursesCatalogue, getCourseByLegacyId, getCourseBySlug } from "@/data/courses-catalogue";

export function generateStaticParams() {
  return coursesCatalogue.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Course | BoostMySkills" };
  return { title: `${course.title} | BoostMySkills` };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (course) return <CourseDetail course={course} />;
  // Support old Open edX ids, e.g. /courses/course-v1:Artemat+MC10_RES4CITY+2025_T01
  const legacy = getCourseByLegacyId(slug);
  if (legacy) redirect(`/courses/${legacy.slug}`);
  notFound();
}
