import { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContext";

export default function Produk() {
  const { items } = useContext(ItemsContext);

  return (
    <div className="h-full w-full">
      <div className="bg-green-100 rounded-md w-full h-full p-3">
        <h1 className="text-green-800 text-xl font-bold">Data Produk</h1>

        {items.map((p) => (
          <div className="p-3 text-green-800 border-b border-green-800">
            <div className="flex justify-between items-center">
              <div className="p-3">
                <p>{p.name}</p>
                <p>{p.sellingPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
