import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { BrowserRouter } from "react-router";

import App from "./App.jsx";

// useFetch의 AbortController 때문에 로딩 상태가 표시되지 않아서 StrictMode를 사용하지 않음
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
