import React, { useContext, useEffect } from "react";
import { GestureResponderEvent, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { Context as SettingsContext } from "../contexts/SettingsContext";

interface ButtonProps {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
    color?: string;
}

const ButtonC: React.FC<ButtonProps> = ({ title, onPress, isLoading, color }) => {

    const {state, loadColor} = useContext(SettingsContext);
    useEffect(() => {
      loadColor()
    }, [state.mainColor])

    return <Button 
            mode="contained"
            buttonColor={color || state.mainColor}
            labelStyle={{ fontSize: 18 }}
            style={styles.button}
            onPress={onPress}
            loading={isLoading}
        ><Text>{title}</Text></Button>
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        paddingVertical: 4,
    }
})

export default ButtonC;

