import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { LocaleProvider } from "./i18n";
import KineticPage from "./pages/KineticPage";
import { ThemeProvider } from "./theme";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<KineticPage />} />
            <Route path="/kinetic" element={<KineticPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LocaleProvider>
    </ThemeProvider>
  );
}
