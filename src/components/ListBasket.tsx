import { useEffect, useState } from "react";
import { IBasketItem } from "../contexts/BasketContext";

interface IListBasket {
  basket: IBasketItem;
  onActive: () => void;
  onNonActive: () => void;
}

function ListBasket({ basket, onActive, onNonActive }: IListBasket) {
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (active) {
      onActive();
    } else {
      onNonActive();
    }
  }, [active]);

  return (
    <div
      onClick={() => setActive((act) => !act)}
      className={`my-4 cursor-pointer grid grid-cols-12 border-b pb-2 ${
        active && "text-blue-700"
      }`}
    >
      <p className="leading-4 col-span-4">{basket.name}</p>
      <p className="font-semibold text-center col-span-1">{basket.qty}</p>
      <p className="text-right font-semibold col-span-3">
        {`Rp. ${(
          basket.sellingPrice -
          (basket.sellingPrice * basket.diskon) / 100
        ).toLocaleString("id-ID")}`}
      </p>
      <p className="text-right font-semibold col-span-4">
        {`Rp. ${basket.total.toLocaleString("id-ID")}`}
      </p>
    </div>
  );
}

export default ListBasket;
