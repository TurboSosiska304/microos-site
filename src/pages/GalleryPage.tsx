import { VersionGallery } from "../components/VersionGallery";
import SiteChrome from "../components/SiteChrome";
import { SITE_BASE } from "../config";
import { useLocale } from "../i18n";

/** The gallery has its own address; the home page keeps only a one-line teaser. */
export default function GalleryPage() {
  const { t } = useLocale();

  return (
    <SiteChrome>
      <main id="main">
        <div className="mx-auto max-w-[1320px] px-5 pt-8 md:px-10 md:pt-12">
          <a
            href={SITE_BASE}
            className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            ← {t.gallery.back}
          </a>
        </div>
        <VersionGallery />
      </main>
    </SiteChrome>
  );
}
