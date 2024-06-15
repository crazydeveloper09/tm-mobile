import { Button } from '@rneui/themed';
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { Context as AuthContext } from '../../contexts/AuthContext';
import { NavigationProp } from '@react-navigation/native';
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MinistryGroups from '../../components/MinistryGroups';
import Loading from '../../components/Loading';

interface CongregationsInfoScreenProps {
    navigation: NavigationProp<any>
}

const CongregationsInfoScreen: React.FC<CongregationsInfoScreenProps> = ({ navigation }) => {
    const { signOut, state, loadCongregationInfo } = useContext(AuthContext);

    useEffect(() => {
        loadCongregationInfo();
        navigation.setOptions({
            headerTitle: state.congregation?.username || 'Zbór',
            headerRight: () =>
            <View style={styles.headerRight}>
                <TouchableOpacity onPress={() => navigation.navigate('EditCong')}>
                    <MaterialCommunityIcons name='pencil' size={30} color={'white'} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('CongActivity')}>
                    <MaterialCommunityIcons name='security' size={30} color={'white'} />
                </TouchableOpacity>
                
            </View> 
        })
        const unsubscribe = navigation.addListener('focus', () => {
            loadCongregationInfo();
        });
    
        return unsubscribe;
    }, [navigation])

    if(state.isLoading) {
        return <Loading />
    }

    if(state.errMessage){
        Alert.alert("Server error", state.errMessage)
    }

    navigation.setOptions({
        headerTitle: state.congregation?.username,
    })

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Ogólne informacje</Text>
            <View style={styles.congregationInfo}>
                <Text style={styles.text}>Email sługi terenu</Text>
                <Text style={styles.textBold}>{state.congregation?.territoryServantEmail}</Text>
            </View>
            <View style={styles.congregationInfo}>
                <Text style={styles.text}>Email nadzorcy służby</Text>
                <Text style={styles.textBold}>{state.congregation?.ministryOverseerEmail}</Text>
            </View>
            <View style={styles.congregationInfo}>
                <Text style={styles.text}>Główne miasto zboru</Text>
                <Text style={styles.textBold}>{state.congregation?.mainCity}</Text>
            </View>

            <View style={styles.ministryGroupTitleContainer}>
                <Text style={styles.header}>Grupy służby</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddMinistryGroup', { congregationID: state.congregation?._id })}>
                    <MaterialCommunityIcons name='plus' size={30} />
                </TouchableOpacity>
        
            </View>
            <MinistryGroups congregationID={state.congregation?._id!} />
            <Text style={styles.header}>Mapka</Text>
            { state.congregation && <MapView 
                provider={Platform.OS === "ios" || Platform.OS === "web" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE} 
                region={{
                    latitude: state.congregation?.mainCityLatitude!,
                    longitude: state.congregation?.mainCityLongitude!,
                    longitudeDelta: 0.03,
                    latitudeDelta: 0.03
                }}  
                style={styles.map}>
                
                
            </MapView>}
           
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
        padding: 15,
        flex: 1,
    },
    map: {
        height: 400,
        width: '100%',
        marginTop: 15,
        marginBottom: 50
    },
    header: {
        fontFamily: 'InterSemiBold',
        fontSize: 21
    },
    congregationInfo: {
        padding: 13,
        backgroundColor: 'white',
        marginVertical: 10,
        borderColor: '#9999cc',
        borderWidth: 1,
        borderRadius: 10
    },
    ministryGroupTitleContainer: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginTop: 15
    },
    text: {
        fontFamily: 'InterRegular',
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center'
    },
    textBold: {
        fontFamily: 'InterSemiBold',
        textAlign: 'center',
        fontSize: 15
    },
    headerRight: {
        flexDirection: 'row',
        gap: 15,
        marginRight: 15
    }
})

export default CongregationsInfoScreen;