import type { expense } from "@/types/common";
import { useState } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet } from "react-native";

export const EditExpenseModal = ({
  visible,
  onClose,
  expense,
  onSave,
}: {
  visible: boolean;
  onClose: () => void;
  expense: expense;
  onSave: (id: string, newDescription: string, newAmount: number) => void;
}) => {
  const [newDescription, setNewDescription] = useState(
    expense?.description || ""
  );
  const [newAmount, setNewAmount] = useState(expense?.amount?.toString() || "");

  const handleChangeAmount = (amt: string) => {
    setNewAmount(amt);
  };
  const handleChangeDescription = (desc: string) => {
    setNewDescription(desc);
  };

  const handleSave = () => {
    onSave(expense.id, newDescription, Number.parseFloat(newAmount));
  };
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <View style={styles.modalBackground}>
          <Text>Edit Expense</Text>
        </View>
        <TextInput
          value={newDescription}
          onChangeText={handleChangeDescription}
          placeholder="Expense Description"
          style={styles.field}
        />
        <TextInput
          value={newAmount}
          onChangeText={handleChangeAmount}
          placeholder="Expense Amount"
          style={styles.field}
        />
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBackground: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  field: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
