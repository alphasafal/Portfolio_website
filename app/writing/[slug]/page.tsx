import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllEssaySlugs, getEssay } from "@/lib/writing";

export function generateStaticParams() {
  return getAllEssaySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then((p) => {
    const essay = getEssay(p.slug);
    if (!essay) return {};
    return { title: essay.title, description: essay.excerpt };
  });
}

export default async function WritingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) notFound();

  return (
    <main className="min-h-screen bg-bg">
      <article className="max-site section max-w-2xl mx-auto">
        <Link href="/#writing" className="text-sm text-muted hover:text-accent transition">
          ← Back to writing
        </Link>
        <p className="label mt-8">{essay.date}</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-foreground">{essay.title}</h1>
        <p className="mt-4 text-lg text-muted">{essay.excerpt}</p>
        <div className="mt-10 space-y-5 text-foreground leading-relaxed">
          {essay.body.split("\n\n").map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
