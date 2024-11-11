import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import IItem from "../interface/Items";
import { getItems } from "../functions/getItems";

export interface IItemsContext {
  items: Array<IItem>;
  setItems: Dispatch<SetStateAction<Array<IItem>>>;
}

const INITIAL_STATE: IItemsContext = { items: [], setItems: () => {} };

export const ItemsContext: React.Context<IItemsContext> =
  createContext(INITIAL_STATE);

export default function ItemsContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [items, setItems] = useState<Array<IItem>>([]);

  useEffect(() => {
    async function fetchItems() {
      const data = await getItems();
      setItems(data);
    }

    fetchItems();
  }, []);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
}
