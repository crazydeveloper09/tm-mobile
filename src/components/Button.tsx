import React from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { Button  } from "@rneui/themed";

interface ButtonProps {
    title: string;
    onPress: () => void
}

const ButtonC: React.FC<ButtonProps> = ({ title, onPress }) => {
    return <Button 
            title={title}
            buttonStyle={styles.button}
            onPress={onPress}
        />
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#28a745'
    }
})

export default ButtonC;

