import React from "react";
import { IActivity } from "../contexts/interfaces";
import { StyleSheet, Text, View } from "react-native";
import { isTablet } from "../helpers/devices";

interface ActivityProps {
    activity: IActivity
}

const Activity: React.FC<ActivityProps> = ({ activity }) => {
    
    return (
        <View style={[styles.container, { backgroundColor: '#f6edd9' }]}>
            
            <Text style={styles.text}>
                <Text>Data i czas: </Text>
                <Text style={styles.textBold}>{new Date(activity.date).toLocaleString()}</Text>
            </Text>
            <Text style={styles.text}>
                <Text>Platforma: </Text>
                <Text style={styles.textBold}>{activity?.platform}</Text>
            </Text>
            <Text style={styles.text}>
                <Text>Informacje o użytkowniku: </Text>
                <Text style={styles.textBold}>{activity?.userAgent}</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        height: 'auto',
        width: isTablet ? '49%' : 'auto',
        marginRight: isTablet ? 15 : 0
    },
    text: {
        fontFamily: 'InterRegular',
        fontSize: 16,
        marginBottom: 10
    },
    textBold: {
        fontFamily: 'InterSemiBold'
    },
    
})

export default Activity;