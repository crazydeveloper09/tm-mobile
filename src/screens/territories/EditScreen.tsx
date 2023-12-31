import { CheckBox, Input } from '@rneui/base';
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
    const [territoryID, setTerritoryID] = useState(route.params.id);
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
    const {editTerritory, loadTerritoryHistory, state} = useContext(TerritoriesContext);

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

    const loadTerritory = async (id: string) => {
        const token = await AsyncStorage.getItem('token')
        territories.get<{territory: ITerritory}>(`/territories/${id}`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        .then((response) => {
            setNumber(response.data.territory.number!.toString()!)
            setEndNumber(response.data.territory.endNumber?.toString()!)
            setBeginNumber(response.data.territory.beginNumber?.toString()!)
            setCity(response.data.territory.city!)
            setStreet(response.data.territory.street!);
            setKindValue(response.data.territory.kind!);
            setLocation(response.data.territory.location!);
            setLastWorked(new Date(response.data.territory.lastWorked!));
            setPreacherValue(response.data.territory.preacher?.name ? response.data.territory.preacher.name : '');
            setTaken(new Date(response.data.territory.taken!))
            setDescription(response.data.territory.description!)
            if(response.data.territory.isPhysicalCard){
                setPhysicalCard(true)
            } else {
                setNoPhysicalCard(true)
            }
        })
        .catch((err) => console.log(err))
    }
    useEffect(() => {
        loadPreachers()
        loadTerritory(territoryID);
    }, [territoryID])


    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center'}}>
            <Input 
                label='Numer terenu'
                placeholder='Wpisz nr terenu'
                keyboardType='numeric'
                value={number}
                onChangeText={setNumber}
                inputContainerStyle={styles.inputContainer}
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
                value={city}
                onChangeText={setCity}
            />

            <Input 
                label='Ulica'
                placeholder='Wpisz ulicę'
                inputContainerStyle={styles.inputContainer}
                value={street}
                onChangeText={setStreet}
            />

            {kindValue === 'city' && <>
                <Input 
                    label='Numer początkowy'
                    placeholder='Wpisz nr początkowy'
                    keyboardType='numeric'
                    inputContainerStyle={styles.inputContainer}
                    value={beginNumber}
                    onChangeText={setBeginNumber}
                />
                <Input 
                    label='Numer końcowy'
                    placeholder='Wpisz nr końcowy'
                    keyboardType='numeric'
                    inputContainerStyle={styles.inputContainer}
                    value={endNumber}
                    onChangeText={setEndNumber}
                />
            </>}

            <Input 
                label='Pełna lokalizacja'
                placeholder='Wpisz lokalizację'
                inputContainerStyle={styles.inputContainer}
                value={location}
                onChangeText={setLocation}
            />


            <TouchableOpacity onPress={() => setLastWorkedOpen(true)} style={styles.inputContainer}>
                <Text>
                    Ostatnio opracowane - aktualna data: {lastWorked.toLocaleDateString()}
                </Text> 
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={lastWorkedOpen}
                 date={lastWorked} 
                 onConfirm={(date) => {
                     setLastWorked(date)
                     setLastWorkedOpen(false)
                     }
                 } 
                 onCancel={() => setLastWorkedOpen(false)}
                 isDarkModeEnabled={false}
                display='inline'
                locale='pl'

            />

            <DropDownPicker
                open={preacherOpen}
                value={preacherValue}
                items={preacherItems}
                setOpen={setPreacherOpen}
                setValue={setPreacherValue}
                searchable={true}
                flatListProps={{ scrollEnabled: false }}
                containerStyle={{
                    marginVertical: 15,
                    width: '100%'
                }}
            />

            <TouchableOpacity onPress={() => setTakenOpen(true)} style={styles.inputContainer}>
                <Text>
                 Pobrany - aktualna data: {taken.toLocaleDateString()} 
                </Text>
            </TouchableOpacity>
            <DateTimePickerModal 
                isVisible={takenOpen}
                mode='date'
                date={taken} 
                onConfirm={(date) => {
                    setTaken(date)
                    setTakenOpen(false)
                    }
                } 
                onCancel={() => setTakenOpen(false)}
                isDarkModeEnabled={false}
                display='inline'
                pickerStyleIOS={{
                    borderColor: 'black'
                }}
                locale='pl'
            />

            <Input
                label='Opis'
                placeholder='Wpisz opis'
                inputContainerStyle={styles.inputContainer}
                multiline={true}
                numberOfLines={5}
                value={description}
                onChangeText={setDescription}
            />
            <Text>
                Czy jest fizyczna karta terenu?
            </Text>
            <CheckBox
                checked={physicalCard}
                onPress={() => setPhysicalCard(!physicalCard)}
                title={'Tak'}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#28a745"
            />

            <CheckBox
                checked={noPhysicalCard}
                onPress={() => setNoPhysicalCard(!noPhysicalCard)}
                title={'Nie'}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#28a745"
            />

            <ButtonC 
                title='Edytuj teren' 
                onPress={() => editTerritory(territoryID, { number, kind: kindValue, city, street, beginNumber, endNumber, location, lastWorked: new Date(lastWorked), preacher: preacherValue, taken: new Date(taken), description, isPhysicalCard: physicalCard})} 
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
        borderColor: '#28a745',
        color: '#28a745'
    },
})

export default TerritoriesEditScreen;