import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Loading from "../../components/Loading";
import ButtonC from "../../components/Button";
import { Context as TerritoriesContext } from "../../contexts/TerritoriesContext";
import Territory from "../../components/Territory";
import { ITerritory } from "../../contexts/interfaces";
import useLocaLization from "../../hooks/useLocalization";
import { mainTranslations } from "../../../localization";

interface TerritoryDeleteConfirmScreenProps {
    navigation: NavigationProp<any>;
    route: {
        params: {
            territory: ITerritory
        }
    }
}

const TerritoryDeleteConfirmScreen: React.FC<TerritoryDeleteConfirmScreenProps> = ({ navigation, route }) => {
    const {state, deleteTerritory} = useContext(TerritoriesContext)
    const mainTranslate = useLocaLization(mainTranslations)

    return (
        <View style={styles.container}>
            <FontAwesome name='exclamation-circle' size={75} color={'red'} />
            <Text style={styles.text}>Czy na pewno chcesz usunąć teren nr {route.params.territory.number}?</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ width: '48%' }}>
                    <ButtonC title={mainTranslate.t("yes")} onPress={() => deleteTerritory(route.params.territory._id)} isLoading={state.isLoading} color="#AD371F" />
                </View>
                <View style={{ width: '48%' }}>
                    <ButtonC title={mainTranslate.t("no")} onPress={() => navigation.navigate('Tereny', {
                screen: "TerritoryHistory",
                params: { id: route.params.territory._id },
              } as never)} />
                </View>
            
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    text: {
        fontSize: 25,
        fontFamily: 'PoppinsSemiBold',
        textAlign: "center"
    }
})

export default TerritoryDeleteConfirmScreen;