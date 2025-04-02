import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.tsx";

import { ThemeProvider } from "./components/providers/theme-provider.tsx";
import QueryProvider from "./components/providers/query-provider.tsx";
import { SearchProvider } from "./contexts/search-context.tsx";
import { AuthProvider } from "./contexts/auth-context.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID!}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <AuthProvider>
            <BrowserRouter>
              <SearchProvider>
                <Toaster position="top-center" reverseOrder={false} />
                <App />
              </SearchProvider>
            </BrowserRouter>
          </AuthProvider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </QueryProvider>
  </StrictMode>
);
