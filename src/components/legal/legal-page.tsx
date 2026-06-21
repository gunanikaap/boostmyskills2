import type { LegalPageData } from "@/data/legal/types";

export function LegalPage({ data }: { data: LegalPageData }) {
  return (
    <section className={`bms-legal bms-legal--${data.slug}`}>
      <h1 className="bms-legal-title">{data.title}</h1>
      {data.blocks.map((block, index) => {
        if (block.type === "heading") {
          return <h2 className="bms-legal-heading" key={`heading-${index}`}>{block.text}</h2>;
        }
        if (block.type === "list") {
          return (
            <ul className="bms-legal-list" key={`list-${index}`}>
              {block.items.map((item, itemIndex) => (
                <li className="bms-legal-list-item" key={itemIndex}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p className="bms-legal-paragraph" key={`paragraph-${index}`}>
            {block.segments
              ? block.segments.map((segment, segmentIndex) =>
                  segment.bold ? (
                    <strong className="bms-legal-strong" key={segmentIndex}>{segment.text}</strong>
                  ) : (
                    <span key={segmentIndex}>{segment.text}</span>
                  )
                )
              : block.text}
          </p>
        );
      })}
    </section>
  );
}
