import type { expense } from "@/types/common";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import uuid from 'react-native-uuid';

export function ExpenseForm({
  addExpense,
}: {
  addExpense: (exp: expense) => void;
}) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSetDescription = (val: string) => {
    setDescription(() => val);
  };
  const handleSetAmount = (val: string) => {
    setAmount(() => val);
  };
  const handleAddExpense = () => {
    if (!description || !amount) return;
    addExpense({
      id: uuid.v4(),
      amount: Number(amount),
      description,
      date: new Date().toISOString(),
    });
    Toast.show({
      type: "success",
      text1: "Expense Added",
      text2: `₹${amount} - ${description}`,
    });
    setAmount("");
    setDescription("");
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Expense Description"
        value={description}
        onChangeText={handleSetDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount (INR)"
        keyboardType="numeric"
        value={amount}
        onChangeText={handleSetAmount}
      />

      <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
