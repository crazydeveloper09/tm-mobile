import { NavigationProp } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, StyleSheet} from 'react-native';
import { Context as PreachersContext } from '../../contexts/PreachersContext';
import ButtonC from '../../components/Button';
import MyInput from '../../components/MyInput';

interface PreachersEditScreenProps {
    navigation: NavigationProp<any>;
    route: {
        params: {
            id: string;
            preacherName: string;
        }
    }
}

const PreachersEditScreen: React.FC<PreachersEditScreenProps> = ({ navigation, route }) => {
    const { id, preacherName } = route.params;
    const { editPreacher, state } = useContext(PreachersContext)
    const [name, setName] = useState(preacherName)

    return (
        <View style={styles.container}>
            <MyInput 
                label="Edytuj imię i nazwisko głosiciela"
                placeholder='Wpisz imię i nazwisko'
                value={name}
                onChangeText={setName}
            />
            <ButtonC title="Edytuj głosiciela" onPress={() => editPreacher(name, id)} isLoading={state.isLoading} />
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
})

export default PreachersEditScreen;