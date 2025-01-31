import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getTransactions } from "../functions/getTransaction";
import ITransaction from "../interface/transaction";

export interface ITransactionsContext {
  transactions: Array<ITransaction>;
  setTransactions: Dispatch<SetStateAction<Array<ITransaction>>>;
  refresh: () => void;
}

const INITIAL_STATE: ITransactionsContext = {
  transactions: [],
  setTransactions: () => {},
  refresh: () => {},
};

export const TransactionsContext: React.Context<ITransactionsContext> =
  createContext(INITIAL_STATE);

export default function TransactionsContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [transactions, setTransactions] = useState<Array<ITransaction>>([]);

  async function fetchItems() {
    const data = await getTransactions();
    setTransactions(data);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, setTransactions, refresh: fetchItems }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
