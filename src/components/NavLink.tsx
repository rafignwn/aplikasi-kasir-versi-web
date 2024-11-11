import { Icon } from "@icon-park/react/lib/runtime";
import { Link, useLocation } from "react-router-dom";

interface INavLinkProps {
  title: string;
  Icon: Icon;
  to: string;
}

export default function NavLink({ title, Icon, to }: INavLinkProps) {
  const location = useLocation();
  return (
    <Link
      to={to}
      className={`font-semibold transition-colors hover:bg-yellow-100 hover:text-yellow-600 text-lg capitalize my-5 flex items-center gap-2 shadow-md px-4 py-2 rounded-md ${
        location.pathname === to
          ? "bg-sky-100 text-sky-700"
          : "text-gray-600 bg-white"
      }`}
    >
      <div className="w-9 h-9 grid place-items-center">
        <Icon size={25} />
      </div>
      <p className="tracking-wide">{title}</p>
    </Link>
  );
}
