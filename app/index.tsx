import { BudgetInput } from "@/components/BudgetInput";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState<
    { amount: number; description: string }[]
  >([]);

  const handleSetBudget = (val: number) => {
    setBudget(() => val);
  };

  const handleAddExpense = (exp: { amount: number; description: string }) => {
    setExpenses(() => [exp, ...expenses]);
  };

  const totalSpent = expenses.reduce((acc, item) => acc + item.amount, 0);
  const remainingBudget = budget - totalSpent;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget Tracker</Text>
      <BudgetInput onSetBudget={handleSetBudget} />
      <Text style={styles.budgetText}>Remaining: ₹{remainingBudget}</Text>
      <ExpenseForm addExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  budgetText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
});
