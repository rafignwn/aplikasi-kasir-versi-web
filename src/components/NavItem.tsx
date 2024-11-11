import { Icon } from "@icon-park/react/lib/runtime";

interface NavItemProps {
  title: string;
  Icon: Icon;
  className?: string;
  onClick: () => void;
}

function NavItem({ title, Icon, className, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} flex items-center gap-2 bg-yellow-200 shadow-md rounded-md px-4 w-full py-2 font-bold`}
    >
      <Icon size={20} /> <p>{title}</p>
    </button>
  );
}

export default NavItem;
