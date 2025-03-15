import type { expense } from "@/types/common";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Save a budget
export async function saveBudget(amount: number) {
	try {
		await AsyncStorage.setItem("budget", JSON.stringify(amount));
		console.log("Budget saved!");
	} catch (err) {
		// TODO: Show a snackbar/toast
		console.error("Error saving budget: ", err);
	}
}

// Get a budget
export async function getBudget() {
	try {
		const budget = await AsyncStorage.getItem("budget");
		return budget ? JSON.parse(budget) : 0;
	} catch (err) {
		console.error("Error retreiving budget: ", err);
	}
}

// Save an expense
export async function saveExpense(expense: expense) {
	try {
		const expenses = await AsyncStorage.getItem("expenses");
		const existingExpenses: expense[] = expenses ? JSON.parse(expenses) : [];
		existingExpenses.push(expense);
		await AsyncStorage.setItem("expenses", JSON.stringify(existingExpenses));
		console.log("Expense saved!");
	} catch (err) {
		console.error("Error saving expense: ", err);
	}
}

// Get all expenses
export async function getExpenses() {
	try {
		const expenses = await AsyncStorage.getItem("expenses");
		return expenses ? JSON.parse(expenses) : [];
	} catch (err) {
		console.error("Error retreiving expenses: ", err);
	}
}

// Edit Expense
export async function editExpense(
	id: string,
	newDescription: string,
	newAmount: string,
) {
	try {
		const expenses: expense[] = await getExpenses();
		const updatedExpenses = expenses.map((exp) =>
			String(exp.id) === String(id)
				? { ...exp, description: newDescription, amount: newAmount }
				: exp,
		);
		await AsyncStorage.setItem("expenses", JSON.stringify(updatedExpenses));
	} catch (err) {
		console.error("Error editing expense: ", err);
	}
}

// Delete Expense
export async function deleteExpenses(id: string) {
	try {
		const expenses: expense[] = await getExpenses();
		const remainingExpenses = expenses.filter((exp) => String(exp.id) !== String(id));
		await AsyncStorage.setItem("expenses", JSON.stringify(remainingExpenses));
	} catch (err) {
		console.error("Error deleting expense: ", err);
	}
}