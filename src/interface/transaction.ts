import IItem from "./Items";

interface ITransaction {
  id: string;
  cashierId: string;
  customerId: string;
  items: IItem[];
  timestamp: Date | any;
  totalAmount: number;
  transactionNumber: number;
}
export default ITransaction;
