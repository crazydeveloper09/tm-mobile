import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Share, Alert, Platform, RefreshControl } from 'react-native';
import { Context as TerritoriesContext } from '../../contexts/TerritoriesContext';
import { Context as PreachersContext } from '../../contexts/PreachersContext';
import Loading from '../../components/Loading';
import { FontAwesome } from '@expo/vector-icons';
import { Badge, Dialog } from '@rneui/base';
import { changeColorForDates, countDaysFromNow } from '../../helpers/dates';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { Divider } from '@rneui/themed';
import { NavigationProp } from '@react-navigation/native';
import { ICheckout, ITerritory } from '../../contexts/interfaces';
import { groupBy } from '../../helpers/arrays';
import { ScrollView } from 'react-native-gesture-handler';
import TerritoryAssignment from '../../components/TerritoryAssignment';
import DescriptionAndValue from '../../components/common/DescriptionAndValue';

interface TerritoriesHistoryScreenProps {
    navigation: NavigationProp<any>
    route: {
        params: {
            id: string
        }
    }
}

const TerritoriesHistoryScreen: React.FC<TerritoriesHistoryScreenProps> = ({ navigation, route }) => {
    const {state, loadTerritoryHistory, makeTerritoryFreeAgain, assignTerritory} = useContext(TerritoriesContext);
    const preachersContext = useContext(PreachersContext)
    const [infoOpen, setInfoOpen] = useState(false);

    const toggleInfo = () => {
      setInfoOpen(!infoOpen);
    };

    const onShare = async (territory: ITerritory) => {
        console.log(territory)
        try {
          const result = await Share.share({
            message:
                `Witaj \n Bardzo proszę w najbliższym czasie o oddanie terenu nr ${territory.number} - ${territory.city}, ${territory?.street} ${territory?.beginNumber} ${territory.endNumber ? '- ' + territory?.endNumber: ''}`,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error: any) {
          Alert.alert(error.message);
        }
      };

      const [refreshing, setRefreshing] = React.useState(false);

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);


    useEffect(() => {
     
        loadTerritoryHistory(route.params.id);
        navigation.setOptions({
            headerRight: () => <View style={styles.headerRight}>
                <TouchableOpacity onPress={() => navigation.navigate('EditTerritory', { id: route.params.id })}>
                    <FontAwesome name='pencil' size={23} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate('DeleteConfirmTerritory', {id: route.params.id})}>
                    <FontAwesome name='trash' size={23} color={'white'} />
                </TouchableOpacity>
                
            </View>
        })
        const unsubscribe = navigation.addListener('focus', () => {
          loadTerritoryHistory(route.params.id)
        });

        
  
      return unsubscribe;
    }, [route.params.id, navigation, refreshing])

    if(state.isLoading){
        return <Loading />
    }

    if(state.errMessage){
      Alert.alert("Server error", state.errMessage)
  }

    let backgroundColor;
    let territoryKindText;
    switch(state.territory?.kind){
      case 'city':
          backgroundColor = '#f6edd9';
          territoryKindText = 'Teren miejski';
          break;
      case 'market':
          backgroundColor = 'white';
          territoryKindText = 'Teren handlowo-usługowy';
          break;
      case 'village':
          backgroundColor = '#e1f1ff'
          territoryKindText = 'Teren wiejski';
          break;
      default:
          break;
  }
  const serviceYears = groupBy<ICheckout>(state.territory?.history!, 'serviceYear')
    return (
      <ScrollView style={[styles.container, { backgroundColor }]} refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TerritoryHistory', {id: state.allTerritories[state!.currentIndex - 1]!._id!})
            }
            disabled={state.currentIndex! - 1 === -1}
          >
            <FontAwesome name="angle-left" size={35} />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Teren nr {state.territory?.number}</Text>
            <Text style={styles.territoryKind}>{territoryKindText}</Text>
          </View>
          

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TerritoryHistory', {id: state.allTerritories[state!.currentIndex + 1]!._id!})
            }
            disabled={state.currentIndex! + 1 >= state.allTerritories?.length!}
          >
            <FontAwesome name="angle-right" size={35} />
          </TouchableOpacity>
        </View>
        <DescriptionAndValue description='Miejscowość' value={state.territory?.city!} />
        
        <DescriptionAndValue description="Ulica" value={`${state.territory?.street} ${state.territory?.beginNumber ? state.territory.beginNumber : ''} ${state.territory?.endNumber ? '-' + state.territory.endNumber: ''} `} />
        {state.territory?.description && (
          <DescriptionAndValue description='Opis' value={state.territory?.description!} />
        )}
        {state.territory?.type === "free" && (
          <>
            <DescriptionAndValue description='Ostatnio opracowane' value={state.territory?.lastWorked!} />
            <Text style={styles.text}>
              <Text>Teren nie był opracowywany od </Text>
              <Text
                style={[
                  styles.textBold,
                  { color: changeColorForDates(state.territory?.lastWorked!) },
                ]}
              >
                {countDaysFromNow(state.territory?.lastWorked!)}
              </Text>
              <Text> dni</Text>
            </Text>
            <Badge
              value="Wolny"
              containerStyle={{ position: "absolute", top: 50, right: 5 }}
              badgeStyle={styles.freeBadge}
            />
          </>
        )}
        { !state.territory?.isPhysicalCard && <Text style={[styles.text, styles.textBold, { color: '#9999CC' }]}>
                    <Text>Teren nie ma karty fizycznej </Text>
                </Text> }
        {state.territory?.preacher && (
          <>
            <DescriptionAndValue description='Pobrany' value={state.territory?.taken!} />
            <DescriptionAndValue description='Głosiciel' value={state.territory?.preacher.name!} />
            <Text style={styles.text}>
              <Text>{state.territory?.preacher.name} ma ten teren </Text>
              <Text
                style={[
                  styles.textBold,
                  { color: changeColorForDates(state.territory?.taken!) },
                ]}
              >
                {countDaysFromNow(state.territory?.taken!)}
              </Text>
              <Text> dni</Text>
            </Text>
          </>
        )}
        {state.territory?.preacher &&
          countDaysFromNow(state.territory.taken) >= 120 && (
            <>
                <TouchableOpacity onPress={() => onShare(state.territory!)}>
                    <Text style={[styles.textBold, { color: '#dc3545' }]}>
                        Przypomnij o oddaniu terenu
                    </Text>
                </TouchableOpacity>
                <Badge
                value="Do oddania"
                status="error"
                containerStyle={{ position: "absolute", top: 65, right: 5 }}
                />
            </>
          )}
        {state.territory?.type === "free" &&
          countDaysFromNow(state.territory.lastWorked) >= 120 && (
            <Badge
              value="Do przydzielenia"
              status="error"
              containerStyle={{ position: "absolute", top: 75, right: 5 }}
            />
          )}
          <TerritoryAssignment territory={state.territory!} preachers={preachersContext.state.allPreachers} refresh={onRefresh} />
        {state.territory && <MapView
          provider={Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
          region={{
            latitude: state.territory?.latitude!,
            longitude: state.territory?.longitude!,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: state.territory?.latitude!,
              longitude: state.territory?.longitude!,
            }}
          />
        </MapView>}
        {state.territory?.history.length !== 0 && (
          <>
            <Divider />
            <Text style={styles.historyTitle}>Historia</Text>
            <FlatList 
              data={state.territory?.history && Object.keys(groupBy<ICheckout>(state.territory?.history!, 'serviceYear')).reverse()}
              scrollEnabled={false}
              renderItem={(serviceYear) => <View>
                  <Text style={styles.serviceYearTitle}>Rok służbowy {serviceYear.item}</Text>
                  <Divider color='black' />
                  <FlatList
                  data={serviceYears[serviceYear.item].reverse()}
                 
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <View style={{ marginTop: 15 }}>
                      { !item.passedBackDate || !item.takenDate ? <View style={{ flexDirection: "row", flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.recordDate}>
                        {new Date(item?.date).toLocaleDateString()}
                      </Text>
                      <TouchableOpacity onPress={toggleInfo}>
                        <FontAwesome name='info-circle' size={25} />
                      </TouchableOpacity>
                      
                      </View> :  <Text style={styles.recordDate}>
                        {new Date(item?.date).toLocaleDateString()}
                      </Text> }
            
                    

                      <Dialog
                        isVisible={infoOpen}
                        onBackdropPress={toggleInfo}
                      >
                        <Dialog.Title title="Ważna informacja !!" titleStyle={{ color: 'white' }} />
                        <Text style={{ color: 'white' }}>Niedawno zmieniłem strukturę rekodu historii. W związku z tym, jeśli chcesz, żeby poprawnie się wszystko wyświetlało zachęcam do edycji tego rekordu w aplikacji internetowej. Wszelkie szczegóły są tam podane.</Text>
                      </Dialog>
                      <DescriptionAndValue 
                        description='Data opracowania' 
                        value={new Date(item.passedBackDate)?.toLocaleDateString()} 
                      />
                      <DescriptionAndValue 
                        description='Data pobrania' 
                        value={new Date(item.takenDate)?.toLocaleDateString()} 
                      />
                      <DescriptionAndValue 
                        description='Głosiciel' 
                        value={item?.preacher?.name}
                      />
                      <Divider />
                    </View>
                  )}
                />
              </View>}

            />
            
          </>
        )}
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1
    },
    titleContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25
    },
    title: {
        fontFamily: 'MontserratSemiBold',
        fontSize: 20,
        textAlign: 'center',
    },
    territoryKind: {
      fontFamily: "MontserratRegular",
      textAlign: 'center',
    },
    historyTitle: {
        fontFamily: 'MontserratSemiBold',
        fontSize: 21,
        marginVertical: 20
    },
    serviceYearTitle: {
      fontFamily: 'MontserratSemiBold',
        fontSize: 19,
        marginVertical: 10
    },
    headerRight: {
        flexDirection: 'row',
        gap: 15,
        marginRight: 15
    },
    recordDate: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 17,
        marginBottom: 15
    },
    text: {
        fontFamily: 'InterRegular',
        fontSize: 16,
        marginBottom: 10
    },
    textBold: {
        fontFamily: 'InterSemiBold'
    },
    freeBadge: {
        backgroundColor: '#28a745'
    }, 
    map: {
        height: 200,
        width: '100%',
        marginVertical: 20
    }

})

export default TerritoriesHistoryScreen;