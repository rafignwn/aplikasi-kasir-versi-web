import { deleteDoc, doc } from "firebase/firestore";
import IItem from "../interface/Items";
import { db } from "../../firebase";

export default async function deleteItem(item: IItem): Promise<boolean> {
  try {
    await deleteDoc(doc(db, "items", item.id));
    return true;
  } catch (error) {
    return false;
  }
}
