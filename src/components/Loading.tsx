import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loading: React.FC = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} color={'#28a745'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
        flex: 1,
        justifyContent: 'center'
    }
})

export default Loading;