import React, { useContext, useEffect, useState } from "react";
import { Alert, FlatList, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { Context as TerritoriesContext } from "../../contexts/TerritoriesContext";
import Loading from "../../components/Loading";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Territory from "../../components/Territory";
import { ITerritory } from "../../contexts/interfaces";
import { NavigationProp } from "@react-navigation/native";
import { columnsNum } from "../../helpers/devices";
import { countDaysFromNow } from "../../helpers/dates";

interface PreacherTerritoriesScreenProps {
    navigation: NavigationProp<any>
    route: {
        params: {
            preacherID: string
        }
    }
}

const PreacherTerritoriesScreen: React.FC<PreacherTerritoriesScreenProps> = ({ navigation, route }) => {
    const [preacherID, setPreacherID] = useState(route.params.preacherID);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(40)
    const { state, searchTerritory } = useContext(TerritoriesContext);

    const onShare = async (territories: ITerritory[]) => {
        console.log(territories.length)
        try {
          const result = await Share.share({
            message:
                `Witaj \n Twoje tereny to: \n ${territories.map((territory) => `• Teren nr ${territory.number} - ${territory.city}, ${territory?.street} ${territory?.beginNumber ? territory?.beginNumber : ''} ${territory.endNumber ? '- ' + territory?.endNumber: ''} ${territory.description || territory?.description !== ''  ? '(' + territory?.description + ')' : ''} ${countDaysFromNow(territory.taken) >= 120 ? '(do oddania)' : ''} \n`)}`,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error: any) {
          Alert.alert(error.message);
        }
      };

    useEffect(() => {
        searchTerritory('preacher', preacherID, page, limit, 'all')
    }, [preacherID])

    if(state.isLoading){
        return <Loading />
    }

    navigation.setOptions({
        headerRight: () => <View style={styles.headerRight}>
             <TouchableOpacity onPress={() => onShare(state.territories?.docs!)}>
                <Entypo name='share' size={23} color={'white'} />
            </TouchableOpacity>
        </View>
    })

    return (
        <ScrollView style={styles.container}>
            {state.territories?.docs?.length === 0 ? (
                <View style={styles.noParamContainer}>
                    <Entypo name="emoji-sad" size={45} />
                <Text style={styles.noParamText}>Niestety, dany głosiciel nie ma żadnych terenów</Text>
                </View>
            ) : (
                <View style={styles.resultsContainer}>
                <Text style={styles.resultsText}>
                    Rezultaty wyszukiwania: {state.territories?.totalDocs}
                </Text>
                <FlatList
                    keyExtractor={((territory) => territory._id)}
                    data={state.territories?.docs}
                    renderItem={({ item }) => <Territory territory={item} />}
                    scrollEnabled={false}
                    numColumns={columnsNum}
                />
                
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '',
        padding: 15
    },
    headerRight: {
        flexDirection: 'row',
        gap: 15,
        marginRight: 15
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
})

export default PreacherTerritoriesScreen;