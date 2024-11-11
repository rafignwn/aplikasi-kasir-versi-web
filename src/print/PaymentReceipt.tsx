import React, { useContext } from "react";
import { BasketContext } from "../contexts/BasketContext";
// import "./PaymentReceiptStyles.css";

export default React.forwardRef<HTMLDivElement, {}>(function PaymentReceipt(
  props,
  ref
) {
  const { baskets } = useContext(BasketContext);
  let totalAmount: number = 0;

  return (
    <div ref={ref} className="font-mono text-[12px] bg-white">
      <style type="text/css" media="print">
        {`
            @media print {
                @page {
                    size: 50mm ${40 + baskets.length * 11}mm;
                    margin: 5px;
                }
            }
        `}
      </style>
      <h1 className="text-center leading-4 text-[14px]">
        Struk Pembayaran <span className="font-bold text-sky-600">BaJay</span>
        <span className="font-semibold text-yellow-500">POS</span>
      </h1>
      {baskets.map((basket) => {
        totalAmount += basket.total;
        return (
          <div className="grid grid-cols-12 my-2 gap-2 place-items-center">
            <p className="leading-3 col-span-5">{basket.name}</p>
            <p className="col-span-1 text-center">{basket.qty}</p>
            <p className="col-span-3 text-right">
              {basket.sellingPrice.toLocaleString("id-ID")}
            </p>
            <p className="col-span-3 text-right">
              {basket.total.toLocaleString("id-ID")}
            </p>
          </div>
        );
      })}
      <div className="mt-4 py-1 border-y flex justify-between items-center ">
        <p className="font-bold tracking-widest">TOTAL</p>
        <p className="font-bold tracking-widest">
          {totalAmount.toLocaleString("id-ID")}
        </p>
      </div>
      <p className="font-thin text-center mt-5 leading-4">
        Terimakasih Atas Kunjunganya, Semoga Barang Yang Dibeli Bermanfaat
      </p>
    </div>
  );
});
