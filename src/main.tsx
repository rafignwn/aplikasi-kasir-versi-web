import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import BasketContextProvider from "./contexts/BasketContext.tsx";
import ItemsContextProvider from "./contexts/ItemsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ItemsContextProvider>
      <BasketContextProvider>
        <App />
      </BasketContextProvider>
    </ItemsContextProvider>
  </StrictMode>
);
