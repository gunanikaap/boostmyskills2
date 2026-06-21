import type { Metadata } from "next";
import { CoursesListing } from "@/components/courses/courses-listing";

export const metadata: Metadata = {
  title: "Courses | BoostMySkills"
};

export default function CoursesPage() {
  return <CoursesListing />;
}
