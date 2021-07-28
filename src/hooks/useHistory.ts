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
  date: string;
  title: string;
  account: string;
  category: string;
  value: number;
  type: string;
};

type IncomeProps = {
  id: string;
  date: string;
  title: string;
  account: string;
  value: number;
  type: string;
};

type TransferProps = {
  id: string;
  date: string;
  origin: string;
  destination: string;
  value: number;
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
            date: value.date,
            title: value.title,
            account: value.account,
            category: value.category,
            value: value.value,
            type: value.type,
          };
        }
      );
      setExpenses(parsedExpenses);

      const parsedIncomes = Object.entries(incomes).map<IncomeProps>(
        ([key, value]) => {
          return {
            id: key,
            date: value.date,
            title: value.title,
            account: value.account,
            value: value.value,
            type: value.type,
          };
        }
      );
      setIncomes(parsedIncomes);

      const parsedTransfers = Object.entries(transfers).map<TransferProps>(
        ([key, value]) => {
          return {
            id: key,
            date: value.date,
            origin: value.origin,
            destination: value.destination,
            value: value.value,
          };
        }
      );
      setTransfers(parsedTransfers);

      const balance = parsedAccounts.reduce((a, b) => a + b.balance, 0);
      setBalance(balance);
    });

    return () => {
      userRef.off("value");
    };
  }, [user?.id]);

  return { expenses, incomes, transfers, accounts, balance };
}
