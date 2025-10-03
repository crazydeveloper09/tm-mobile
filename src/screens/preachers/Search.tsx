import { Input } from "@rneui/themed";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, Alert } from "react-native";
import ButtonC from "../../components/Button";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import Loading from "../../components/Loading";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Preacher from "../../components/Preacher";
import Pagination from "../../components/Pagination";
import { columnsNum } from "../../helpers/devices";
import MyInput from "../../components/MyInput";
import useLocaLization from "../../hooks/useLocalization";
import { preachersTranslations } from "./translations";

const PreachersSearchScreen: React.FC = () => {
  const [param, setParam] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { searchPreacher, state, clearError } = useContext(PreachersContext);
  const preacherTranslate = useLocaLization(preachersTranslations);
  const settingsContext = useContext(SettingsContext);

  
  if(state.errMessage){
    Alert.alert("Server error", state.errMessage, [{ text: "OK", onPress: () => clearError() }])
  }

  return (
    <ScrollView style={styles.container}>
      <MyInput
        placeholder={preacherTranslate.t("nameLabel")}
        value={param}
        onChangeText={setParam}
      />
      <ButtonC
        title={preacherTranslate.t("searchButtonText")}
        onPress={() => {
          searchPreacher(param);
          setSubmitted(true);
        }}
      />

      {!submitted ? (
        <View style={styles.noParamContainer}>
          <FontAwesome name="search" size={45 + settingsContext.state.fontIncrement} sty />
          <Text style={[styles.noParamText, { fontSize: 18 + settingsContext.state.fontIncrement }]}>{preacherTranslate.t("searchPlaceholderText")}</Text>
        </View>
      ) : state.isLoading ? (
        <Loading />
      ) : state.searchResults?.length === 0 ? (
        <View style={styles.noParamContainer}>
            <Entypo name="emoji-sad" size={45 + settingsContext.state.fontIncrement} />
          <Text style={[styles.noParamText, { fontSize: 18 + settingsContext.state.fontIncrement }]}>{preacherTranslate.t("noEntryFoundText")}</Text>
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={[styles.resultsText, { fontSize: 18 + settingsContext.state.fontIncrement }]}>
          {preacherTranslate.t("resultsLabelText")}: {state.searchResults?.length}
          </Text>
          <FlatList
            keyExtractor={((preacher) => preacher._id)}
            data={state.searchResults}
            renderItem={({ item }) => <Preacher preacher={item} />}
            scrollEnabled={false}
            numColumns={columnsNum}
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
