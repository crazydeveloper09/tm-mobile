import { Input } from '@rneui/themed';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonC from '../../components/Button';
import { Context as PreachersContext } from '../../contexts/PreachersContext';

const PreachersNewScreen: React.FC = () => {
    const [name, setName] = useState('');
    const {addPreacher} = useContext(PreachersContext)

    return (
        <View style={styles.container}>
            <Input 
                label="Imię i nazwisko głosiciela"
                placeholder='Wpisz imię i nazwisko'
                inputContainerStyle={styles.inputContainer}
                value={name}
                onChangeText={setName}
            />
            <ButtonC title="Dodaj głosiciela" onPress={() => addPreacher(name)} />
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

export default PreachersNewScreen;