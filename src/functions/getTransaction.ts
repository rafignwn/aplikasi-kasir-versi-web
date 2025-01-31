import {
  DocumentData,
  QuerySnapshot,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "./../../firebase";
import ITransaction from "../interface/transaction";

export async function getTransactions(): Promise<Array<ITransaction>> {
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
    collection(db, "transactions-web")
  );
  const items: ITransaction[] = [];

  querySnapshot.forEach((data) => {
    items.push({ id: data.id, ...data.data() } as ITransaction);
  });

  return items;
}
