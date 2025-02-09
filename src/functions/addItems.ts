import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import IItem from "../interface/Items";

export interface IItemAdd {
  name: string;
  categori: string;
  purchasePrice: number;
  sellingPrice: number;
  barcode: string;
  stock: number;
  diskon: number;
}

export async function uploadImage(file: File): Promise<string> {
  const storageRef = ref(storage, `items/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
}

export async function addItem(
  itemData: IItemAdd,
  file?: File
): Promise<IItem | false> {
  try {
    let imageUrl = "";

    // upload image
    if (file) {
      imageUrl = await uploadImage(file);
    }

    // add items to firestore
    const data = await addDoc(collection(db, "items"), {
      ...itemData,
      imageUrl,
    });

    console.log("item successfuly added");
    return {
      ...itemData,
      imageUrl,
      id: data.id,
    };
  } catch (error) {
    console.log("error adding item : ", error);
    return false;
  }
}
