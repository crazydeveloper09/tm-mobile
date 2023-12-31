import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import { Context as MinistryGroupContext } from "../../contexts/MinistryGroupContext";
import { Input } from "@rneui/themed";
import DropDownPicker from "react-native-dropdown-picker";
import Loading from "../../components/Loading";
import ButtonC from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import territories from "../../api/territories";
import { IPreacher } from "../../contexts/interfaces";

interface MinistryGroupNewScreenProps {
    route: {
        params: {
            congregationID: string
        }
    }
}

const MinistryGroupNewScreen: React.FC<MinistryGroupNewScreenProps> = ({ route }) => {
    const ministryGroup = useContext(MinistryGroupContext);
    const preachers = useContext(PreachersContext);

    const [name, setName] = useState('')
    const [preachersValue, setPreachersValue] = useState([]);
    const [preachersOpen, setPreachersOpen] = useState(false);
    const [preachersItems, setPreachersItems] = useState([]);
    const [overseerOpen, setOverseerOpen] = useState(false);
    const [overseerValue, setOverseerValue] = useState(null);
    const [overseerItems, setOverseerItems] = useState([]);

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
            setPreachersItems(selectItems)
            setOverseerItems(selectItems)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        loadPreachers()
    }, [])

    if(preachers.state.isLoading){
        return <Loading />
    }

    

    return (
        <View style={styles.container}>
            <Input 
                label='Nazwa grupy'
                placeholder="Wpisz nazwę grupy"
                inputContainerStyle={styles.inputContainer}
                value={name}
                onChangeText={setName}
            />
            <DropDownPicker
                multiple={true}
                open={preachersOpen}
                value={preachersValue}
                items={preachersItems}
                setOpen={setPreachersOpen}
                setValue={setPreachersValue}
                searchable={true}
                containerStyle={{
                    marginVertical: 20
                }}
            />

            {!preachersOpen && <DropDownPicker
                open={overseerOpen}
                value={overseerValue}
                items={overseerItems}
                setOpen={setOverseerOpen}
                setValue={setOverseerValue}
                searchable={true}
            />}

            <ButtonC title="Dodaj grupę" onPress={() => ministryGroup.addMinistryGroup(route.params.congregationID, name, preachersValue, overseerValue)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
        padding: 15,
        flex: 1,
        justifyContent: 'center'
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

export default MinistryGroupNewScreen;