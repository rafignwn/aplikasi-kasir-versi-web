import { useContext, useState } from "react";
import { ItemsContext } from "../contexts/ItemsContext";
import IItem from "../interface/Items";
import deleteItem from "../functions/deleteItems";
import { ModalAddItem } from "../components";

export default function Produk() {
  const { items, setItems } = useContext(ItemsContext);
  const [selectedItem, setSelectedItem] = useState<IItem | undefined>(
    undefined
  );
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);

  function closeModalUpdate() {
    setIsModalUpdateOpen(false);
  }

  function openModalUpdate() {
    setIsModalUpdateOpen(true);
  }

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
    <>
      <div className="h-full w-full">
        <div className="bg-green-100 rounded-md w-full h-full p-3">
          <h1 className="text-green-800 text-xl font-bold">Data Produk</h1>

          {items.map((p) => (
            <div
              key={p.id}
              className="p-3 text-green-800 border-b border-green-800"
            >
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
                  <button
                    onClick={() => {
                      setSelectedItem(p);
                      openModalUpdate();
                    }}
                    className="mx-4 bg-blue-200 text-blue-600 px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ModalAddItem
        onClose={closeModalUpdate}
        isOpen={isModalUpdateOpen}
        item={selectedItem}
      />
    </>
  );
}
