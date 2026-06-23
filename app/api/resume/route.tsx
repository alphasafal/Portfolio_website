import { renderToBuffer } from "@react-pdf/renderer";
import { ResumeDocument } from "@/lib/resume-pdf";

export async function GET() {
  const buffer = await renderToBuffer(<ResumeDocument />);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="safal-gupta-resume.pdf"',
    },
  });
}
