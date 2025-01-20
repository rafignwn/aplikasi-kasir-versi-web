import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-full w-full bg-gray-200 grid place-items-center">
      <div>
        <div className="p-10  flex justify-center">
          <h3 className="text-lg text-center animate-bounce w-fit">
            <span className="text-sky-600 text-[4rem] font-bold">BaJay</span>
            <span className="font-semibold text-yellow-400 text-[4rem] text sky-400">
              POS🎨
            </span>
          </h3>
        </div>
        <div className="p-10 bg-gradient-to-b from-red-100 to-red-300 shadow-md mt-10 relative">
          <p className="w-fit absolute font-bold tracking-widest text-lg text-yellow-600 -top-3  bg-gray-200 px-4 py-2 rounded-md animate-bounce">
            MENU
          </p>
          <div className="flex justify-center items-center gap-5 mt-10">
            <Link
              to={"/management"}
              className="px-5 py-2 w-fit rounded-md bg-yellow-200 font-bold text-lg tracking-wider text-yellow-800"
            >
              Product Managemant
            </Link>
            <Link
              to={"/cashier"}
              className="px-5 py-2 w-fit rounded-md bg-yellow-200 font-bold text-lg tracking-wider text-yellow-800"
            >
              Cashier🛒
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
