import { createContext, Dispatch, SetStateAction, useState } from "react";
import IItems from "../interface/Items";

// create interface basket item
export interface IBasketItem extends IItems {
  key: number;
  qty: number;
  total: number;
}

// create variable type for basket state
export type TBaskets = Array<IBasketItem>;
export type TBasketContext = {
  baskets: TBaskets;
  setBaskets: Dispatch<SetStateAction<TBaskets>>;
};
// create initial state with empty array
const INITIAL_STATE: TBasketContext = {
  baskets: [],
  setBaskets: () => {},
};

// create context
export const BasketContext = createContext<TBasketContext>(INITIAL_STATE);

export default function BasketContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [value, setValue] = useState<TBaskets>([]);

  return (
    <BasketContext.Provider value={{ baskets: value, setBaskets: setValue }}>
      {children}
    </BasketContext.Provider>
  );
}
