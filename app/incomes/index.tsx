import { Link } from 'expo-router';
import { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { recordsContext } from '../../utils/RecordsProvider';
import Table from '../../components/table';
import TotalCard from '../../components/totalCard';
import { ScrollView } from 'react-native-gesture-handler';

export default function Incomes() {
    const { incomes } = useContext(recordsContext) as RecordsProviderContext;

    const allCategouries: string[] = [];
    incomes.map((income) => {
        if (!allCategouries.includes(income.category)) {
            allCategouries.push(income.category);
        }
    });

    const totalIncome =
        incomes.length > 0
            ? incomes
                  .map((income) => income.amount)
                  .reduce((current, next) => {
                      return current + next;
                  })
            : 0;

    return (
        <>
            <View className='flex flex-row items-center mb-3'>
                <Text className='text-2xl font-bold text-white'>
                    All Incomes
                </Text>
                <Link href='/incomes/addIncome' className='ml-auto'>
                    <Text className={`text-blue-500 text-lg`}>Add</Text>
                </Link>
            </View>
            <TotalCard label='Total Income' totalAmount={totalIncome} />

            <ScrollView horizontal={true} className='mt-3 mb-2 gap-x-2'>
                {allCategouries.map((category) => (
                    <View
                        key={Math.random() * 10}
                        className='bg-[#1C1C1C] p-2 rounded flex flex-row items-baseline shadow'
                    >
                        <Text className='text-white'>{category}</Text>
                        <Text className='text-white text-xl font-semibold ml-7'>
                            ₹{' '}
                            {incomes
                                .filter(
                                    (income) => income.category === category,
                                )
                                .map((income) => income.amount)
                                .reduce((current, next) => {
                                    return current + next;
                                })
                                .toLocaleString()}
                        </Text>
                    </View>
                ))}
            </ScrollView>
            <View className='my-3'>
                <Table records={incomes} />
            </View>
        </>
    );
}
