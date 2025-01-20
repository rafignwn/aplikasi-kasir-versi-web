import { Link } from "react-router-dom";
import {
  BackBtn,
  SearchItem,
  CardItem,
  ModalItem,
  NavItem,
  DetailCashier,
  ModalAddItem,
} from "../components";
import IItem from "../interface/Items";
import { AddOne } from "@icon-park/react";
import { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../contexts/ItemsContext";
import { getItems } from "../functions/getItems";

export default function Casier() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
  const [item, setItem] = useState<IItem | null>(null);
  const { items, setItems } = useContext(ItemsContext);

  function openModal(_item: IItem) {
    setItem(_item);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function openModalAdd() {
    setIsModalAddOpen(true);
  }

  function closeModalAdd() {
    setIsModalAddOpen(false);
  }

  useEffect(() => {
    async function fetchItems() {
      const dataItems = await getItems();
      setItems(dataItems);
    }

    fetchItems();
  }, []);

  return (
    <>
      <div className="bg-gradient-to-tr from-amber-100 to-amber-300 p-10 gap-x-10 grid grid-cols-6 grid-rows-6 h-full">
        <div className="col-span-1 min-w-fit row-span-6 grid grid-rows-6">
          <div className="row-span-1">
            <BackBtn />
          </div>
          <div className="row-span-5">
            <h2 className="font-bold uppercase text-lg">Menu</h2>
            <div className="mt-5 grid grid-cols-1 gap-4">
              <NavItem
                Icon={AddOne}
                onClick={openModalAdd}
                title="Add New Item"
              />
              {/* <NavItem onClick={openModalAdd} title="Restock Item" /> */}
              <Link to={"/"} title="Logout" />
            </div>
          </div>
        </div>
        <div className="row-span-6 col-span-5 grid grid-rows-10">
          <div className="flex h-fit items-center row-span-1">
            <SearchItem />
          </div>
          <div className="w-full row-span-9 grid grid-cols-7 gap-5">
            {/* Data Item */}
            <div className="col-span-5 rounded-md flex flex-wrap gap-3 overflow-auto scroll-smooth">
              {items.map((data) => {
                return (
                  <CardItem
                    key={data.id}
                    title={data.name}
                    imgUrl={data.imageUrl}
                    stok={data.stock}
                    onClick={() => openModal({ ...data } as IItem)}
                  />
                );
              })}
            </div>

            {/* Rincian Pembelian */}
            <div className="col-span-2 h-full">
              <DetailCashier />
            </div>
          </div>
        </div>
      </div>
      <ModalItem
        dataItem={item as IItem}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <ModalAddItem isOpen={isModalAddOpen} onClose={closeModalAdd} />
    </>
  );
}
