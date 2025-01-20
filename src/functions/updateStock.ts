import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export async function updateStock(id: string, qty: number): Promise<boolean> {
  try {
    // Update data ke Firestore
    await updateDoc(doc(db, "items", id), {
      stock: qty,
    });

    return true;
  } catch (error) {
    console.error("Error updating item:", error);
    return false;
  }
}
