import { FontAwesome } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, ScrollView, Platform, Dimensions, Alert } from 'react-native';
import { Context as TerritoryContext } from '../../contexts/TerritoriesContext';
import { Context as AuthContext } from '../../contexts/AuthContext';
import { Context as PreachersContext } from '../../contexts/PreachersContext';
import Territory from '../../components/Territory';
import Loading from '../../components/Loading';
import MapView, { MapMarker, Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import Pagination from '../../components/Pagination';
import { columnsNum, isTablet } from '../../helpers/devices';

interface TerritoriesIndexScreenProps {
    navigation: NavigationProp<any>
}


const TerritoriesIndexScreen: React.FC<TerritoriesIndexScreenProps> = ({ navigation }) => {

    const { state, loadTerritories } = useContext(TerritoryContext)
    const congregationContext = useContext(AuthContext)
    const preachersContext = useContext(PreachersContext)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)


    useEffect(() => {
        
        loadTerritories(page, limit);
        navigation.setOptions({
            headerRight: () => <View style={styles.headerRight}>
                <TouchableOpacity onPress={() => navigation.navigate('AddTerritory')}>
                    <FontAwesome name='plus' size={23} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate('SearchTerritories', {type: 'all'})}>
                    <FontAwesome name='search' size={23} color={'white'} />
                </TouchableOpacity>
                
            </View>
        })
        const unsubscribe = navigation.addListener('focus', () => {
            loadTerritories(page, limit);
        });
    
        return unsubscribe;
    }, [navigation, page])
    
    if(state.isLoading){
        return <Loading />
    }

    if(state.errMessage){
        Alert.alert("Server error", state.errMessage)
    }

    navigation.setOptions({
        headerTitle: `Tereny: ${state.territories?.totalDocs}`,
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
            <FlatList 
                keyExtractor={((territory) => territory._id)}
                data={state.territories?.docs}
                renderItem={({ item }) => <Territory territory={item} preachers={preachersContext.state.allPreachers!} />}
                scrollEnabled={false}
                contentContainerStyle={ isTablet && { gap: 10 }}
                numColumns={columnsNum}
            />

            <Pagination activePage={state.territories?.page!} totalPages={state.territories?.totalPages!} updateState={setPage} />
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

export default TerritoriesIndexScreen;