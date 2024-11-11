import { Box, DashboardTwo, Exchange, Home, Log, Tag } from "@icon-park/react";
import { NavLink } from "../components";
import { Outlet } from "react-router-dom";

export default function Management() {
  return (
    <div className="bg-gray-100 p-5 w-full h-full grid grid-cols-8 gap-6">
      <div className="col-span-2">
        <h2 className="text-center text-[2rem] px-4 py-2 border-r-4 border-b-4 border-yellow-500 bg-yellow-100 mx-10 rounded-md">
          <span className="text-blue-600 font-bold">BaJay</span>
          <span className="text-yellow-500 font-semibold">POS</span>
        </h2>

        {/* menu */}
        <div className="mt-10 px-5">
          <NavLink to="/" Icon={Home} title="Home" />
          <NavLink to="/management" Icon={DashboardTwo} title="Dashboard" />
          <NavLink to="/item" Icon={Box} title="Items" />
          <NavLink to="/category" Icon={Tag} title="Category" />
          <NavLink to="/transaction" Icon={Exchange} title="Transaction" />
          <NavLink to="/report" Icon={Log} title="Report" />
        </div>
        {/* end menu */}
      </div>
      <div className="px-5 col-span-6">
        <Outlet />
      </div>
    </div>
  );
}
