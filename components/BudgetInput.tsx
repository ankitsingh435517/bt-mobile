import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export function BudgetInput({
  onSetBudget,
}: {
  onSetBudget: (amount: number) => void;
}) {
  const [amount, setAmount] = useState("");

  const handleInput = (val: string) => {
    setAmount(val);
  };
  const handleSetBudget = () => {
    onSetBudget(Number(amount));
    setAmount("");
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Monthly Budget (INR)"
        keyboardType="numeric"
        value={amount}
        onChangeText={handleInput}
      />
      <Button onPress={handleSetBudget} title="Set Budget" />
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
