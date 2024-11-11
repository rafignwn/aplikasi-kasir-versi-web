import { ScanCode, CloseSmall } from "@icon-park/react";
import { useContext, useEffect, useState } from "react";
import IItem from "../interface/Items";
import { ItemsContext } from "../contexts/ItemsContext";

function SearchItem() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const { items, setItems } = useContext(ItemsContext);
  const [originalItems, setOriginalItems] = useState<Array<IItem>>([]);

  useEffect(() => {
    if (originalItems.length === 0) {
      setOriginalItems(items);
    }
  }, [items, originalItems]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setIsActive(value !== "");
    setSearchValue(value);
  }

  function searchItem() {
    const result = items.filter((item) =>
      (item.name.toLowerCase() as string).includes(searchValue.toLowerCase())
    );
    setItems(result);
  }

  function handleClear() {
    setIsActive(false);
    setItems(originalItems);
    setSearchValue("");
  }

  useEffect(() => {
    const handlerSearch = setTimeout(searchItem, 500);

    if (searchValue == "") {
      setItems(originalItems);
      clearTimeout(handlerSearch);
    }

    return () => {
      clearTimeout(handlerSearch);
    };
  }, [searchValue]);

  return (
    <>
      <div className="w-fit relative flex items-center gap-5">
        <div className="w-fit relative">
          <input
            value={searchValue}
            onChange={handleChange}
            className="px-4 py-2 rounded-md w-[25rem] shadow-md outline-none border-none font-semibold text-lg tracking-wide"
            placeholder="Type Name or Code Item"
            type="text"
          />
          {isActive && (
            <button
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <CloseSmall theme="filled" fill="#525252" size={29} />
            </button>
          )}
        </div>
        <button className="bg-white shadow-lg p-2 rounded-md">
          <ScanCode size={29} fill="#0284ff" theme="filled" />
        </button>
      </div>
    </>
  );
}

export default SearchItem;
