import { Entypo, FontAwesome } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Context as TerritoryContext } from '../../contexts/TerritoriesContext';
import { Context as AuthContext } from '../../contexts/AuthContext';
import { Context as PreachersContext } from '../../contexts/PreachersContext';
import Territory from '../../components/Territory';
import Loading from '../../components/Loading';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import Pagination from '../../components/Pagination';
import TerritoriesNavigator from '../../navigators/TerritoriesNavigator';
import { navigate } from '../../RootNavigation';
import { columnsNum } from '../../helpers/devices';
import FlashMessage, { showMessage } from 'react-native-flash-message';


interface TerritoriesAvailableScreenProps {
    navigation: NavigationProp<any>
}


const TerritoriesAvailableScreen: React.FC<TerritoriesAvailableScreenProps> = ({ navigation }) => {

    const { state, loadAvailableTerritories } = useContext(TerritoryContext);
    const congregationContext = useContext(AuthContext)
    const preachersContext = useContext(PreachersContext)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)

    useEffect(() => {
        
        loadAvailableTerritories(page, limit);
        congregationContext.loadCongregationInfo()
        preachersContext.loadAllPreachers();
        navigation.setOptions({
            headerRight: () => <TouchableOpacity style={styles.headerRight} onPress={() => navigation.navigate('Tereny', { screen: 'SearchTerritories', params: { type: 'available' } })}>
                <FontAwesome name='search' size={23} color={'white'} />
            </TouchableOpacity>
        })
        const unsubscribe = navigation.addListener('focus', () => {
            loadAvailableTerritories(page, limit);
            congregationContext.loadCongregationInfo()
            preachersContext.loadAllPreachers();
        });
    
        return unsubscribe;
    }, [navigation, page, limit])
    
    if(state.isLoading || congregationContext.state.isLoading || preachersContext.state.isLoading){
        return <Loading />
    }

    if(state.errMessage || congregationContext.state.errMessage || preachersContext.state.errMessage){
        Alert.alert("Server error", state.errMessage || congregationContext.state.errMessage || preachersContext.state.errMessage)
    }
    navigation.setOptions({
        headerTitle: `Wolne tereny: ${state.territories?.totalDocs}`,
    })
    return (
        <ScrollView style={styles.container}>
            { congregationContext.state.congregation && <MapView 
                provider={Platform.OS === "ios" || Platform.OS === "web" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE} 
                region={{
                    latitude: congregationContext.state.congregation?.mainCityLatitude!,
                    longitude: congregationContext.state.congregation?.mainCityLongitude!,
                    longitudeDelta: 0.03,
                    latitudeDelta: 0.03
                }}  
                style={styles.map}>
                { state.territories?.docs?.map((item) => item.location && <Marker coordinate={{longitude: item.longitude, latitude: item.latitude}} title={`Teren nr ${item.number} - ${item.kind}`} key={item._id}/>)}
                
            </MapView>}
            

            {state.territories?.docs?.length === 0 ? (
                <View style={styles.noParamContainer}>
                    <Entypo name="emoji-sad" size={45} />
                <Text style={styles.noParamText}>Niestety, nie ma już wolnych terenów</Text>
                </View>
            ) : (
                <>
                    
                    <FlatList 
                        keyExtractor={((territory) => territory._id)}
                        data={state.territories?.docs}
                        renderItem={({ item }) => <Territory territory={item} preachers={preachersContext.state.allPreachers} />}
                        scrollEnabled={false}
                        numColumns={columnsNum}
                    />
                    <Pagination activePage={state.territories?.page!} totalPages={state.territories?.totalPages!} updateState={setPage}/>
                </>
            )}
    
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
        padding: 15,
        flex: 1
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
      },
      noParamText: {
        marginTop: 15,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: "PoppinsRegular",
      },
    map: {
        height: 200,
        width: '100%',
        marginBottom: 20
    }
})

export default TerritoriesAvailableScreen;