import { Button } from '@rneui/themed';
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Context as AuthContext } from '../../contexts/AuthContext';
import { NavigationProp } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
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
            headerRight: () => <TouchableOpacity style={styles.headerRight} onPress={() => navigation.navigate('EditCong')}>
                <FontAwesome name='pencil' size={23} color={'white'} />
            </TouchableOpacity>
        })
        const unsubscribe = navigation.addListener('focus', () => {
            loadCongregationInfo();
            navigation.setOptions({
                headerTitle: state.congregation?.username,
            })
        });
    
        return unsubscribe;
    }, [navigation])

    if(state.isLoading) {
        return <Loading />
    }


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
            <MapView initialRegion={{
                latitude: state.congregation?.mainCityLatitude!,
                longitude: state.congregation?.mainCityLongitude!,
                longitudeDelta: 0.04,
                latitudeDelta: 0.04
            }} style={styles.map} />
            <Button 
                title={'Wyloguj się'}
                onPress={() => signOut()}
            />
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