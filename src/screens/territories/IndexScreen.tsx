import { FontAwesome } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TerritoriesIndexScreenProps {
    navigation: NavigationProp<any>
}


const TerritoriesIndexScreen: React.FC<TerritoriesIndexScreenProps> = ({ navigation }) => {

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <View style={styles.headerRight}>
                <FontAwesome name='plus' size={20} color={'white'} />
                <FontAwesome name='search' size={20} color={'white'} />
            </View>
        })
    }, [])
    

    return (
        <View>
            <Text>Ekran wyświetlający listę terenów</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerRight: {
        flexDirection: 'row',
        gap: 10,
        marginRight: 10
    }
})

export default TerritoriesIndexScreen;