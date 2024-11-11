interface IPropsCardItem {
  onClick: () => void;
  title: string;
  imgUrl?: string;
  stok: number;
}

function CardItem({ onClick, title, imgUrl }: IPropsCardItem) {
  return (
    <>
      <div className="w-24 relative" onClick={onClick}>
        {/* <span className="absolute px-2 py-1 rounded-md bg-yellow-400 font-semibold top-0 right-0">
          {stok}
        </span> */}
        <div className="rounded-md hover:shadow-md shadow-gray-300 w-full overflow-hidden grid place-items-center">
          {imgUrl && (
            <img
              className=" aspect-square w-full block object-cover rounded-md"
              src={imgUrl}
              alt="image"
            />
          )}
        </div>
        <h3 className="mt-2 font-semibold text-sm text-gray-700">{title}</h3>
      </div>
    </>
  );
}

export default CardItem;
