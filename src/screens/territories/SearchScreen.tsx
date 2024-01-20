import { Input } from "@rneui/themed";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ButtonC from "../../components/Button";
import { Context as TerritoriesContext } from "../../contexts/TerritoriesContext";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import Territory from "../../components/Territory";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

interface TerritoriesSearchScreenProps {
    route: {
        params: {
            type: string
        }
    }
}

const TerritoriesSearchScreen: React.FC<TerritoriesSearchScreenProps> = ({ route }) => {
  const [mainOpen, setMainOpen] = useState(false);
  const [mainValue, setMainValue] = useState(null);
  const [mainItems, setMainItems] = useState([
    { label: "Miejscowość", value: "city" },
    { label: "Ulica", value: "street" },
    { label: "Nr terenu", value: "number" },
    { label: "Rodzaj terenu", value: "kind" },
  ]);
  const [paramValue, setParamValue] = useState("");
  const [kindOpen, setKindOpen] = useState(false);
  const [kindItems, setKindItems] = useState([
    { label: "Tereny miejskie", value: "city" },
    { label: "Tereny wiejskie", value: "village" },
    { label: "tereny handlowe", value: "market" },
  ]);
  const [typeOpen, setTypeOpen] = useState(false);
  const [typeValue, setTypeValue] = useState(route.params.type);
  const [typeItems, setTypeItems] = useState([
    { label: "Wszystkie tereny", value: "all" },
    { label: "Wolne tereny", value: "available" },
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const { searchTerritory, state } = useContext(TerritoriesContext);

  useEffect(() => {
    searchTerritory(mainValue, paramValue, page, limit, typeValue);
  }, [page])

  return (
    <ScrollView style={styles.container}>
      <DropDownPicker
        placeholder='Wybierz rodzaj wyszukiwania'
        open={mainOpen}
        value={mainValue}
        items={mainItems}
        setOpen={setMainOpen}
        setValue={setMainValue}
        setItems={setMainItems}
        flatListProps={{
          scrollEnabled: false,
        }}
        containerStyle={{
            marginBottom: 15
        }}
        dropDownContainerStyle={{
          position: "absolute"
        }}
      />

      {mainValue === "city" && (
        <Input
          placeholder="Miejscowość"
          value={paramValue}
          onChangeText={setParamValue}
          inputContainerStyle={styles.inputContainer}
          containerStyle={styles.containerInput}
        />
      )}

      {mainValue === "street" && (
        <Input
          placeholder="Ulica"
          value={paramValue}
          onChangeText={setParamValue}
          inputContainerStyle={styles.inputContainer}
          containerStyle={styles.containerInput}
        />
      )}

      {mainValue === "number" && (
        <Input
          placeholder="Numer terenu"
          value={paramValue}
          onChangeText={setParamValue}
          inputContainerStyle={styles.inputContainer}
          containerStyle={styles.containerInput}
        />
      )}

      {mainValue === "kind" && !mainOpen && (
        <DropDownPicker
            placeholder="Wybierz rodzaj terenu"
            open={kindOpen}
            value={paramValue}
            items={kindItems}
            setOpen={setKindOpen}
            setValue={setParamValue}
            flatListProps={{ scrollEnabled: false }}
            containerStyle={{
                marginVertical: 15
            }}
        />
      )}

        { !mainOpen && !kindOpen && <DropDownPicker
            open={typeOpen}
            value={typeValue}
            items={typeItems}
            setOpen={setTypeOpen}
            setValue={setTypeValue}
            flatListProps={{ scrollEnabled: false }}
            containerStyle={{
                marginVertical: 15
            }}
        />}

        <ButtonC
            title="Szukaj"
            onPress={() => {
            setPage(1)
            searchTerritory(mainValue, paramValue, page, limit, typeValue);
            setSubmitted(true);
        }}
        />  

        {!submitted ? (
        <View style={styles.noParamContainer}>
          <FontAwesome name="search" size={45} sty />
          <Text style={styles.noParamText}>Wybierz parametry, by wyszukać</Text>
        </View>
      ) : state.isLoading ? (
        <Loading />
      ) : state.territories?.docs?.length === 0 ? (
        <View style={styles.noParamContainer}>
            <Entypo name="emoji-sad" size={45} />
          <Text style={styles.noParamText}>Niestety, nic nie znaleźliśmy dla takich parametrów</Text>
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>
            Rezultaty wyszukiwania: {state.territories?.totalDocs}
          </Text>
          <FlatList
            data={state.territories?.docs}
            renderItem={({ item }) => <Territory territory={item} />}
            scrollEnabled={false}
          />
          <Pagination activePage={page} totalPages={state.territories?.totalPages!} updateState={setPage} />
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
    borderColor: 'black',
    marginTop: 15
  },

  containerInput: {
      paddingHorizontal: 0,
      paddingVertical: 0,
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

export default TerritoriesSearchScreen;
