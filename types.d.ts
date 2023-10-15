type Expense = {
    id: string;
    name: string;
    amount: number;
    category: string;
    date: string;
    categoryId: string;
};

type Income = {
    id: string;
    name: string;
    amount: number;
    category: string;
    date: string;
    categoryId: string;
};

type Category = {
    id: number;
    name: string;
};

type RecordsProviderContext = {
    incomes: Income[];
    expenses: Expense[];
    setIncomes: (incomes: Income[]) => void;
    setExpenses: (expenses: Expense[]) => void;
};
