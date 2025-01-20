import { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../contexts/categoriesContext";
import { getCategories } from "../functions/getCategories";
import CategoryItem from "../components/CategoryItem";
import { addCategory } from "../functions/addCategory";
import { ICategory } from "../interface/categories";
import toast from "react-hot-toast";

export default function Category() {
  const { categories, setCategories } = useContext(CategoriesContext);
  const [showAddCategory, setShowAddCategory] = useState<boolean>(false);
  const [inputCategory, setInputCategory] = useState<string>("");

  useEffect(() => {
    async function fetchCategories() {
      setCategories(await getCategories());
    }
    fetchCategories();
  }, []);

  // fungsi untuk menangani penambahan data kategori
  function handleAddCategory() {
    setShowAddCategory(true);
  }

  //   fungsi untuk menutup modal tambah kategori
  function closeModal() {
    setShowAddCategory(false);
  }

  //   fungsi untuk menyimpan data kategori baru
  async function handleSaveCategory() {
    if (inputCategory == "") {
      return false;
    }

    const newCategory = await addCategory({
      label: inputCategory,
      value: inputCategory.toLowerCase(),
    });

    setCategories((oldCategories) => [
      ...oldCategories,
      newCategory as ICategory,
    ]);
    toast.success("Data kategori baru berhasil ditambahkan.");
    closeModal();
  }

  return (
    <>
      <div className="p-10">
        <h1 className="text-green-700 mb-8 text-center text-xl font-bold uppercase">
          Daftar Kategori Produk
        </h1>
        <button
          onClick={handleAddCategory}
          type="button"
          className="bg-green-200 text-green-700 font-bold rounded-md px-6 py-2"
        >
          Tambah Kategori
        </button>
        <div className="mt-4 flex gap-4 flex-wrap">
          {categories.length > 0 ? (
            categories.map((category) => (
              <CategoryItem key={category.id} categoryData={category} />
            ))
          ) : (
            <p className="font-bold text-center text-2xl text-green-700">
              Data Kategori Tidak Ada
            </p>
          )}
        </div>
      </div>

      {/* modal add Category */}
      {showAddCategory && (
        <div className="p-5 bg-emerald-50 bg-opacity-5 backdrop-blur-sm absolute top-0 left-0 w-full h-full grid place-items-center">
          <div className="bg-emerald-200 p-5">
            <h3 className="text-xl text-emerald-700 font-bold text-center underline">
              Tambah Kategori Baru
            </h3>
            <div className="flex gap-4 my-5 flex-col w-[20rem]">
              <input
                autoFocus
                onChange={(e) => setInputCategory(e.target.value)}
                type="text"
                className="py-2 px-4 font-semibold border-4 border-emerald-400 rounded-sm outline-none text-emerald-700"
                placeholder="Masukan Kategori"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={closeModal}
                className="flex-1 py-2 rounded-sm font-bold uppercase bg-red-300 text-red-800"
              >
                Batal
              </button>
              <button
                onClick={handleSaveCategory}
                className="flex-1 py-2 rounded-sm font-bold uppercase text-sky-100 bg-sky-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
