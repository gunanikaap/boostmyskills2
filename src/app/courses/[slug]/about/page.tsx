import { notFound, redirect } from "next/navigation";
import { getCourseByLegacyId, getCourseBySlug } from "@/data/courses-catalogue";

// Handles the legacy Open edX path shape /courses/<course-v1:...>/about by redirecting
// to the clean local detail route. Never depends on the old external site.
export default async function LegacyCourseAboutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug) ?? getCourseByLegacyId(slug);
  if (course) redirect(`/courses/${course.slug}`);
  notFound();
}
