import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context as AuthContext } from "../../contexts/AuthContext";
import Loading from "../../components/Loading";
import { Input } from "@rneui/themed";
import ButtonC from "../../components/Button";

const CongregationEditScreen: React.FC = () => {
    const { editCongregation, state, loadCongregationInfo } = useContext(AuthContext);
    const [username, setUsername] = useState('')
    const [ministryOverseerEmail, setMinistryOverseerEmail] = useState('')
    const [territoryServantEmail, setTerritoryServantEmail] = useState('')
    const [mainCity, setMainCity] = useState('')

    useEffect(() => {
        loadCongregationInfo();
        setUsername(state.congregation?.username!)
        setTerritoryServantEmail(state.congregation?.territoryServantEmail!)
        setMinistryOverseerEmail(state.congregation?.ministryOverseerEmail!)
        setMainCity(state.congregation?.mainCity!)
    }, [])

    if(state.isLoading) {
        return <Loading />
    }
    return (
        <View style={styles.container}>
            <Input 
                label="Edytuj nazwę zboru"
                placeholder='Wpisz nazwę zboru'
                inputContainerStyle={styles.inputContainer}
                value={username}
                onChangeText={setUsername}
            />

            <Input 
                label="Edytuj mail sługi terenu"
                placeholder='Wpisz mail sługi terenu'
                inputContainerStyle={styles.inputContainer}
                value={territoryServantEmail}
                onChangeText={setTerritoryServantEmail}
            />
            <Input 
                label="Edytuj mail nadzorcy służby"
                placeholder='Wpisz mail nadzorcy służby'
                inputContainerStyle={styles.inputContainer}
                value={ministryOverseerEmail}
                onChangeText={setMinistryOverseerEmail}
            />
            <Input 
                label="Edytuj główne miasto zboru"
                placeholder='Wpisz główne miasto zboru'
                inputContainerStyle={styles.inputContainer}
                value={mainCity}
                onChangeText={setMainCity}
            />

            <ButtonC title='Edytuj zbór' onPress={() => editCongregation(username, territoryServantEmail, ministryOverseerEmail, mainCity, state.congregation?._id)} />
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
    },
})

export default CongregationEditScreen;