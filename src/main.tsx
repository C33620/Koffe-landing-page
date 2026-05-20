import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import I18nProvider from "./locales/I18nProvider";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
);
