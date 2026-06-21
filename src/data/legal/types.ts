export type LegalSegment = { text: string; bold?: boolean };

export type LegalBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text?: string; segments?: LegalSegment[] }
  | { type: "list"; items: string[] };

export type LegalPageData = {
  slug: string;
  title: string;
  blocks: LegalBlock[];
};
