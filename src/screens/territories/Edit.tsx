import { CheckBox, Input, Switch } from '@rneui/base';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import Loading from '../../components/Loading';
import { Context as TerritoriesContext } from '../../contexts/TerritoriesContext';
import territories from '../../api/territories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPreacher, ITerritory } from '../../contexts/interfaces';
import ButtonC from '../../components/Button';
import { Context as SettingsContext } from '../../contexts/SettingsContext';

export interface ITerritoryForm {
    number: number;
    kind: string;
    city: string;
    street: string;
    beginNumber: number;
    endNumber: number;
    location: string;
    lastWorked: Date;
    preacher: string;
    taken: string;
    description: string;
    isPhysicalCard: boolean
}

interface TerritoriesEditScreenProps {
    route: {
        params: {
            id: string
        }
    }
}

const TerritoriesEditScreen: React.FC<TerritoriesEditScreenProps> = ({ route }) => {
    const [territoryID, setTerritoryID] = useState('');
    const [physicalCard, setPhysicalCard] = useState(false);
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [endNumber, setEndNumber] = useState('');
    const [beginNumber, setBeginNumber] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [kindValue, setKindValue] = useState("");
    const [kindOpen, setKindOpen] = useState(false);
    const [kindItems, setKindItems] = useState([
        { label: "Tereny miejskie", value: "city" },
        { label: "Tereny wiejskie", value: "village" },
        { label: "tereny handlowe", value: "market" },
    ]);
    const {editTerritory, loadTerritoryHistory, state, turnOffLoading, turnOnLoading} = useContext(TerritoriesContext);
    const settings = useContext(SettingsContext)


    const loadTerritory = async (id: string) => {
        turnOnLoading()
        const token = await AsyncStorage.getItem('token')
        territories.get<{territory: ITerritory}>(`/territories/${id}`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        .then((response) => {
            setNumber(response.data.territory?.number!.toString()!)
            setEndNumber(response.data.territory.endNumber?.toString()!)
            setBeginNumber(response.data.territory.beginNumber?.toString()!)
            setCity(response.data.territory.city!)
            setStreet(response.data.territory.street!);
            setKindValue(response.data.territory.kind!);
            setLocation(response.data.territory.location!);
            setDescription(response.data.territory.description!)
            
            setPhysicalCard(response.data.territory.isPhysicalCard)
            
            turnOffLoading()
        })
        .catch((err) => console.log(err))
    }
    useEffect(() => {
        setTerritoryID(route.params.id)
        loadTerritory(territoryID);
        settings.loadColor()
    }, [route.params.id, territoryID])

    if(state.isLoading){
        return <Loading />
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center'}}>
            <Input 
                label='Numer terenu'
                placeholder='Wpisz nr terenu'
                keyboardType='numeric'
                value={number}
                onChangeText={setNumber}
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.labelStyle}
                containerStyle={styles.containerInput}
            />
            <DropDownPicker
                open={kindOpen}
                value={kindValue}
                items={kindItems}
                setOpen={setKindOpen}
                setValue={setKindValue}
                flatListProps={{ scrollEnabled: false }}
                containerStyle={{
                    marginVertical: 15,
                    width: '100%'
                }}
            />

            <Input 
                label='Miejscowość'
                placeholder='Wpisz miejscowość'
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.labelStyle}
                containerStyle={styles.containerInput}
                value={city}
                onChangeText={setCity}
            />

            <Input 
                label='Ulica'
                placeholder='Wpisz ulicę'
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.labelStyle}
                containerStyle={styles.containerInput}
                value={street}
                onChangeText={setStreet}
            />

            {kindValue === 'city' && <>
                <Input 
                    label='Numer początkowy'
                    placeholder='Wpisz nr początkowy'
                    keyboardType='numeric'
                    inputContainerStyle={styles.inputContainer}
                    labelStyle={styles.labelStyle}
                containerStyle={styles.containerInput}
                    value={beginNumber}
                    onChangeText={setBeginNumber}
                />
                <Input 
                    label='Numer końcowy'
                    placeholder='Wpisz nr końcowy'
                    keyboardType='numeric'
                    inputContainerStyle={styles.inputContainer}
                    labelStyle={styles.labelStyle}
                containerStyle={styles.containerInput}
                    value={endNumber}
                    onChangeText={setEndNumber}
                />
            </>}

            <Input 
                label='Pełna lokalizacja'
                placeholder='Wpisz lokalizację'
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.labelStyle}
                containerStyle={styles.containerInput}
                value={location}
                onChangeText={setLocation}
            />



            <Input
                label='Opis'
                placeholder='Wpisz opis'
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.labelStyle}
                containerStyle={styles.containerInput}
                multiline={true}
                numberOfLines={5}
                value={description}
                onChangeText={setDescription}
            />
            <Text style={styles.labelStyle}>
                Czy jest fizyczna karta terenu?
            </Text>

            <Switch 
                value={physicalCard}
                onValueChange={(value) => setPhysicalCard(value)}
                style={{ alignSelf: 'flex-start',  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}

                color={settings.state.mainColor}
            />
            

            <ButtonC 
                title='Edytuj teren' 
                isLoading={state.isLoading}
                onPress={() => editTerritory(territoryID, { number, kind: kindValue, city, street, beginNumber, endNumber, location, description, isPhysicalCard: physicalCard})} 
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
        padding: 15,
        flex: 1,
    },
    inputContainer: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 6,
        padding: 5,
        borderColor: 'black',
    },
    labelStyle: {
        fontFamily: 'MontserratSemiBold',
        marginBottom: 6,
        color: 'black'
    },
    containerInput: {
        paddingHorizontal: 0,
        paddingVertical: 0,
    }
})

export default TerritoriesEditScreen;