interface IPropsCardItem {
  onClick: () => void;
  title: string;
  imgUrl?: string;
  stok: number;
  diskon?: number;
}

function CardItem({ onClick, title, imgUrl, diskon }: IPropsCardItem) {
  return (
    <>
      <div className="w-24 relative" onClick={onClick}>
        {/* <span className="absolute px-2 py-1 rounded-md bg-yellow-400 font-semibold top-0 right-0">
          {stok}
        </span> */}
        <div className="relative rounded-md hover:shadow-md shadow-gray-300 w-full overflow-hidden grid place-items-center">
          {imgUrl && (
            <img
              className=" aspect-square w-full block object-cover rounded-md"
              src={imgUrl}
              alt="image"
            />
          )}
          {diskon && (
            <p className="bg-pink-200 text-lg font-bold py-2 absolute left-0 bottom-0">
              {diskon}%
            </p>
          )}
        </div>
        <h3 className="mt-2 font-semibold text-sm text-gray-700">{title}</h3>
      </div>
    </>
  );
}

export default CardItem;
