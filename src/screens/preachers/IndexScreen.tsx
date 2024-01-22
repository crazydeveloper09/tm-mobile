import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Context as PreachersContext } from '../../contexts/PreachersContext';
import Preacher from '../../components/Preacher';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import { columnsNum } from '../../helpers/devices';

interface PreachersIndexScreenProps {
    navigation: NavigationProp<any>
}

const PreachersIndexScreen: React.FC<PreachersIndexScreenProps> = ({ navigation }) => {

    const { state, loadPreachers } = useContext(PreachersContext);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <View style={styles.headerRight}>
                <TouchableOpacity onPress={() => navigation.navigate('AddPreacher')}>
                    <FontAwesome name='plus' size={23} color={'white'} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SearchPreacher')}>
                    <FontAwesome name='search' size={23} color={'white'} />
                </TouchableOpacity>
                
            </View>
        })
        loadPreachers(page, limit);
        const unsubscribe = navigation.addListener('focus', () => {
            loadPreachers(page, limit);
        });
    
        return unsubscribe;
    }, [navigation, page, limit])

    if(state.isLoading){
        return <Loading />
    }

    console.log(state.preachers?.totalPages!)
    return (
        <ScrollView style={styles.container}>
            <FlatList 
                keyExtractor={((preacher) => preacher._id)}
                data={state.preachers?.docs}
                renderItem={({ item }) => <Preacher preacher={item} />}
                scrollEnabled={false}
                numColumns={columnsNum}
            />
            <Pagination activePage={state.preachers?.page!} totalPages={state.preachers?.totalPages!} updateState={setPage}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { padding: 15, backgroundColor: '#ece9e9' },
    headerRight: {
        flexDirection: 'row',
        gap: 15,
        marginRight: 15
    }
})

export default PreachersIndexScreen;