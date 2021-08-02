import { parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { database } from "src/services/firebase";
import { useAuth } from "./useAuth";

type AccountProps = {
  id: string;
  type: "Cash" | "Bank" | "Others";
  balance: number;
  name?: string;
};

type ExpenseProps = {
  id: string;
  date: Date;
  title: string;
  account: string;
  category: string;
  value: number;
  type: string;
  listType: "Expense";
};

type IncomeProps = {
  id: string;
  date: Date;
  value: number;
  title: string;
  account: string;
  type: string;
  listType: "Income";
};

type TransferProps = {
  id: string;
  date: Date;
  value: number;
  origin: string;
  destination: string;
  listType: "Transfer";
};

type FirebaseUser = {
  id: number;
  name: string;
  email: string;
  birthdate: string;
  currency: string;
  language: string;
  avatar: string;
  lastPasswordChange: string;
  accounts: Record<
    string,
    {
      type: "Cash" | "Bank" | "Others";
      balance: number;
      name?: string;
    }
  >;
  expenses: Record<
    string,
    {
      date: string;
      title: string;
      account: string;
      category: string;
      value: number;
      type: string;
    }
  >;
  incomes: Record<
    string,
    {
      date: string;
      title: string;
      account: string;
      value: number;
      type: string;
    }
  >;
  transfers: Record<
    string,
    {
      date: string;
      origin: string;
      destination: string;
      value: number;
    }
  >;
};

export function useHistory() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<AccountProps[]>([]);
  const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
  const [incomes, setIncomes] = useState<IncomeProps[]>([]);
  const [transfers, setTransfers] = useState<TransferProps[]>([]);
  const [list, setList] = useState<
    (ExpenseProps | IncomeProps | TransferProps)[]
  >([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const userRef = database.ref(`users/${user.id}`);

    userRef.on("value", (user) => {
      const firebaseUser: FirebaseUser = user.val();
      const accounts = firebaseUser.accounts ?? [];
      const expenses = firebaseUser.expenses ?? [];
      const incomes = firebaseUser.incomes ?? [];
      const transfers = firebaseUser.transfers ?? [];

      const parsedAccounts = Object.entries(accounts).map<AccountProps>(
        ([key, value]) => {
          return {
            id: key,
            type: value.type,
            balance: value.balance,
            name: value.name,
          };
        }
      );
      setAccounts(parsedAccounts);

      const parsedExpenses = Object.entries(expenses).map<ExpenseProps>(
        ([key, value]) => {
          return {
            id: key,
            date: parseISO(value.date),
            title: value.title,
            account: value.account,
            category: value.category,
            value: value.value,
            type: value.type,
            listType: "Expense",
          };
        }
      );
      setExpenses(parsedExpenses);

      const parsedIncomes = Object.entries(incomes).map<IncomeProps>(
        ([key, value]) => {
          return {
            id: key,
            date: parseISO(value.date),
            title: value.title,
            account: value.account,
            value: value.value,
            type: value.type,
            listType: "Income",
          };
        }
      );
      setIncomes(parsedIncomes);

      const parsedTransfers = Object.entries(transfers).map<TransferProps>(
        ([key, value]) => {
          return {
            id: key,
            date: parseISO(value.date),
            origin: value.origin,
            destination: value.destination,
            value: value.value,
            listType: "Transfer",
          };
        }
      );
      setTransfers(parsedTransfers);

      const list = [
        ...parsedIncomes,
        ...parsedExpenses,
        ...parsedTransfers,
      ].sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        }
        if (a.date > b.date) {
          return -1;
        }
        return 0;
      });
      setList(list);

      const balance = parsedAccounts.reduce((a, b) => a + b.balance, 0);
      setBalance(balance);
    });

    return () => {
      userRef.off("value");
    };
  }, [user?.id]);

  return { expenses, incomes, transfers, accounts, balance, list };
}
