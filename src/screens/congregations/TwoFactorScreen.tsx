import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { Context as AuthContext } from '../../contexts/AuthContext';

const CongregationsTwoFactorScreen: React.FC = () => {
    const [code, setCode] = useState<string>();
    const { state, verifyUser } = useContext(AuthContext)
    return (
        <View style={styles.container}>
            <Text h3 style={styles.header}>Dwustopniowa weryfikacja w Territory Manager</Text>
            { state.errMessage && <Text style={styles.errMessage}>{state.errMessage}</Text> }
            { state.successMessage && <Text style={styles.successMessage}>{state.successMessage}</Text> }
            <Input 
                label='Kod dostępu'
                placeholder='Wpisz kod dostępu'
                value={code}
                onChangeText={setCode}
                inputContainerStyle={styles.inputContainer}
            />
            <Button 
                title={'Zweryfikuj konto'}
                buttonStyle={styles.button}
                onPress={() => verifyUser({ code, userID: state.userID })}
            />
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
    header: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#28a745',
        fontFamily: 'MontserratSemiBold'
    },
    inputContainer: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 6,
        padding: 5,
        borderColor: '#28a745',
        color: '#28a745'
    },
    button: {
        backgroundColor: '#28a745'
    },
    errMessage: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    },
    successMessage: {
        color: 'green',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    }
})

export default CongregationsTwoFactorScreen;