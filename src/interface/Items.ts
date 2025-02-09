interface IItem {
  id: string;
  name: string;
  categori: string;
  imageUrl: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  barcode: string;
  diskon: number;
}

export default IItem;
