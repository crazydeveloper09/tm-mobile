import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet} from 'react-native';
import { Context as PreachersContext } from '../../contexts/PreachersContext';
import ButtonC from '../../components/Button';
import { Input } from '@rneui/themed';
import Loading from '../../components/Loading';

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
    const { state, loadPreacherInfo, editPreacher} = useContext(PreachersContext)
    const [name, setName] = useState(preacherName)

    useEffect(() => {
        loadPreacherInfo(id)
    }, [id])

    if(state.isLoading){
        return <Loading />
    }


    return (
        <View style={styles.container}>
            <Input 
                label="Edytuj imię i nazwisko głosiciela"
                placeholder='Wpisz imię i nazwisko'
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.labelStyle}
                containerStyle={styles.containerInput}
                value={name}
                onChangeText={setName}
            />
            <ButtonC title="Edytuj głosiciela" onPress={() => editPreacher(name, id)} />
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

export default PreachersEditScreen;