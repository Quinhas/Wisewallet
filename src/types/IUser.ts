type ExpenseProps = {
  date: string;
  title: string;
  account: string;
  category: string;
  value: number;
  type: string;
};

type IncomeProps = {
  date: string;
  title: string;
  account: string;
  value: number;
  type: string;
};

export type IUser = {
  id: number;
  name: string;
  email: string;
  birthdate: string;
  currency: string;
  language: string;
  photoURL: string;
  lastPasswordChange: string;
  accounts: {
    type: "Cash" | "Bank" | "Others";
    balance: number;
    name?: string;
  }[];
  expenses: ExpenseProps[];
  incomes: IncomeProps[];
};