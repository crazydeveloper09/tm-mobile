import { CheckBox, Input, Switch } from '@rneui/base';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import Loading from '../../components/Loading';
import { Context as TerritoriesContext } from '../../contexts/TerritoriesContext';
import { Context as SettingsContext } from '../../contexts/SettingsContext';
import territories from '../../api/territories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPreacher } from '../../contexts/interfaces';
import ButtonC from '../../components/Button';
import { defaultStyles } from '../defaultStyles';
import MyInput from '../../components/MyInput';
import Label from '../../components/Label';
import ChooseDate from '../../components/ChooseDate';

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

const TerritoriesNewScreen: React.FC = () => {
    const [physicalCard, setPhysicalCard] = useState(false);
    const [noPhysicalCard, setNoPhysicalCard] = useState(false);
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
    const [preacherValue, setPreacherValue] = useState("");
    const [preacherOpen, setPreacherOpen] = useState(false);
    const [preacherItems, setPreacherItems] = useState([
        { label: "Wolny teren", value: "" },
    ]);
    const [lastWorkedOpen, setLastWorkedOpen] = useState(false)
    const [lastWorked, setLastWorked] = useState(new Date())
    const [takenOpen, setTakenOpen] = useState(false)
    const [taken, setTaken] = useState(new Date())
    const {addTerritory, state} = useContext(TerritoriesContext);
    const settings = useContext(SettingsContext)

    const loadPreachers = async () => {
        const token = await AsyncStorage.getItem('token')
        territories.get<IPreacher[]>('/preachers/all', {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        .then((response) => {
            const selectItems = response.data.map((preacher) => {
                return { label: preacher.name, value: preacher._id } as never
            })
            selectItems.unshift({ label: "Wolny teren", value: "" } as never)
            setPreacherItems(selectItems)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        loadPreachers()
    }, [])

    
    if(state.errMessage){
        Alert.alert("Server error", state.errMessage)
    }    

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', marginBottom: 40}}>
            <MyInput 
                label='Numer terenu'
                placeholder='Wpisz nr terenu'
                keyboardType='numeric'
                value={number}
                onChangeText={setNumber}
            />
            <Label text='Rodzaj terenu' />
            <DropDownPicker
                placeholder='Wybierz rodzaj terenu'
                open={kindOpen}
                value={kindValue}
                items={kindItems}
                setOpen={setKindOpen}
                setValue={setKindValue}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                flatListProps={{ scrollEnabled: false }}
                containerStyle={{
                    marginBottom: 15,
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

            <ChooseDate 
                label="Ostatnio opracowane"
                date={lastWorked}
                dateOpen={lastWorkedOpen}
                setDate={setLastWorked}
                setDateOpen={setLastWorkedOpen}
            />
            <Label text='Wybierz głosiciela' />
            <DropDownPicker
                open={preacherOpen}
                value={preacherValue}
                items={preacherItems}
                setOpen={setPreacherOpen}
                setValue={setPreacherValue}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                searchable={true}
                flatListProps={{ scrollEnabled: false }}
                containerStyle={{
                    marginBottom: 15,
                    width: '100%'
                }}
            />

            <ChooseDate 
                label="Pobrany"
                date={taken}
                dateOpen={takenOpen}
                setDate={setTaken}
                setDateOpen={setTakenOpen}
            />


            <MyInput
                label='Opis'
                placeholder='Wpisz opis'
                multiline={true}
                numberOfLines={5}
                value={description}
                onChangeText={setDescription}
            />
            <Label text='Czy jest fizyczna karta terenu' />
            <Switch 
                value={physicalCard}
                onValueChange={(value) => setPhysicalCard(value)}
                style={{ alignSelf: 'flex-start',  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}

                color={settings.state.mainColor}
            />
            <View style={{ marginBottom: 50 }}>
                <ButtonC 
                    title='Dodaj teren' 
                    isLoading={state.isLoading}
                    onPress={() => addTerritory({ number, kind: kindValue, city, street, beginNumber, endNumber, location, lastWorked: new Date(lastWorked), preacher: preacherValue, taken: new Date(taken), description, isPhysicalCard: physicalCard})} 
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

export default TerritoriesNewScreen;