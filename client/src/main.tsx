import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";

import { Toaster } from "@/components/ui/sonner";

import { ThemeProvider } from "./components/providers/theme-provider.tsx";
import QueryProvider from "./components/providers/query-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Toaster richColors closeButton />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>
);
