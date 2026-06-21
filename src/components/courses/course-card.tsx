import Image from "next/image";
import Link from "next/link";
import type { MicroCredential, Programme } from "@/data/courses";
import { CourseEnrolButton } from "@/components/courses/course-enrol-button";
import { ProgrammeEnrolButton } from "@/components/courses/programme-enrol-button";

export function CourseCard({ item, type }: { item: Programme | MicroCredential; type: "micro-programme" | "micro-credential" }) {
  const isProgramme = type === "micro-programme" && "credentialTitles" in item;
  const programme = isProgramme ? (item as Programme) : null;
  const credential = isProgramme ? null : (item as MicroCredential);
  const detailHref = programme ? "/micro-programmes/" + programme.slug : "/micro-credentials/" + item.slug;
  const meta = programme ? programme.code + " | " + programme.project : item.project;
  const items: string[] = programme ? programme.credentialTitles : (credential?.programmeTitles ?? []);

  return (
    <article className="bms-program-card">
      <Link aria-label={item.title} href={detailHref}>
        <div className="bms-card-image">
          <Image alt={item.title} className="object-cover transition duration-300 hover:scale-[1.03]" fill loading="eager" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" src={item.image} />
        </div>
      </Link>
      <div className="bms-card-body">
        <h3 className="bms-card-title">
          <Link href={detailHref}>{item.title}</Link>
        </h3>
        <div className="mb-8">
          <p className="bms-card-meta">{meta}</p>
          <p className="bms-card-list-title">{isProgramme ? "Includes the following micro-credentials:" : "Included in:"}</p>
        </div>
        <ul className="bms-card-list">
          {items.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
        <div className="bms-card-actions">
          {programme ? (
            <ProgrammeEnrolButton className="bms-pill" slug={programme.slug} />
          ) : (
            <CourseEnrolButton className="bms-pill" slug={item.slug} />
          )}
        </div>
      </div>
    </article>
  );
}
