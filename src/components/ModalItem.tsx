import { useContext, useEffect, useRef, useState } from "react";
// import { Plus, Minus } from "@icon-park/react";
import IItems from "../interface/Items";
import {
  BasketContext,
  IBasketItem,
  TBaskets,
} from "../contexts/BasketContext";

interface IPropsModalItem {
  isOpen: boolean;
  onClose: () => void;
  dataItem: IItems;
}

function ModalItem({ isOpen, onClose, dataItem }: IPropsModalItem) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [qty, setQty] = useState<number | string>("");
  const { baskets, setBaskets } = useContext(BasketContext);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setQty("");
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

  function handleAddToBasket() {
    if (qty === 0) {
      return false;
    }
    // add item to basket
    const newBasketItem: IBasketItem = {
      ...dataItem,
      key: baskets.length + 1,
      qty,
      total: dataItem.sellingPrice * (qty as number),
    } as IBasketItem;
    const newBaskets: TBaskets = baskets;
    newBaskets.push(newBasketItem);
    setBaskets(newBaskets);

    // clear qty value
    setQty("");

    // close modal
    onClose();
  }

  return (
    <div className="left-0 top-0 absolute w-[100vw] h-[100vh] z-50 grid place-items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Cegah reload halaman
          handleAddToBasket();
        }}
      >
        <div
          className="bg-white shadow-lg p-5 rounded-md grid grid-cols-2 w-[24rem] gap-x-5"
          ref={modalRef}
        >
          <div className="col-span-1">
            <img
              src={dataItem.imageUrl}
              alt={`Gambar Produk ${dataItem.name}`}
              className="w-36 object-cover rounded-md"
            />
            <h1 className="font-semibold mt-4">{dataItem.name}</h1>
          </div>
          <div className="col-span-1">
            <p className="font-semibold text-red-600 bg-red-100 px-4 py-1 rounded-md mb-4 w-fit">
              {`Rp. ${dataItem.sellingPrice.toLocaleString("id-ID")}`}
            </p>
            <p className="bg-yellow-100 text-yellow-600 px-4 py-1 font-bold tracking-wider rounded-md w-fit">
              Stock {dataItem.stock}
            </p>

            <label htmlFor="inputJumlah">
              <p className="font-semibold text-gray-700 tracking-wide mt-5 mb-3">
                Qty
              </p>
              <div className="grid grid-cols-2 w-full">
                <input
                  placeholder="0"
                  className="px-4 py-1 rounded-md font-bold text-lg shadow-inner border-4 focus:outline-none focus:border-gray-500 w-20"
                  type="number"
                  autoFocus
                  min={0}
                  value={qty}
                  onChange={(e) => setQty(e.target.valueAsNumber)}
                />
              </div>
            </label>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                onClose();
                setQty("");
              }}
              className="bg-gray-200 font-bold px-4 py-2 rounded-md shadow-md mt-5 block w-full col-span-1"
              type="button"
            >
              Batal
            </button>

            <button
              type="submit"
              className="bg-yellow-400 font-bold px-4 py-2 rounded-md shadow-md mt-5 block w-full col-span-1"
            >
              Beli
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ModalItem;
