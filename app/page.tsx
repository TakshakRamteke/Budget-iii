import Card from '@/components/card';
import ExpensesTable from '@/components/expensesTable';
import IncomesTable from '@/components/incomesTable';

export default async function Home() {
    const expensesResponse = await fetch('http://127.0.0.1:3000/api/expenses', {
        next: { revalidate: 5 },
    });
    const expenses: Expense[] = await expensesResponse.json();

    const incomesResponse = await fetch('http://127.0.0.1:3000/api/incomes', {
        next: { revalidate: 5 },
    });
    const incomes: Income[] = await incomesResponse.json();

    const totalIncomesAmount = incomes
        .map((income) => income.properties.amount.number)
        .reduce((current, next) => {
            return current + next;
        });

    const allExpensesAmountsArray = expenses.map(
        (expense) => expense.properties.amount.number,
    );

    const totalExpensesAmount = allExpensesAmountsArray.reduce(
        (current: number, next: number) => {
            return current + next;
        },
        0,
    );

    const allCategouriesArray: string[] = [];
    expenses.map((expense) => {
        if (
            !allCategouriesArray.includes(
                expense.properties.category.select.name,
            )
        ) {
            allCategouriesArray.push(expense.properties.category.select.name);
        }
    });

    return (
        <>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                <div className='p-4 min-w-[13rem] border border-slate-200 shrink-0 rounded shadow-sm bg-white flex flex-row items-center'>
                    <p className='text-lg font-medium mt-auto'>Total Incomes</p>
                    <p className='font-semibold text-3xl ml-auto mt-0'>
                        ₹ {totalIncomesAmount.toLocaleString()}
                    </p>
                </div>

                <div className='p-4 min-w-[13rem] border border-slate-200 shrink-0 rounded shadow-sm bg-white flex flex-row items-center'>
                    <p className='text-lg font-medium mt-auto'>
                        Total Expenses
                    </p>
                    <p className='font-semibold text-3xl ml-auto mt-0'>
                        ₹ {totalExpensesAmount.toLocaleString()}
                    </p>
                </div>
            </div>

            <div className='flex overflow-x-scroll my-3'>
                {allCategouriesArray.map((category) => (
                    <Card
                        key={Math.random() * 10}
                        title={`${category} Expense`}
                        amount={expenses
                            .filter(
                                (expense) =>
                                    expense.properties.category.select.name ===
                                    category,
                            )
                            .map((expense) => expense.properties.amount.number)
                            .reduce((current, next) => {
                                return current + next;
                            })}
                    />
                ))}
            </div>

            <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>
                <div>
                    <p className='text-2xl font-semibold my-3'>Incomes : </p>
                    <IncomesTable
                        totalAmount={totalIncomesAmount}
                        capitalData={incomes}
                    />
                </div>

                <div>
                    <p className='text-2xl font-semibold my-3'>Expenses : </p>
                    <ExpensesTable
                        totalAmount={totalExpensesAmount}
                        capitalData={expenses}
                    />
                </div>
            </div>
        </>
    );
}
