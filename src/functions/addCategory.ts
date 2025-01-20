import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { ICategory } from "../interface/categories";

export interface ICategoryData {
  value: string;
  label: string;
}

export async function addCategory(
  categoryData: ICategoryData
): Promise<ICategory | false> {
  try {
    // add items to firestore
    const data = await addDoc(collection(db, "categories"), {
      ...categoryData,
    });

    console.log("item successfuly added");
    return {
      ...categoryData,
      id: data.id,
    };
  } catch (error) {
    console.log("error adding item : ", error);
    return false;
  }
}
