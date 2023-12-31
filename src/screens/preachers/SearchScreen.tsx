import { Input } from "@rneui/themed";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import ButtonC from "../../components/Button";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import Loading from "../../components/Loading";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Preacher from "../../components/Preacher";
import Pagination from "../../components/Pagination";

const PreachersSearchScreen: React.FC = () => {
  const [param, setParam] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { searchPreacher, state } = useContext(PreachersContext);

  return (
    <ScrollView style={styles.container}>
      <Input
        placeholder="Imię i nazwisko"
        value={param}
        onChangeText={setParam}
        inputContainerStyle={styles.inputContainer}
      />
      <ButtonC
        title="Szukaj"
        onPress={() => {
          searchPreacher(param);
          setSubmitted(true);
        }}
      />

      {!submitted ? (
        <View style={styles.noParamContainer}>
          <FontAwesome name="search" size={45} sty />
          <Text style={styles.noParamText}>Wpisz parametr, by wyszukać</Text>
        </View>
      ) : state.isLoading ? (
        <Loading />
      ) : state.searchResults?.length === 0 ? (
        <View style={styles.noParamContainer}>
            <Entypo name="emoji-sad" size={45} />
          <Text style={styles.noParamText}>Niestety, nic nie znaleźliśmy dla takiego parametru</Text>
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>
            Rezultaty wyszukiwania: {state.searchResults?.length}
          </Text>
          <FlatList
            data={state.searchResults}
            renderItem={({ item }) => <Preacher preacher={item} />}
            scrollEnabled={false}
          />
    
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ece9e9",
    padding: 15,
    flex: 1,
  },
  inputContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
    borderColor: "#28a745",
    color: "#28a745",
  },
  noParamContainer: {
    marginTop: 65,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  noParamText: {
    marginTop: 15,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: "PoppinsRegular",
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultsText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "PoppinsRegular",
    marginBottom: 20
  },
});

export default PreachersSearchScreen;
