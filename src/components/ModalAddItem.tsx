import { ImageFiles } from "@icon-park/react";
import { useContext, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { addItem } from "../functions";
import toast from "react-hot-toast";
import { ItemsContext } from "../contexts/ItemsContext";
import { IItemAdd } from "../functions/addItems";
import { Mosaic } from "react-loading-indicators";
import InputRp, { formatRupiah } from "./InputRp";
import IItem from "../interface/Items";
import { updateItem } from "../functions/updateItem";

interface IPropsAddModalItem {
  isOpen: boolean;
  onClose: () => void;
  item?: IItem;
}

function ModalAddItem({ isOpen, onClose, item }: IPropsAddModalItem) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imgName, setImageName] = useState<string>("");
  const { setItems } = useContext(ItemsContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [hargaBeli, setHargaBeli] = useState<number>(0);
  const [hargaJual, setHargaJual] = useState<number>(0);

  useEffect(() => {
    if (item) {
      setSelectedCategory(item.categori);
      setHargaBeli(item.purchasePrice);
      setHargaJual(item.sellingPrice);
    }
  }, [item]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // mengambil file gambar
    const file: File = formData.get("imageItem") as File;
    const itemData: IItemAdd = {
      name: formData.get("name") as string,
      categori: selectedCategory,
      purchasePrice: hargaBeli,
      sellingPrice: hargaJual,
      stock: Number(formData.get("qty")),
      diskon: Number(formData.get("diskon")),
    };

    const data = item?.id
      ? await updateItem(
          { ...itemData, imageUrl: item.imageUrl },
          item.id,
          file
        )
      : await addItem(itemData, file);

    setSelectedCategory("");
    if (data) {
      // memperbarui isi variable items
      item
        ? setItems((items) =>
            items.map((item) => {
              if (item.id == data.id) {
                return data;
              }
              return item;
            })
          )
        : setItems((items) => [...items, data]);
      // menutup modal tambah item
      onClose();
      // menampilkan notif sukses
      setLoading(false);
      return toast.success(
        !item ? "Berhasil menambahkan item" : "Berhasil mengupdate data"
      );
    } else {
      onClose();
      setLoading(false);
      return toast.error("Gagal menambahkan item");
    }
  }

  console.log(selectedCategory);

  return (
    <div className="left-0 top-0 absolute w-[100vw] h-[100vh] z-50 grid place-items-center">
      <div
        className="bg-white shadow-lg p-5 pt-10 rounded-md grid grid-cols-1 w-fit gap-x-5 relative"
        ref={modalRef}
      >
        {loading && (
          <div className="absolute w-full h-full backdrop-blur-md col-span-1 left-0 top-0 text-yellow-400 z-50 bg-white opacity-60 grid place-items-center">
            <Mosaic
              color="#facc15"
              size="medium"
              text="Uploading..."
              textColor="#0284c7"
            />
          </div>
        )}
        <p className="bg-white px-4 py-2 w-fit rounded-md font-bold -top-4 -translate-x-1/2 left-1/2 absolute text-lg uppercase">
          Form Add Item
        </p>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit}
          action="#"
        >
          <input
            required
            autoFocus={true}
            placeholder="Name of Item"
            value={item?.name}
            name="name"
            type="text"
            className="font-semibold px-4 py-2 rounded-md focus:border-[3px] focus:border-sky-400 focus:outline-none border w-[24rem]"
          />
          {/* react select */}
          <Select
            placeholder="Choose Category"
            styles={{
              container: (provided) => ({
                ...provided,
                border: "none",
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "#9CA3AF",
              }),
              control: (provided, state) => ({
                ...provided,
                borderRadius: "6px",
                paddingLeft: "4px",
                paddingBlock: "3px",
                boxShadow: state.isFocused ? "none" : provided.boxShadow, // Menghilangkan box-shadow ketika fokus
                border: state.isFocused
                  ? "3px solid #38bdf8"
                  : "1px solid #EBEDF0", // Mengubah warna border saat focus
                "&:hover": {
                  borderColor: state.isFocused
                    ? "#38bdf8"
                    : provided.borderColor, // Border color saat hover
                },
              }),
            }}
            onChange={(selected) =>
              setSelectedCategory(selected?.value as string)
            }
            options={[
              { value: "makanan", label: "Makanan" },
              { value: "minuman", label: "Minuman" },
              { value: "atk", label: "Alat Tulis Kantor" },
              { value: "atribut", label: "Atribut Sekolah" },
              { value: "sparepart", label: "Sparepart Motor" },
              { value: "kosmetik", label: "Kosmetik" },
              { value: "sembako", label: "Sembako" },
              { value: "elektronik", label: "Elektronik" },
            ]}
            className="font-semibold rounded-md focus:border focus:border-sky-400 focus:outline-none border w-[24rem]"
          />
          {/* end react select */}
          {/* <input
            required
            placeholder="Purchase price"
            name="purchasePrice"
            type="number"
            className="font-semibold px-4 py-2 rounded-md focus:border-[3px] focus:border-sky-400 focus:outline-none border w-[24rem]"
          /> */}

          <InputRp
            className="font-semibold px-4 py-2 rounded-md focus:border-[3px] focus:border-sky-400 focus:outline-none border w-[24rem]"
            id="hargaBeli"
            placeholder="Harga Beli"
            defaultValue={
              item ? formatRupiah(item?.purchasePrice.toString()) : ""
            }
            setValue={(value) => setHargaBeli(value)}
          />

          <InputRp
            className="font-semibold px-4 py-2 rounded-md focus:border-[3px] focus:border-sky-400 focus:outline-none border w-[24rem]"
            id="hargaJual"
            defaultValue={
              item ? formatRupiah(item?.sellingPrice.toString()) : ""
            }
            placeholder="Harga Jual"
            setValue={(value) => setHargaJual(value)}
          />

          <input
            placeholder="Diskon (%)"
            max={100}
            type="number"
            value={item?.diskon}
            name="diskon"
            className="font-semibold px-4 py-2 rounded-md focus:border-[3px] focus:border-sky-400 focus:outline-none border w-[24rem]"
          />

          <input
            placeholder="Qty"
            type="number"
            value={item?.stock}
            name="qty"
            className="font-semibold px-4 py-2 rounded-md focus:border-[3px] focus:border-sky-400 focus:outline-none border w-[24rem]"
          />

          <label
            htmlFor="inputImage"
            className="w-[24rem] flex items-center gap-5 cursor-pointer"
          >
            <ImageFiles size={32} />
            <p className="font-semibold text-gray-400 flex-grow max-w-[19rem] break-words">
              {imgName || "Choose Image Item"}
            </p>
            <input
              onChange={(e) => setImageName(e.target.value)}
              id="inputImage"
              className="hidden"
              name="imageItem"
              type="file"
              accept="image/*"
            />
          </label>

          <div className="mt-5 grid grid-cols-2 gap-10">
            <button
              onClick={onClose}
              type="button"
              className="bg-gray-400 font-bold px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-400 font-bold px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalAddItem;
