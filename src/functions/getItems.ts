import {
  DocumentData,
  QuerySnapshot,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "./../../firebase";
import IItems from "../interface/Items";

export async function getItems(): Promise<Array<IItems>> {
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
    collection(db, "items")
  );
  const items: IItems[] = [];

  querySnapshot.forEach((data) => {
    items.push({ id: data.id, ...data.data() } as IItems);
  });

  return items;
}
