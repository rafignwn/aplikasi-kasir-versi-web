import { ArrowLeft } from "@icon-park/react";
import { Link } from "react-router-dom";

function BackBtn() {
  return (
    <>
      <Link
        to={"/"}
        className="flex w-fit items-center gap-3 font-bold text-nowrap uppercase no-underline px-4 py-2 rounded-md bg-amber-200"
      >
        <ArrowLeft color="#101010" size={28} /> Back
      </Link>
    </>
  );
}

export default BackBtn;
