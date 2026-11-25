import compositionVii from "../assets/composition-vii-1913.jpg";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import { versions, type VersionEntry } from "../gallery";
import { useLocale } from "../i18n";

function VersionCard({ entry }: { entry: VersionEntry }) {
  const { t } = useLocale();
  const stable = entry.status === "stable";

  return (
    <article className="kin-card flex h-full flex-col overflow-hidden">
      {entry.art === "kandinsky" ? (
        <div className="relative">
          <img
            src={compositionVii}
            alt={t.hero.art.alt}
            width={1000}
            height={657}
            loading="lazy"
            decoding="async"
            className="h-44 w-full rounded-t-[19px] object-cover"
          />
          <span className="absolute bottom-3 left-3 rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_68%,transparent)] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-[var(--ink)] backdrop-blur-md">
            {t.gallery.source}
          </span>
        </div>
      ) : (
        <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-t-[19px] bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-3)_100%)]">
          <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--bg)_55%,transparent)]" />
          <span className="relative font-grotesk text-[clamp(2.8rem,7vw,4.2rem)] font-bold tracking-[-0.06em] text-[var(--ink-strong)]">
            v{entry.version}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
            MICRO OS {entry.version}
          </span>
          <span
            className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em] ${
              stable
                ? "border-[color-mix(in_srgb,var(--accent)_45%,transparent)] text-[var(--accent)]"
                : "border-[var(--line)] text-[var(--accent-3)]"
            }`}
          >
            {stable ? t.gallery.statusStable : t.gallery.statusPlan}
          </span>
        </div>

        <h3 className="mt-5 font-grotesk text-[26px] font-bold leading-tight tracking-[-0.03em] text-[var(--ink-strong)]">
          {entry.name || "—"}
        </h3>

        {entry.painter && (
          <p className="mt-1.5 font-grotesk text-[12.5px] leading-relaxed text-[var(--muted)]">
            {[entry.painter, entry.artwork, entry.year].filter(Boolean).join(" · ")}
          </p>
        )}

        <div className="flex-1" />
        <div className="border-t border-[var(--line)] pt-4">
          <p className="font-mono text-[9px] leading-relaxed tracking-[0.03em] text-[var(--faint)]">
            {entry.artNote
              ? `${t.gallery.artworkLabel}: ${entry.artNote}`
              : t.gallery.plannedNote}
          </p>
          <p className="mt-1 font-mono text-[9px] leading-relaxed tracking-[0.03em] text-[var(--faint)]">
            {t.gallery.releaseLabel}: {entry.date || "—"}
          </p>
        </div>
      </div>
    </article>
  );
}

/** The gallery of versions: each card pairs a release with the work that named it. */
export function VersionGallery() {
  const { t } = useLocale();

  return (
    <section id="gallery" className="mx-auto max-w-[1320px] px-5 pb-20 md:px-10 md:pb-28">
      <Reveal className="max-w-3xl">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[var(--accent)]">
          {t.gallery.kicker}
        </p>
        <h2 className="mt-4 font-grotesk text-[clamp(2.2rem,5.4vw,4.6rem)] font-bold uppercase leading-[0.9] tracking-[-0.05em] text-[var(--ink-strong)]">
          {t.gallery.titleA} <br />
          <span className="kin-gradient-text">{t.gallery.titleB}</span>
        </h2>
        <p className="mt-6 max-w-xl font-grotesk text-[14.5px] leading-[1.75] text-[var(--muted)]">
          {t.gallery.lead}
        </p>
      </Reveal>

      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
        {versions.map((entry) => (
          <StaggerItem key={entry.version}>
            <VersionCard entry={entry} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
