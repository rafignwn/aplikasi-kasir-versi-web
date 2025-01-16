import React, { Dispatch, SetStateAction, useState } from "react";

// Fungsi untuk memformat angka menjadi format Rupiah
export function formatRupiah(value: string): string {
  let numberString = value.replace(/[^,\d]/g, "").toString();
  let split = numberString.split(",");
  let remainder = split[0].length % 3;
  let rupiah = split[0].substr(0, remainder);
  let thousand = split[0].substr(remainder).match(/\d{3}/gi);

  // Menambahkan titik sebagai pemisah ribuan
  if (thousand) {
    let separator = remainder ? "." : "";
    rupiah += separator + thousand.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return rupiah ? "Rp " + rupiah : "";
}

export default function InputRp({
  setValue,
  id,
  className,
  placeholder,
  defaultValue,
}: {
  setValue: Dispatch<SetStateAction<number>>;
  id: string;
  className: string;
  placeholder: string;
  defaultValue?: string;
}) {
  const [inputValue, setInputValue] = useState<string>(defaultValue || ""); // Untuk menyimpan format Rupiah

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Hanya angka yang diterima
    setValue(Number(value)); // Simpan nilai asli

    // Format nilai menjadi Rupiah
    const formattedValue = formatRupiah(value);
    setInputValue(formattedValue); // Simpan nilai yang diformat
  };

  return (
    <input
      id={id}
      type="text"
      value={inputValue} // Tampilkan nilai yang diformat (Rupiah)
      onChange={handleInputChange}
      placeholder={`${placeholder} Rp. 0`}
      className={className}
      autoFocus={true}
      inputMode="numeric" // Membatasi input hanya untuk angka di perangkat mobile
    />
  );
}
