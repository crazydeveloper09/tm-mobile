import React from "react";
import { IPreacher, ITerritory } from "../contexts/interfaces";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Badge } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { changeColorForDates, countDaysFromNow } from "../helpers/dates";
import { isTablet } from "../helpers/devices";
import TerritoryAssignment from "./TerritoryAssignment";
import DescriptionAndValue from "./common/DescriptionAndValue";


interface TerritoryProps {
  territory: ITerritory;
  preachers?: IPreacher[];
}

const Territory: React.FC<TerritoryProps> = ({ territory, preachers }) => {
  const navigation = useNavigation();
 

    
  let backgroundColor;
  let territoryKindText;
  switch (territory.kind) {
    case "city":
      backgroundColor = "#f6edd9";
      territoryKindText = 'Teren miejski';
      break;
    case "market":
      backgroundColor = "white";
      territoryKindText = 'Teren handlowo-usługowy';
      break;
    case "village":
      backgroundColor = "#e1f1ff";
      territoryKindText = 'Teren wiejski';
      break;
    default:
      break;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor },
        !territory.isPhysicalCard && { borderWidth: 3, borderColor: "#9999CC" },
      ]}
    >
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.title}>Karta terenu nr {territory.number}</Text>
          <Text style={styles.territoryKind}>{territoryKindText}</Text>
        </View>
        
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Tereny", {
                screen: "TerritoryHistory",
                params: { id: territory._id },
              } as never)
            }
          >
            <FontAwesome name="calendar" color="black" size={22} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Tereny", {
                screen: "EditTerritory",
                params: { id: territory._id },
              } as never)
            }
          >
            <FontAwesome name="pencil" color="black" size={22} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Tereny", {
                screen: "DeleteConfirmTerritory",
                params: { id: territory._id },
              } as never)
            }
          >
            <FontAwesome name="trash" color="black" size={22} />
          </TouchableOpacity>
        </View>
      </View>
      <DescriptionAndValue description="Miejscowość" value={territory.city} />
      

      {territory.street && (
        <DescriptionAndValue description="Ulica" value={`${territory.street} ${territory.beginNumber && territory.beginNumber}{" "}
        ${territory.endNumber && '-' + territory.endNumber} `} />
      )}
      {territory.description && (
          <DescriptionAndValue description="Opis" value={territory.description} />
      )}
      {territory?.type === "free" && (
        <>
          <DescriptionAndValue description="Ostatnio opracowane" value={territory?.lastWorked} />
          <Text style={styles.text}>
            <Text>Teren nie był opracowywany od </Text>
            <Text
              style={[
                styles.textBold,
                { color: changeColorForDates(territory?.lastWorked!) },
              ]}
            >
              {countDaysFromNow(territory?.lastWorked!)}
            </Text>
            <Text> dni</Text>
          </Text>
          <Badge
            value="Wolny"
            containerStyle={{ position: "absolute", top: 50, right: 5 }}
            badgeStyle={styles.freeBadge}
          />
          {!territory.isPhysicalCard && (
            <Text style={[styles.text, styles.textBold, { color: "#9999CC" }]}>
              <Text>Teren nie ma karty fizycznej </Text>
            </Text>
          )}
        </>
      )}
      {territory?.preacher && (
        <>
          <DescriptionAndValue description="Pobrany" value={territory?.taken} />
          <DescriptionAndValue description="Głosiciel" value={territory?.preacher.name} />
          <Text style={styles.text}>
            <Text>{territory?.preacher.name} ma ten teren </Text>
            <Text
              style={[
                styles.textBold,
                { color: changeColorForDates(territory?.taken!) },
              ]}
            >
              {countDaysFromNow(territory?.taken!)}
            </Text>
            <Text> dni</Text>
          </Text>
        </>
      )}
      {territory?.preacher && countDaysFromNow(territory.taken) >= 120 && (
        <Badge
          value="Do oddania"
          status="error"
          containerStyle={{ position: "absolute", top: 65, right: 5 }}
        />
      )}
      {territory?.type === "free" &&
        countDaysFromNow(territory.lastWorked) >= 120 && (
          <Badge
            value="Do przydzielenia"
            status="error"
            containerStyle={{ position: "absolute", top: 75, right: 5 }}
          />
        )}
      <TerritoryAssignment territory={territory} preachers={preachers} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    height: "auto",
    width: isTablet ? "49%" : "auto",
    marginRight: isTablet ? 15 : 0,
  },
  titleContainer: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
  },
  territoryKind: {
    fontFamily: "MontserratRegular",
  },
  title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 19,
  },
  text: {
    fontFamily: "InterRegular",
    fontSize: 16,
    marginBottom: 10,
  },
  textBold: {
    fontFamily: "InterSemiBold",
  },
  freeBadge: {
    backgroundColor: "#28a745",
  },
  
});

export default Territory;
