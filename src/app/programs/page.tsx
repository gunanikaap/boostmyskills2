import type { Metadata } from "next";
import { CourseCard } from "@/components/courses/course-card";
import { publishedProgrammes } from "@/data/courses";

export const metadata: Metadata = {
  title: "Micro-programmes | BoostMySkills"
};

export default function ProgramsPage() {
  return (
    <section className="bms-section bms-catalogue">
      <span className="bms-section-eyebrow">Catalogue</span>
      <h1 className="bms-section-title">Micro-programmes</h1>
      <div className="bms-program-grid">
        {publishedProgrammes.map((programme) => (
          <CourseCard item={programme} key={programme.id} type="micro-programme" />
        ))}
      </div>
    </section>
  );
}
