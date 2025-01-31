import React, { useContext, useEffect, useState } from "react";
import { TransactionsContext } from "../contexts/TransactionContext";
import ITransaction from "../interface/transaction";

export default function Transaksi() {
  const { transactions, refresh } = useContext(TransactionsContext);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ITransaction;
    direction: "ascending" | "descending";
  } | null>(null);

  const sortedTransactions = React.useMemo(() => {
    let sortableTransactions = [...transactions];
    if (sortConfig !== null) {
      sortableTransactions.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTransactions;
  }, [transactions, sortConfig]);

  const requestSort = (
    key: keyof ITransaction,
    direction?: "ascending" | "descending"
  ) => {
    let _direction: "ascending" | "descending" = direction
      ? direction
      : "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      _direction = "descending";
    }
    setSortConfig({ key, direction: _direction });
  };

  useEffect(() => {
    refresh();
    requestSort("timestamp", "ascending");
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8 h-full grid grid-rows-12">
      <h1 className="text-xl font-bold text-green-700">Data Transaksi</h1>
      <div className="row-span-12 overflow-auto bg-pink-200">
        <table className="min-w-full leading-normal bg-green-500">
          <thead className="bg-green-200 sticky top-0 z-10">
            <tr>
              <th
                onClick={() => requestSort("transactionNumber")}
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs text-green-800 font-bold uppercase tracking-wider cursor-pointer"
              >
                ID
              </th>
              <th
                onClick={() => requestSort("cashierId")}
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs text-green-800 font-bold uppercase tracking-wider cursor-pointer"
              >
                Cashier ID
              </th>
              <th
                onClick={() => requestSort("customerId")}
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs text-green-800 font-bold uppercase tracking-wider cursor-pointer"
              >
                Customer ID
              </th>
              <th
                onClick={() => requestSort("timestamp")}
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs text-green-800 font-bold uppercase tracking-wider cursor-pointer"
              >
                Timestamp
              </th>
              <th
                onClick={() => requestSort("totalAmount")}
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs text-green-800 font-bold uppercase tracking-wider cursor-pointer"
              >
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-5 font-bold py-5 border-b border-gray-200 bg-white text-sm">
                  {transaction.transactionNumber}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {transaction.cashierId}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {transaction.customerId}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {new Date(
                    transaction.timestamp.seconds * 1000
                  ).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {`Rp. ${transaction.totalAmount.toLocaleString("id-ID")}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
