import { BudgetInput } from "@/components/BudgetInput";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import type { expense } from "@/types/common";
import {
  getBudget,
  getExpenses,
  saveBudget,
  saveExpense,
} from "@/utils/asyncStorage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Index() {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState<expense[]>([]);

  const handleSetBudget = (val: number) => {
    setBudget(() => val);
    saveBudget(val);
  };

  const handleAddExpense = (exp: expense) => {
    setExpenses(() => [exp, ...expenses]);
    saveExpense(exp);
  };

  const handleSaveEditedExpense = (updatedExpenses: expense[]) => {
    setExpenses(() => updatedExpenses);
  };

  const totalSpent = expenses.reduce((acc, item) => acc + item.amount, 0);
  const remainingBudget = budget - totalSpent;

  useEffect(() => {
    (async () => {
      const existingBudget: number = await getBudget();
      const existingExpenses: expense[] = await getExpenses();
      const validExpenses = existingExpenses.filter((exp) => exp.id);

      setBudget(existingBudget || 0);
      setExpenses(validExpenses || []);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget: ₹{budget}</Text>
      <BudgetInput onSetBudget={handleSetBudget} />
      <Text style={styles.budgetText}>Remaining: ₹{remainingBudget}</Text>
      <ExpenseForm addExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} saveExpenses={handleSaveEditedExpense} />
      <Toast />
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
    marginTop: 15,
  },
  budgetText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
});
