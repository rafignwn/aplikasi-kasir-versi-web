import { TBaskets } from "../contexts/BasketContext";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  increment,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export interface IItemTransaction {
  id: string;
  name: string;
  qty: number;
  price: number;
  subtotal: number;
}

// Fungsi untuk mengambil dan meningkatkan nilai counter
const incrementTransactionCounter = async (): Promise<number> => {
  const counterRef = doc(db, "counters", "transactionCounter-web"); // Dokumen counter
  const counterSnap = await getDoc(counterRef);

  if (counterSnap.exists()) {
    const currentCount = counterSnap.data().count;
    // Tingkatkan nilai counter secara atomik
    await updateDoc(counterRef, {
      count: increment(1),
    });
    return currentCount + 1; // Kembalikan nomor transaksi yang baru
  } else {
    // Jika counter belum ada, inisialisasi dengan nilai awal 1
    await setDoc(counterRef, { count: 1 });
    return 1;
  }
};

export async function addTransaction(
  baskets: TBaskets,
  totalAmount: number,
  paymentMethod: "cash" | "credit"
) {
  const items: Array<IItemTransaction> = baskets.map((basket) => ({
    id: basket.id,
    name: basket.name,
    price: basket.sellingPrice,
    subtotal: basket.total,
    qty: basket.qty,
  }));

  try {
    const transactionNumber = await incrementTransactionCounter();
    const transactionData = {
      transactionNumber,
      timestamp: new Date(),
      totalAmount,
      paymentMethod,
      items,
      customerId: "customer_001",
      cashierId: "cashier_001",
    };

    const docRef = await addDoc(
      collection(db, "transactions-web"),
      transactionData
    );
    return docRef.id;
  } catch (error) {
    console.log("Terjadi error saat transaksi : ", error);
    return false;
  }
}
