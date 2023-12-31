import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import { NavigationProp } from "@react-navigation/native";
import Loading from "../../components/Loading";
import { FontAwesome } from "@expo/vector-icons";
import ButtonC from "../../components/Button";

interface PreacherDeleteConfirmScreenProps {
    navigation: NavigationProp<any>;
    route: {
        params: {
            id: string
        }
    }
}

const PreacherDeleteConfirmScreen: React.FC<PreacherDeleteConfirmScreenProps> = ({ navigation, route }) => {
    const [preacherID, setPreacherID] = useState(route.params.id)
    const {state, loadPreacherInfo, deletePreacher} = useContext(PreachersContext)

    useEffect(() => {
        loadPreacherInfo(preacherID)
    }, [preacherID])

    if(state.isLoading) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <FontAwesome name='exclamation-circle' size={75} color={'red'} />
            <Text style={styles.text}>Czy na pewno chcesz usunąć głosiciela {state.preacher?.name}?</Text>
            <ButtonC title="Tak" onPress={() => deletePreacher(preacherID)} />
            <ButtonC title="Nie" onPress={() => navigation.navigate('PreachersList')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    text: {
        fontSize: 25,
        fontFamily: 'PoppinsSemiBold',
        textAlign: "center"
    }
})

export default PreacherDeleteConfirmScreen;