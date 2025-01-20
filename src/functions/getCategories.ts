import {
  DocumentData,
  QuerySnapshot,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../../firebase";
import { ICategory } from "../interface/categories";

export async function getCategories(): Promise<Array<ICategory>> {
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
    collection(db, "categories")
  );
  const items: ICategory[] = [];

  querySnapshot.forEach((data) => {
    items.push({ id: data.id, ...data.data() } as ICategory);
  });

  return items;
}
