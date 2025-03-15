import type { expense } from "@/types/common";
import { formatDate } from "@/utils/common";
import { useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { EditExpenseModal } from "./EditExpenseModal";
import { deleteExpenses, editExpense, getExpenses } from "@/utils/asyncStorage";
import { useToggle } from "@/hooks/common";
import Toast from "react-native-toast-message";

export function ExpenseList({
  expenses,
  saveExpenses,
}: {
  expenses: expense[];
  saveExpenses: (expenses: expense[]) => void;
}) {
  const [expenseSelected, setExpenseSelected] = useState<null | expense>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenEditModal = (item: expense) => {
    setExpenseSelected(item);
    setIsEditing(true);
  };
  const handleSaveEditExpense = async (
    id: string,
    newDescription: string,
    newAmount: number
  ) => {
    editExpense(id, newDescription, String(newAmount));
    const expenses = await getExpenses();
    saveExpenses(expenses);
  };

  const handleDelete = async (id: string) => {
    deleteExpenses(id);
    const expenses = await getExpenses();
    saveExpenses(expenses);

    Toast.show({
      type: 'success',
      text1: "Expense Deleted",
      text2: "Your expense has been removed"
    })
  };
  const deleteExpense = (id: string) =>
    Alert.alert(
      "Delete Expense?",
      "Are you sure you want to delete this expense?",
      [
        { text: "cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDelete(id),
        },
      ]
    );
  return (
    <View>
      <FlatList
        data={expenses}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.expenseItem}>
            <View style={styles.container}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.amount}>₹{item.amount}</Text>
              <Button title="Edit" onPress={() => handleOpenEditModal(item)} />
              <Button
                title="Delete"
                color="red"
                onPress={() => deleteExpense(item.id)}
              />
            </View>
            <View>
              <Text style={{ color: "gray", fontSize: 13, fontWeight: "bold" }}>
                {formatDate(item.date)}
              </Text>
            </View>
          </View>
        )}
      />
      {expenseSelected && (
        <EditExpenseModal
          visible={isEditing}
          onClose={() => setExpenseSelected(null)}
          expense={expenseSelected}
          onSave={handleSaveEditExpense}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: 300,
    margin: "auto",
  },
  description: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    marginLeft: 10,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
