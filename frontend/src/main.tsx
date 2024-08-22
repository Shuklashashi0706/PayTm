import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from 'react-redux';
import { store } from './utils/store.ts';

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
  <Provider store={store}>
      <App />
  </Provider>
    </StrictMode>
  </BrowserRouter>
);
