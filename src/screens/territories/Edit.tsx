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
import { defaultStyles } from '../defaultStyles';
import MyInput from '../../components/MyInput';
import Label from '../../components/Label';

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
            territory: ITerritory
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
        { label: "Tereny handlowe", value: "market" },
    ]);
    const {editTerritory, state} = useContext(TerritoriesContext);
    const settings = useContext(SettingsContext)

    useEffect(() => {
        setNumber(route.params.territory?.number!.toString()!)
            setEndNumber(route.params.territory.endNumber?.toString()!)
            setBeginNumber(route.params.territory.beginNumber?.toString()!)
            setCity(route.params.territory.city!)
            setStreet(route.params.territory.street!);
            setKindValue(route.params.territory.kind!);
            setLocation(route.params.territory.location!);
            setDescription(route.params.territory.description!)
            
            setPhysicalCard(route.params.territory.isPhysicalCard)
    }, [route.params.territory])

    if(state.isLoading){
        return <Loading />
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center'}}>
            <MyInput 
                label='Numer terenu'
                placeholder='Wpisz nr terenu'
                keyboardType='numeric'
                value={number}
                onChangeText={setNumber}
            />
            <DropDownPicker
                open={kindOpen}
                value={kindValue}
                items={kindItems}
                setOpen={setKindOpen}
                setValue={setKindValue}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                flatListProps={{ scrollEnabled: false }}
                containerStyle={{
                    marginVertical: 15,
                    width: '100%'
                }}
            />

            <MyInput 
                label='Miejscowość'
                placeholder='Wpisz miejscowość'
                value={city}
                onChangeText={setCity}
            />

            <MyInput 
                label='Ulica'
                placeholder='Wpisz ulicę'
                value={street}
                onChangeText={setStreet}
            />

            {kindValue === 'city' && <>
                <MyInput 
                    label='Numer początkowy'
                    placeholder='Wpisz nr początkowy'
                    keyboardType='numeric'
                    value={beginNumber}
                    onChangeText={setBeginNumber}
                />
                <MyInput 
                    label='Numer końcowy'
                    placeholder='Wpisz nr końcowy'
                    keyboardType='numeric'
                    value={endNumber}
                    onChangeText={setEndNumber}
                />
            </>}

            <MyInput 
                label='Pełna lokalizacja'
                placeholder='Wpisz lokalizację'
                value={location}
                onChangeText={setLocation}
            />



            <MyInput
                label='Opis'
                placeholder='Wpisz opis'
                multiline={true}
                numberOfLines={5}
                value={description}
                onChangeText={setDescription}
            />
            <Label text='Czy jest fizyczna karta terenu?' />

            <Switch 
                value={physicalCard}
                onValueChange={(value) => setPhysicalCard(value)}
                style={{ alignSelf: 'flex-start',  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}

                color={settings.state.mainColor}
            />
            
            <View style={{ marginBottom: 50 }}>
                <ButtonC 
                    title='Edytuj teren' 
                    isLoading={state.isLoading}
                    onPress={() => editTerritory(territoryID, { number, kind: kindValue, city, street, beginNumber, endNumber, location, description, isPhysicalCard: physicalCard})} 
                />
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
        padding: 15,
        flex: 1,
    },
})

export default TerritoriesEditScreen;