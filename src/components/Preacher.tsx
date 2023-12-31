import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { IPreacher } from "../contexts/interfaces";
import { FontAwesome } from "@expo/vector-icons";
import { CommonActions, useNavigation } from "@react-navigation/native";

interface PreacherProps {
    preacher: IPreacher;
}

const Preacher: React.FC<PreacherProps> = ({ preacher }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{preacher.name}</Text>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('EditPreacher', {id: preacher._id, preacherName: preacher.name} as unknown as never)}>
                        <FontAwesome name='pencil' color={'#9999cc'} size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('DeleteConfirmPreacher', {id: preacher._id} as unknown as never)}>
                        <FontAwesome name='trash' color={'#9999cc'} size={22} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('PreacherTerritories', {preacherID: preacher._id})}>
                <Text style={styles.link}>Zobacz tereny głosiciela</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
        marginTop: 15,
        borderColor: '#9999cc',
        borderWidth: 1,
        borderRadius: 10
    },
    titleContainer: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 10
    },
    title: {
        fontFamily: 'MontserratSemiBold',
        fontSize: 19
    },
    link: {
        color: '#28a745',
        letterSpacing: 1.6,
        fontSize: 17,
        fontFamily: 'MontserratRegular'
    }
})

export default Preacher;