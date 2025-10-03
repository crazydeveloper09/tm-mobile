import { Input } from '@rneui/themed';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import ButtonC from '../../components/Button';
import { Context as PreachersContext } from '../../contexts/PreachersContext';
import MyInput from '../../components/MyInput';
import useLocaLization from '../../hooks/useLocalization';
import { preachersTranslations } from './translations';

const PreachersNewScreen: React.FC = () => {
    const [name, setName] = useState('');
    const {addPreacher, state, clearError} = useContext(PreachersContext);
    const preacherTranslate = useLocaLization(preachersTranslations)

    
    if(state.errMessage){
        Alert.alert("Server error", state.errMessage, [{ text: "OK", onPress: () => clearError() }])
    }

    return (
        <View style={styles.container}>
            <MyInput 
                label={preacherTranslate.t("nameLabel")}
                placeholder={preacherTranslate.t("namePlaceholder")}
                value={name}
                onChangeText={setName}
            />
            <ButtonC title={preacherTranslate.t("addButtonText")} isLoading={state.isLoading} onPress={() => addPreacher(name)} />
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