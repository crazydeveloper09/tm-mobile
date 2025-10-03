import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import { NavigationProp } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import ButtonC from "../../components/Button";
import useLocaLization from "../../hooks/useLocalization";
import { mainTranslations } from "../../../localization";
import { preachersTranslations } from "./translations";

interface PreacherDeleteConfirmScreenProps {
    navigation: NavigationProp<any>;
    route: {
        params: {
            id: string;
            name: string
        }
    }
}

const PreacherDeleteConfirmScreen: React.FC<PreacherDeleteConfirmScreenProps> = ({ navigation, route }) => {
    const {state, deletePreacher} = useContext(PreachersContext);
    const mainTranslate = useLocaLization(mainTranslations);
    const preacherTranslate = useLocaLization(preachersTranslations)

    return (
        <View style={styles.container}>
            <FontAwesome name='exclamation-circle' size={75} color={'red'} />
            <Text style={styles.text}>{preacherTranslate.t("deleteConfirmText", { name: route.params?.name })}</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ width: '48%' }}>
                <ButtonC title={mainTranslate.t("yes")} onPress={() => deletePreacher(route.params.id)} isLoading={state.isLoading} color="#AD371F" />
                </View>
                <View style={{ width: '48%' }}>
                    <ButtonC title={mainTranslate.t("no")} onPress={() => navigation.navigate('PreachersList')} />
                </View>
            
            </View>
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