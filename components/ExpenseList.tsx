import { FlatList, StyleSheet, Text, View } from "react-native";

export function ExpenseList({
  expenses,
}: {
  expenses: { amount: number; description: string }[];
}) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item, index) => index.toString() + item.description + item.amount}
      renderItem={({ item }) => (
        <View style={styles.expenseItem}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.amount}>{item.amount}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    flexDirection: "row",
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
  },
  description: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    marginLeft: 10
  },
});
