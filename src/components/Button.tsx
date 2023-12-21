import React from "react";
import { StyleSheet } from "react-native";
import { Button  } from "@rneui/themed";

interface ButtonProps {
    title: string;
}

const ButtonC: React.FC<ButtonProps> = ({ title }) => {
    return <Button 
            title={title}
            buttonStyle={styles.button}
        />
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#28a745'
    }
})

export default ButtonC;

