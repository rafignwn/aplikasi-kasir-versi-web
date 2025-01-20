import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import BasketContextProvider from "./contexts/BasketContext.tsx";
import ItemsContextProvider from "./contexts/ItemsContext.tsx";
import CategoriesContextProvider from "./contexts/categoriesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CategoriesContextProvider>
      <ItemsContextProvider>
        <BasketContextProvider>
          <App />
        </BasketContextProvider>
      </ItemsContextProvider>
    </CategoriesContextProvider>
  </StrictMode>
);
