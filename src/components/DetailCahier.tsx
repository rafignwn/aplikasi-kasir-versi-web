import { ShoppingBag, Swipe, Delete, CloseOne } from "@icon-park/react";
import { BasketContext, TBaskets } from "../contexts/BasketContext";
import ListBasket from "./ListBasket";
import { FormEvent, useContext, useRef, useState } from "react";
import { addTransaction } from "../functions/addTransaction";
import toast from "react-hot-toast";
import PaymentReceipt from "../print/PaymentReceipt";
import { useReactToPrint } from "react-to-print";
import InputRp from "./InputRp";
import { ItemsContext } from "../contexts/ItemsContext";
// update minggu 19/01/25
import { getItems } from "../functions/getItems";

function DetailCashier() {
  const { baskets, setBaskets } = useContext(BasketContext);
  const componentRef = useRef<HTMLDivElement>(null);
  const [isAfterTransaction, setIsAfterTransaction] = useState<boolean>(false);
  const [onCheckout, setOnCheckout] = useState<boolean>(false);
  const [cash, setCash] = useState<number>(0);
  const handleToPrint = useReactToPrint({
    contentRef: componentRef,
  });
  const basketIsEmpty = baskets.length == 0;
  // update minggu 19/01/25
  const { setItems } = useContext(ItemsContext);

  const [keyActive, setKeyActive] = useState<Array<number>>([]);
  let total: number = 0;

  function handleOnActive(key: number) {
    setKeyActive((keyAct) => [...keyAct, key]);
  }

  function handleNonActive(key: number) {
    console.log("onNonactive");
    const newKeyActive = keyActive.filter((k) => k !== key);
    setKeyActive(newKeyActive);
  }

  function handleDeleteBasketItem() {
    let newBaskets: TBaskets = baskets;
    keyActive.forEach((key) => {
      newBaskets = newBaskets.filter((basket) => basket.key !== key);
    });

    setBaskets(newBaskets);
    setKeyActive([]);
  }

  async function handleCheckout() {
    const isTransaction = await addTransaction(baskets, total, "cash");

    if (isTransaction) {
      setOnCheckout(false);
      setIsAfterTransaction(true);

      // update minggu 19/01/25
      // memperbarui data items
      const data = await getItems();
      setItems(data);
    } else {
      return toast.error("Transaksi Gagal", { duration: 2000 });
    }
  }

  function handleEndTransaction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // mencetak struk
    handleToPrint();
    // mengkosongkan keranjang
    setBaskets([]);
    // menutup modal cetak struk
    setIsAfterTransaction(false);
    setCash(0);
    // menampilkan notifikasi berhasil
    return toast.success("Transaksi Berhasil 👌", { duration: 2000 });
  }

  function handleClose() {
    // mengkosongkan keranjang
    setBaskets([]);
    // menutup modal cetak struk
    setIsAfterTransaction(false);
    // menampilkan notifikasi berhasil
    return toast.success("Transaksi Berhasil 👌", { duration: 2000 });
  }

  // update minggu 19/01/25
  // menambahkan aksi tombol cancel ketika tidak jadi bayar
  function handleCancel() {
    setCash(0);
    setOnCheckout(false);
  }

  return (
    <>
      <div className="h-full grid grid-rows-6 gap-y-2">
        <div className="relative bg-red-300 row-span-5 p-4 rounded-md h-full shadow-md flex flex-col">
          <h2 className="font-bold flex justify-center items-center gap-2 text-lg bg-yellow-200 rounded-md px-4 py-1">
            <ShoppingBag size={24} theme="filled" fill={"#000"} />
            <span>Detail Pembelian</span>
            <ShoppingBag size={24} theme="filled" fill={"#a16207"} />
          </h2>
          {baskets?.length > 0 && (
            <>
              <div className="mt-4 mb-2 grid grid-cols-12">
                <p className="font-bold col-span-4">Item</p>
                <p className="font-bold col-span-1 text-center">Qty</p>
                <p className="font-bold text-right col-span-3">Price</p>
                <p className="font-bold col-span-4 text-right">Sub-Total</p>
              </div>
              {/* Pastikan kontainer ini menggunakan flex-grow */}
              <div className="overflow-y-auto h-0 scroll-smooth hide-scrollbar flex-grow max-h-full text-sm">
                {baskets.map((basketItem) => {
                  total += basketItem.total;
                  return (
                    <ListBasket
                      onActive={() => handleOnActive(basketItem.key)}
                      onNonActive={() => handleNonActive(basketItem.key)}
                      key={basketItem.key}
                      basket={basketItem}
                    />
                  );
                })}
              </div>
            </>
          )}
          {/* button delete */}
          {keyActive.length > 0 && (
            <button
              onClick={handleDeleteBasketItem}
              className="absolute z-10 bottom-4 left-4 bg-red-200 text-red-600 px-2 py-2 rounded-md"
            >
              <Delete size={26} theme="outline" />
            </button>
          )}
        </div>
        {/* bottom section */}
        <div className="row-span-1">
          {/* total section */}
          <h3 className="font-bold px-4 rounded-md shadow-md py-2 bg-white uppercase flex justify-between items-center tracking-widest">
            <span>Total</span>
            <span>{`Rp. ${total.toLocaleString("id-ID")}`}</span>
          </h3>
          {/* end total section */}

          {/* button checkout */}
          <button
            disabled={basketIsEmpty}
            onClick={() => setOnCheckout(true)}
            className={`bg-yellow-400 ${
              basketIsEmpty && "opacity-45"
            } uppercase flex justify-center items-center gap-2 w-full py-2 mt-2 tracking-wide rounded-md shadow-md font-bold`}
          >
            <Swipe size={24} fill={"black"} theme="outline" />
            <span>Checkout</span>
          </button>
          {/* end button checkout */}
          <div className="hidden">
            <PaymentReceipt ref={componentRef} />
          </div>
        </div>
        {/* end bottom section */}
      </div>

      {/* modal cetak struk */}
      {isAfterTransaction && (
        <div className="absolute z-20 w-[100vw] h-[100vh] grid place-items-center left-0 top-0">
          <div className="bg-white p-5 text-lg font-bold rounded-md shadow-md w-64 relative">
            <h3 className="text-center text-emerald-700">
              Transaction Successfull 👌
            </h3>
            <form action="#" onSubmit={handleEndTransaction}>
              <button
                type="submit"
                className=" mt-5 px-4 py-2 rounded-md block w-full bg-yellow-600 text-white font-bold tracking-wider uppercase"
              >
                print receipt
              </button>
            </form>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 shadow-md absolute bg-yellow-100 text-yellow-700 rounded-full -top-2 -right-2"
            >
              <CloseOne size={20} />
            </button>
          </div>
        </div>
      )}
      {/* end modal cetak struk */}

      {/* modal pembayaran */}
      {onCheckout && (
        <div className="absolute z-20 w-[100vw] h-[100vh] bg-white bg-opacity-40 backdrop-blur-md grid place-items-center left-0 top-0">
          <div className="text-lg font-bold w-88 relative">
            <div className="bg-white p-5 rounded-md shadow-md flex items-center justify-between">
              <h3 className="font-bold uppercase tracking-wide">total</h3>
              <h3 className="font-bold uppercase tracking-wide">{`Rp. ${total.toLocaleString(
                "id-ID"
              )}`}</h3>
            </div>
            <div className="mt-4 bg-white p-5 rounded-md shadow-md">
              <label htmlFor="InputTunai">
                <p className="font-semibold mb-2">Masukan Tunai</p>
              </label>
              <InputRp
                id="InputTunai"
                placeholder="Masukan Tunai" // update minggu 19/01/25
                setValue={setCash}
                className="px-4 py-2 w-full rounded-md border-[3px] focus:outline-none focus:border-sky-900"
              />
            </div>
            <div className="mt-4 bg-white shadow-md rounded-md p-5 flex items-center justify-between">
              <h3 className="font-bold">Kembalian</h3>
              <h3 className="font-bold">{`Rp. ${(cash - total).toLocaleString(
                "id-ID"
              )}`}</h3>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button
                onClick={handleCancel}
                className="col-span-1 block w-full text-center py-2 capitalize tracking-widest rounded-md text-gray-500 shadow-md border-r-4 border-b-4 border-gray-500 bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                className="col-span-1 block w-full text-center py-2 capitalize tracking-widest rounded-md text-sky-700 shadow-md border-r-4 border-b-4 border-sky-500 bg-sky-100"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
      {/* end modal pembayaran */}
    </>
  );
}

export default DetailCashier;
