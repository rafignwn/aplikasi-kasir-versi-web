import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import IItem from "../interface/Items";
import { uploadImage } from "./addItems";

export interface IItemUpdate {
  name: string;
  categori: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  imageUrl: string; // Jadikan optional agar fleksibel
}

export async function updateItem(
  itemData: IItemUpdate,
  id: string,
  file?: File
): Promise<IItem | false> {
  try {
    let imageUrl = itemData.imageUrl; // Ambil URL gambar dari data input (jika ada)

    if (file?.name) {
      // Jika ada file baru, upload file dan update URL gambar
      imageUrl = await uploadImage(file);
    }

    // Update data ke Firestore
    await updateDoc(doc(db, "items", id), {
      ...itemData,
      imageUrl, // Pastikan imageUrl tetap diperbarui
    });

    return {
      ...itemData,
      imageUrl,
      id,
    } as IItem;
  } catch (error) {
    console.error("Error updating item:", error);
    return false;
  }
}
