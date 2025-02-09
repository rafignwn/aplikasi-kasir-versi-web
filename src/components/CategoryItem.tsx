import { useContext, useState } from "react";
import { ICategory } from "../interface/categories";
import deleteCategory from "../functions/deleteCategory";
import toast from "react-hot-toast";
import { CategoriesContext } from "../contexts/CategoriesContext";

export default function CategoryItem({
  categoryData,
}: {
  categoryData: ICategory;
}) {
  const [showModalDeleteCategory, setShowModalDeleteCategory] =
    useState<boolean>(false);
  const { setCategories } = useContext(CategoriesContext);

  // fungsi untuk melakukan hapus data kategori
  async function handleDeleteCategory() {
    await deleteCategory(categoryData);

    setCategories((categories) =>
      categories.filter((category) => category.id != categoryData.id)
    );
    setShowModalDeleteCategory(false);
    toast.success(`Data kategori ${categoryData.label} berhasil dihapus`);
  }

  return (
    <>
      <div className="relative pl-3 pr-14 py-2 w-fit bg-yellow-200 border-0 rounded-md border-yellow-700">
        <p className="text-yellow-700 font-bold">{categoryData.label}</p>
        <button
          onClick={() => setShowModalDeleteCategory(true)}
          type="button"
          className="bg-red-400 text-xl absolute rounded-r-md top-0 right-0 h-full aspect-square"
        >
          🗑
        </button>
      </div>

      {/* modal delete category */}
      {showModalDeleteCategory && (
        <div className="p-5 bg-emerald-50 bg-opacity-5 z-10 backdrop-blur-sm absolute top-0 left-0 w-full h-full grid place-items-center">
          <div className="bg-emerald-200 p-5 w-[25rem]">
            <h3 className="text-xl text-emerald-700 font-semibold text-center mb-8">
              Apakah anda yakin ingin menghapus data kategori{" "}
              {categoryData.label}..?
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => setShowModalDeleteCategory(false)}
                className="flex-1 py-2 rounded-sm font-bold uppercase bg-green-300 text-green-800"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteCategory}
                className="flex-1 py-2 rounded-sm font-bold uppercase text-red-100 bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
