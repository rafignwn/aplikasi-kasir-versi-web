import { AllApplication, Box, Exchange, Tag } from "@icon-park/react";
import { NavLink } from "../components";
import { Outlet } from "react-router-dom";

export default function Management() {
  return (
    <div className="bg-gray-100 p-5 w-full h-full grid grid-cols-8 gap-6">
      <div className="col-span-2">
        <h2 className="text-center text-[2rem] px-4 py-2 border-r-4 border-b-4 border-yellow-500 bg-yellow-100 mx-10 rounded-md">
          <span className="text-blue-600 font-bold">BaJay</span>
          <br />
          <span className="text-yellow-500 font-semibold">POS</span>
        </h2>

        {/* menu */}
        <div className="mt-10 px-5">
          <NavLink to="/" Icon={AllApplication} title="Home" />
          <NavLink to="/produk" Icon={Box} title="Produk" />
          <NavLink to="/category" Icon={Tag} title="Kategori" />
          <NavLink to="/transaksi" Icon={Exchange} title="Data Transaksi" />
        </div>
        {/* end menu */}
      </div>
      <div className="px-5 col-span-6 row-span-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
