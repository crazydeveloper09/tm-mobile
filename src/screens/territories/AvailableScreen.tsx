import { FontAwesome } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Context as TerritoryContext } from '../../contexts/TerritoriesContext';
import { Context as AuthContext } from '../../contexts/AuthContext';
import Territory from '../../components/Territory';
import Loading from '../../components/Loading';
import MapView, { Marker } from 'react-native-maps';
import Pagination from '../../components/Pagination';
import TerritoriesNavigator from '../../navigators/TerritoriesNavigator';
import { navigate } from '../../RootNavigation';

interface TerritoriesAvailableScreenProps {
    navigation: NavigationProp<any>
}


const TerritoriesAvailableScreen: React.FC<TerritoriesAvailableScreenProps> = ({ navigation }) => {

    const { state, loadAvailableTerritories } = useContext(TerritoryContext);
    const congregationContext = useContext(AuthContext)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Wolne tereny',
            headerRight: () => <TouchableOpacity style={styles.headerRight} onPress={() => navigation.navigate('Tereny', { screen: 'SearchTerritories', params: { type: 'available' } })}>
                <FontAwesome name='search' size={23} color={'white'} />
            </TouchableOpacity>
        })
        loadAvailableTerritories(page, limit);
        congregationContext.loadCongregationInfo()
        const unsubscribe = navigation.addListener('focus', () => {
            loadAvailableTerritories(page, limit);
            congregationContext.loadCongregationInfo()
        });
    
        return unsubscribe;
    }, [navigation, page])
    
    if(state.isLoading && congregationContext.state.isLoading){
        return <Loading />
    }

    return (
        <ScrollView style={styles.container}>
            <MapView region={{
                latitude: congregationContext.state.congregation?.mainCityLatitude!,
                longitude: congregationContext.state.congregation?.mainCityLongitude!,
                longitudeDelta: 0.03,
                latitudeDelta: 0.03
            }} style={styles.map}>
                { state.territories?.docs?.map((item) => item.location && <Marker coordinate={{longitude: item.longitude, latitude: item.latitude}} title={`Teren nr ${item.number} - ${item.kind}`} key={item._id}/>)}
                
            </MapView>
            <FlatList 
                data={state.territories?.docs}
                renderItem={({ item }) => <Territory territory={item} />}
                scrollEnabled={false}
            />
            <Pagination activePage={state.territories?.page!} totalPages={state.territories?.totalPages!} updateState={setPage}/>
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
    map: {
        height: 200,
        width: '100%',
        marginBottom: 20
    }
})

export default TerritoriesAvailableScreen;