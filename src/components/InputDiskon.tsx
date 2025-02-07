import { useEffect, useState } from "react";

interface IDProps {
  defaultValue?: number;
  onChange: (diskon: number) => void;
}

export default function InputDiskon({ defaultValue = 0, onChange }: IDProps) {
  const [discountValue, setDiscountValue] = useState<number>(defaultValue);
  useEffect(() => {
    setDiscountValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    onChange(discountValue);
  }, [discountValue, onChange]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDiscountValue(Number(e.target.value));
  }

  return (
    <div className="">
      <input
        placeholder="Diskon (%)"
        type="number"
        max={100}
        min={0}
        defaultValue={discountValue}
        onChange={handleChange}
        name="diskon"
        className="font-semibold px-4 py-2 rounded-md focus:border-[3px] focus:border-sky-400 focus:outline-none border w-[8rem]"
      />
      <span className="inline-block ml-2 font-bold text-xl">%</span>
    </div>
  );
}
