import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { Context as TerritoryContext } from "../../contexts/TerritoriesContext";
import { Context as AuthContext } from "../../contexts/AuthContext";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import Territory from "../../components/Territory";
import Loading from "../../components/Loading";
import MapView, {
  MapMarker,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system/legacy";
import Pagination from "../../components/Pagination";
import { columnsNum, isTablet } from "../../helpers/devices";
import { buildTerritorysPDF } from "./helpers/pdf";
import { ITerritory } from "../../contexts/interfaces";
import IconLink from "../../components/IconLink";
import { buildTerritoryHistoryPDF } from "./helpers/historyPdf";
import TopMenu from "../../components/TopMenu";
import { groupBy } from "../../helpers/arrays";
import { countDaysFromNow } from "../../helpers/dates";
import ToReturnTerritories from "./components/ToReturnTerritories";

interface TerritoriesIndexScreenProps {
  navigation: NavigationProp<any>;
}

const TerritoriesIndexScreen: React.FC<TerritoriesIndexScreenProps> = ({
  navigation,
}) => {
  const { state, loadTerritories, loadAllTerritories, clearError } =
    useContext(TerritoryContext);
  const congregationContext = useContext(AuthContext);
  const preachersContext = useContext(PreachersContext);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [tabs, setTabs] = useState(["Wszystkie", "Wolne", "Do oddania"]);
  const [currentTab, setCurrentTab] = useState("Wszystkie");

  const generateTerritoriesPDF = async (territories: ITerritory[]) => {
    try {
      const html = buildTerritorysPDF(territories);
      // Native platforms (iOS/Android) - your original code
      const { uri } = await Print.printToFileAsync({ html });

      const newPath = FileSystem.documentDirectory + `Spis_terenów.pdf`;
      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(newPath);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Nie można wygenerować PDF. Spróbuj ponownie później.",
      );
    }
  };

  const generateTerritoriesHistoryPDF = async (territories: ITerritory[]) => {
    try {
      const html = buildTerritoryHistoryPDF(territories);
      const { uri } = await Print.printToFileAsync({ html });

      const newPath = FileSystem.documentDirectory + `Kartoteka_terenów.pdf`;
      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(newPath);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Nie można wygenerować PDF. Spróbuj ponownie później.",
      );
    }
  };


  useEffect(() => {
    if (currentTab !== "Do oddania") {
        loadTerritories(page, limit, currentTab);
        congregationContext.loadCongregationInfo()
        preachersContext.loadAllPreachers();
    }
    loadAllTerritories();
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate("AddTerritory")}>
            <MaterialCommunityIcons name="plus" size={34} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SearchTerritories", { type: "all" })
            }
          >
            <MaterialCommunityIcons name="magnify" size={34} color={"white"} />
          </TouchableOpacity>
        </View>
      ),
    });
    const unsubscribe = navigation.addListener("focus", () => {
      if (currentTab !== "Do oddania") {
        loadTerritories(page, limit, currentTab);
        congregationContext.loadCongregationInfo()
        preachersContext.loadAllPreachers();
      }
    });

    return unsubscribe;
  }, [navigation, page, currentTab]);

  if (state.isLoading || congregationContext.state.isLoading || preachersContext.state.isLoading) {
    return <Loading />;
  }

  if (state.errMessage || congregationContext.state.errMessage || preachersContext.state.errMessage) {
    Alert.alert("Server error", state.errMessage || congregationContext.state.errMessage || preachersContext.state.errMessage, [
      { text: "OK", onPress: () => clearError() },
    ]);
  }

  const toReturn =
    state.allTerritories?.filter(
      (t) => t.preacher && countDaysFromNow(t.taken) > 120,
    ) || [];
  const grouped = groupBy(toReturn, (t) => t.preacher?.name ?? "Brak");

  return (
    <ScrollView>
      <TopMenu state={currentTab} data={tabs} updateState={setCurrentTab} />
      <View style={styles.container}>
        {currentTab === "Do oddania" ? (
          <FlatList
            data={Object.keys(grouped)}
            renderItem={({ item }) => (
               <ToReturnTerritories item={item} grouped={grouped} preachers={preachersContext.state.allPreachers!} />
            )}
            scrollEnabled={false}
          />
        ) : (
          <>
            {congregationContext.state.congregation && (
              <MapView
                provider={
                  Platform.OS === "ios" || Platform.OS === "web"
                    ? PROVIDER_DEFAULT
                    : PROVIDER_GOOGLE
                }
                region={{
                  latitude:
                    congregationContext.state.congregation?.mainCityLatitude!,
                  longitude:
                    congregationContext.state.congregation?.mainCityLongitude!,
                  longitudeDelta: 0.03,
                  latitudeDelta: 0.03,
                }}
                style={styles.map}
              >
                {state.territories?.docs?.map(
                  (item) =>
                    item.location && (
                      <Marker
                        coordinate={{
                          longitude: item.longitude,
                          latitude: item.latitude,
                        }}
                        title={`Teren nr ${item.number} - ${item.kind}`}
                        key={item._id}
                      />
                    ),
                )}
              </MapView>
            )}
            <Text style={styles.resultsText}>
              Liczba terenów: {state.territories?.totalDocs}
            </Text>

            {currentTab === "Wszystkie" && (
              <>
                <IconLink
                  iconName="download"
                  description={`Pobierz spis terenów`}
                  onPress={() =>
                    generateTerritoriesPDF(state.allTerritories || [])
                  }
                  isCentered
                />
                <IconLink
                  iconName="download"
                  description={`Pobierz kartotekę terenów`}
                  onPress={() =>
                    generateTerritoriesHistoryPDF(state.allTerritories || [])
                  }
                  isCentered
                />
              </>
            )}

            <FlatList
              keyExtractor={(territory) => territory._id}
              data={state.territories?.docs}
              renderItem={({ item }) => (
                <Territory
                  territory={item}
                  preachers={preachersContext.state.allPreachers!}
                />
              )}
              scrollEnabled={false}
              contentContainerStyle={isTablet && { gap: 10 }}
              numColumns={columnsNum}
            />

            <Pagination
              activePage={state.territories?.page!}
              totalPages={state.territories?.totalPages!}
              updateState={setPage}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ece9e9",
    padding: 15,
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    gap: 15,
    marginRight: 15,
  },
  map: {
    height: 200,
    width: "100%",
    marginBottom: 20,
  },
  resultsText: {
    fontSize: 21,
    textAlign: "center",
    fontFamily: "MontserratRegular",
    marginVertical: 20,
  },
});

export default TerritoriesIndexScreen;
