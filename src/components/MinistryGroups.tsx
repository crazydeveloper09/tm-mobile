import React, { useContext, useEffect } from "react";
import { Context as MinistryGroupContext } from "../contexts/MinistryGroupContext";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Context as SettingsContext } from "../contexts/SettingsContext";

interface MinistryGroupsProps {
  congregationID: string;
}

const MinistryGroups: React.FC<MinistryGroupsProps> = ({ congregationID }) => {
  const { state, loadMinistryGroups, deleteMinistryGroup } = useContext(MinistryGroupContext);
  const navigation = useNavigation()
  const settings = useContext(SettingsContext);


  useEffect(() => {
    settings.loadColor()
    loadMinistryGroups(congregationID);
  }, [settings.state.mainColor, congregationID]);

  if (state.isLoading) {
    return <ActivityIndicator size={"large"} color={settings.state.mainColor} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={state.ministryGroups}
        renderItem={(ministryGroup) => (
          <View>
            <Text style={[styles.title, { backgroundColor: settings.state.mainColor }]}>{ministryGroup.item.name}</Text>
            <FlatList
              data={ministryGroup.item.preachers}
              renderItem={(preacher) =>
                preacher.item?.name === ministryGroup.item.overseer?.name ? (
                  <Text style={[styles.preacher, { fontWeight: "bold", backgroundColor: `${settings.state.mainColor}20` }]}>
                    {preacher.item?.name}
                  </Text>
                ) : (
                  <Text style={[styles.preacher, preacher.index % 2 === 0 && { backgroundColor: '#d6d6d6' }]}>{preacher.item?.name}</Text>
                )
              }
            />
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('EditMinistryGroup', { congregationID, ministryGroupID: ministryGroup.item._id })}>
                <MaterialCommunityIcons name="pencil" size={26} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteMinistryGroup(congregationID, ministryGroup.item._id)}>
                <MaterialCommunityIcons name="trash-can" size={26} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    padding: 13,
    color: "white",
    fontSize: 16,
    width: 200,
    textAlign: "center",
    fontWeight: "bold",
  },
  preacher: {
    width: 200,
    padding: 8,
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    gap: 20
},
});

export default MinistryGroups;
