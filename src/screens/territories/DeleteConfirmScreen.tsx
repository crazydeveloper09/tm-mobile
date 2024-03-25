import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Loading from "../../components/Loading";
import ButtonC from "../../components/Button";
import { Context as TerritoriesContext } from "../../contexts/TerritoriesContext";
import Territory from "../../components/Territory";

interface TerritoryDeleteConfirmScreenProps {
    navigation: NavigationProp<any>;
    route: {
        params: {
            id: string
        }
    }
}

const TerritoryDeleteConfirmScreen: React.FC<TerritoryDeleteConfirmScreenProps> = ({ navigation, route }) => {
    const [TerritoryID, setTerritoryID] = useState(route.params.id)
    const {state, loadTerritoryHistory, deleteTerritory} = useContext(TerritoriesContext)

    useEffect(() => {
        loadTerritoryHistory(TerritoryID)
    }, [TerritoryID])

    if(state.isLoading) {
        return <Loading />
    }

    
    if(state.errMessage){
        Alert.alert("Server error", state.errMessage)
    }

    return (
        <View style={styles.container}>
            <FontAwesome name='exclamation-circle' size={75} color={'red'} />
            <Text style={styles.text}>Czy na pewno chcesz usunąć teren nr {state.territory?.number}?</Text>
            <View>
                <ButtonC title="Tak" onPress={() => deleteTerritory(TerritoryID)} />
                <ButtonC title="Nie" onPress={() => navigation.navigate('TerritoriesList')} />
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