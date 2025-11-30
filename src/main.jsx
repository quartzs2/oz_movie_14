import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "./index.css";
import { Toaster } from "sonner";

import App from "./App.jsx";

const STALE_TIME_MS = 1000 * 60 * 5; // 5분
const GC_TIME_MS = 1000 * 60 * 30; // 30분
const RETRY_COUNT = 1;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: GC_TIME_MS,
      retry: RETRY_COUNT,
      staleTime: STALE_TIME_MS,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
