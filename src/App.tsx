import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import EditorialPage from "./pages/EditorialPage";
import IndexPage from "./pages/IndexPage";
import KineticPage from "./pages/KineticPage";
import TerminalPage from "./pages/TerminalPage";
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
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/terminal" element={<TerminalPage />} />
          <Route path="/editorial" element={<EditorialPage />} />
          <Route path="/kinetic" element={<KineticPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
