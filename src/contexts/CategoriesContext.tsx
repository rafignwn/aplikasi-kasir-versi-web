import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getCategories } from "../functions/getCategories";
import { ICategory } from "../interface/categories";

export interface ICategoriesContext {
  categories: Array<ICategory>;
  setCategories: Dispatch<SetStateAction<Array<ICategory>>>;
}

const INITIAL_STATE: ICategoriesContext = {
  categories: [],
  setCategories: () => {},
};

export const CategoriesContext: React.Context<ICategoriesContext> =
  createContext(INITIAL_STATE);

export default function CategoriesContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [categories, setCategories] = useState<Array<ICategory>>([]);

  useEffect(() => {
    async function fetchItems() {
      const data = await getCategories();
      setCategories(data);
    }

    fetchItems();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
}
