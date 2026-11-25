import { LocaleProvider } from "./i18n";
import GalleryPage from "./pages/GalleryPage";
import KineticPage from "./pages/KineticPage";
import { ThemeProvider } from "./theme";
import { useVariant } from "./useVariant";

/** A full page load is enough for one extra page: no router dependency. */
function isGalleryPath(pathname: string) {
  return pathname.replace(/\/+$/, "").endsWith("/gallery");
}

export default function App() {
  useVariant("kinetic");
  const gallery = isGalleryPath(window.location.pathname);

  return (
    <ThemeProvider>
      <LocaleProvider>{gallery ? <GalleryPage /> : <KineticPage />}</LocaleProvider>
    </ThemeProvider>
  );
}
