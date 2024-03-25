import { Button } from '@rneui/themed';
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Context as AuthContext } from '../../contexts/AuthContext';
import { NavigationProp } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
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
                    <FontAwesome name='pencil' size={23} color={'white'} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('CongActivity')}>
                    <FontAwesome5 name='shield-alt' size={23} color={'white'} />
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
                    <FontAwesome name='plus' size={22} />
                </TouchableOpacity>
        
            </View>
            <MinistryGroups congregationID={state.congregation?._id!} />
            <Text style={styles.header}>Mapka</Text>
            <MapView provider={PROVIDER_GOOGLE} initialRegion={{
                latitude: state.congregation?.mainCityLatitude!,
                longitude: state.congregation?.mainCityLongitude!,
                longitudeDelta: 0.04,
                latitudeDelta: 0.04
            }} style={styles.map} />
           
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
        padding: 15,
        flex: 1
    },
    map: {
        height: 400,
        width: '100%',
        marginVertical: 15
    },
    header: {
        fontFamily: 'InterSemiBold',
        fontSize: 21
    },
    congregationInfo: {
        padding: 10,
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
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center'
    },
    textBold: {
        fontFamily: 'InterSemiBold',
        textAlign: 'center'
    },
    headerRight: {
        flexDirection: 'row',
        gap: 15,
        marginRight: 15
    }
})

export default CongregationsInfoScreen;