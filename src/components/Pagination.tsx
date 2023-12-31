import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PaginationProps {
  activePage: number;
  totalPages: number;
  updateState: Function
}

const Pagination: React.FC<PaginationProps> = ({ activePage, totalPages, updateState }) => {
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={pages}
        renderItem={({ item }) =>
          activePage === item ? (
            <TouchableOpacity
              style={[styles.itemContainer, { backgroundColor: "#28a745" }]}
              onPress={() => updateState(item)}
            >
              <Text style={[styles.text, { color: 'white' }]}>{item}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.itemContainer, { backgroundColor: "white" }]} onPress={() => updateState(item)}>
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          )
        }
        contentContainerStyle={{ justifyContent: "center", gap: 15 }}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  itemContainer: {
    padding: 10,
    borderRadius: 9,
  },
  text: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 17
  }
});

export default Pagination;
