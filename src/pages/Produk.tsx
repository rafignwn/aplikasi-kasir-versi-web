import { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContext";
import IItem from "../interface/Items";
import deleteItem from "../functions/deleteItems";

export default function Produk() {
  const { items, setItems } = useContext(ItemsContext);

  async function fungsiHapus(data: IItem) {
    const isDelete = confirm(
      `Apakah anda ingin menghapus produk ${data.name}?`
    );

    if (isDelete) {
      const res: boolean = await deleteItem(data);
      if (res) {
        alert("Data Berhasil dihapus");
        setItems((item) => item.filter((i) => i.id !== data.id));
      }
    }
  }

  return (
    <div className="h-full w-full">
      <div className="bg-green-100 rounded-md w-full h-full p-3">
        <h1 className="text-green-800 text-xl font-bold">Data </h1>

        {items.map((p) => (
          <div className="p-3 text-green-800 border-b border-green-800">
            <div className="flex justify-between items-center">
              <div className="p-3">
                <p>{p.name}</p>
                <p>{p.sellingPrice}</p>
              </div>
              <div className="p-3">
                <button
                  onClick={() => fungsiHapus(p)}
                  className="bg-red-200 text-red-600 px-4 py-2 rounded-md"
                >
                  Hapus
                </button>
                <button className="mx-4 bg-blue-200 text-blue-600 px-4 py-2 rounded-md">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
