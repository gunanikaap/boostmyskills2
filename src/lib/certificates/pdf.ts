import fs from "node:fs";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFImage } from "pdf-lib";

export type CertificateData = {
  learnerName: string;
  courseTitle: string;
  courseCode: string;
  project: string;
  org: string;
  certificateNumber: string;
  verificationHash: string;
  verificationUrl: string;
  issuedAt: Date;
  certificateType: string;
  scorePercent?: number | null;
};

const GREEN = rgb(0.027, 0.596, 0.271); // #079845
const DARK = rgb(0.039, 0.165, 0.2); // #0a2a33
const MUTED = rgb(0.42, 0.45, 0.47);

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

// Render a single-page A4-landscape "Certificate of Achievement" PDF (matches the live Open edX
// layout with BoostMySkills + EU-project branding). Deterministic — no headless browser needed.
export async function generateCertificatePdf(data: CertificateData): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`Certificate — ${data.courseTitle}`);
  doc.setAuthor("BoostMySkills");
  const page = doc.addPage([841.89, 595.28]); // A4 landscape
  const { width, height } = page.getSize();

  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const reg = await doc.embedFont(StandardFonts.Helvetica);
  const serif = await doc.embedFont(StandardFonts.TimesRomanBold);

  const center = (text: string, font: PDFFont, size: number, y: number, color = DARK) => {
    const w = font.widthOfTextAtSize(text, size);
    page.drawText(text, { x: (width - w) / 2, y, size, font, color });
  };

  // Outer + inner decorative border
  page.drawRectangle({ x: 18, y: 18, width: width - 36, height: height - 36, borderColor: GREEN, borderWidth: 3 });
  page.drawRectangle({ x: 28, y: 28, width: width - 56, height: height - 56, borderColor: rgb(0.8, 0.88, 0.82), borderWidth: 1 });

  // Logo (or text fallback)
  let logo: PDFImage | null = null;
  try {
    const bytes = fs.readFileSync(path.join(process.cwd(), "public", "logos", "boostmyskills-logo.png"));
    logo = await doc.embedPng(bytes);
  } catch {
    logo = null;
  }
  if (logo) {
    const lw = 150;
    const lh = (logo.height / logo.width) * lw;
    page.drawImage(logo, { x: (width - lw) / 2, y: height - 95, width: lw, height: lh });
  } else {
    center("boost my skills", bold, 22, height - 80, GREEN);
  }

  center("Certificate of Achievement", serif, 34, height - 165, DARK);
  center("This is to certify that", reg, 14, height - 205, MUTED);

  center(data.learnerName, bold, 30, height - 250, GREEN);
  page.drawLine({ start: { x: width / 2 - 200, y: height - 262 }, end: { x: width / 2 + 200, y: height - 262 }, thickness: 1, color: rgb(0.85, 0.85, 0.85) });

  center("has successfully completed the micro-credential", reg, 14, height - 295, MUTED);

  // Course title may be long — shrink to fit.
  let titleSize = 24;
  while (bold.widthOfTextAtSize(data.courseTitle, titleSize) > width - 160 && titleSize > 12) titleSize -= 1;
  center(data.courseTitle, bold, titleSize, height - 335, DARK);
  center(`${data.courseCode} · ${data.project}`, reg, 12, height - 360, MUTED);
  center(`issued by ${data.org} on BoostMySkills`, reg, 12, height - 380, MUTED);

  if (typeof data.scorePercent === "number") {
    center(`Assessment score: ${data.scorePercent}%`, reg, 12, height - 402, GREEN);
  }
  center(`Issued on ${formatDate(data.issuedAt)}`, bold, 13, height - 428, DARK);

  // Footer: certificate number + verification
  page.drawText(`Certificate no: ${data.certificateNumber}`, { x: 48, y: 70, size: 9, font: reg, color: MUTED });
  page.drawText(`Verify at: ${data.verificationUrl}`, { x: 48, y: 56, size: 9, font: reg, color: MUTED });
  const euText = "Co-funded by the European Union.";
  page.drawText(euText, { x: width - 48 - reg.widthOfTextAtSize(euText, 9), y: 70, size: 9, font: reg, color: MUTED });
  const typeText = `Type: ${data.certificateType}`;
  page.drawText(typeText, { x: width - 48 - reg.widthOfTextAtSize(typeText, 9), y: 56, size: 9, font: reg, color: MUTED });

  return doc.save();
}
