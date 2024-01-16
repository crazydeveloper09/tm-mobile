import { Input } from '@rneui/themed';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonC from '../../components/Button';
import { Context as PreachersContext } from '../../contexts/PreachersContext';

const PreachersNewScreen: React.FC = () => {
    const [name, setName] = useState('');
    const {addPreacher, state} = useContext(PreachersContext)

    return (
        <View style={styles.container}>
            <Input 
                label="Imię i nazwisko głosiciela"
                placeholder='Wpisz imię i nazwisko'
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.labelStyle}
                containerStyle={styles.containerInput}
                value={name}
                onChangeText={setName}
            />
            <ButtonC title="Dodaj głosiciela" isLoading={state.isLoading} onPress={() => addPreacher(name)} />
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

export default PreachersNewScreen;