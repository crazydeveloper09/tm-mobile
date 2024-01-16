import React, { useContext, useEffect } from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { Button  } from "@rneui/themed";
import { Context as SettingsContext } from "../contexts/SettingsContext";

interface ButtonProps {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
}

const ButtonC: React.FC<ButtonProps> = ({ title, onPress, isLoading }) => {

    const {state, loadColor} = useContext(SettingsContext);
    useEffect(() => {
      loadColor()
    }, [state.mainColor])

    return <Button 
            title={title}
            buttonStyle={{ backgroundColor: state.mainColor }}
            onPress={onPress}
            loading={isLoading}
        />
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#28a745'
    }
})

export default ButtonC;

