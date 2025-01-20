import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { ICategory } from "../interface/categories";

export default async function deleteCategory(
  category: ICategory
): Promise<boolean> {
  try {
    await deleteDoc(doc(db, "categories", category.id));
    return true;
  } catch (error) {
    return false;
  }
}
