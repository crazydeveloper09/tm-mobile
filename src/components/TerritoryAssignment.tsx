import React, { useContext, useEffect, useState } from "react";
import { IPreacher, ITerritory } from "../contexts/interfaces";
import { Context as TerritoriesContext } from "../contexts/TerritoriesContext";
import { ListItem } from "@rneui/base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text } from "react-native";
import ButtonC from "./Button";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface TerritoryAssignmentProps {
    territory: ITerritory;
    preachers?: IPreacher[];
    refresh?: Function; 
}

const TerritoryAssignment:React.FC<TerritoryAssignmentProps> = ({ territory, preachers, refresh }) => {

    const [expanded, setExpanded] = useState(false);
    const [lastWorkedOpen, setLastWorkedOpen] = useState(false)
      const [lastWorked, setLastWorked] = useState(new Date(territory?.lastWorked || Date.now()))
    const [preacherValue, setPreacherValue] = useState("");
      const [preacherOpen, setPreacherOpen] = useState(false);
      const [preacherItems, setPreacherItems] = useState([]);
      const { state, assignTerritory, makeTerritoryFreeAgain } = useContext(TerritoriesContext)

      useEffect(() => {
        const selectItems = preachers?.map((preacher) => {
            return { label: preacher.name, value: preacher._id } as never
        })
        setPreacherItems(selectItems!)
      }, [])
 
    return territory?.preacher ? (
        <ListItem.Accordion
        containerStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.0)'
        }}
          content={
            <>
              
              <ListItem.Content>
                <ListItem.Title>Zdaj teren</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >

            <TouchableOpacity onPress={() => setLastWorkedOpen(true)} style={{...styles.inputContainer, padding: 15, marginVertical: 15}}>
                <Text>
                    Ostatnio opracowane - aktualna data: {lastWorked.toLocaleDateString()}
                </Text> 
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={lastWorkedOpen}
                 date={lastWorked} 
                 onConfirm={(date) => {
                     setLastWorked(date)
                     setLastWorkedOpen(false)
                     }
                 } 
                 onCancel={() => setLastWorkedOpen(false)}
                 isDarkModeEnabled={false}
                display='inline'
                locale='pl'

            />
            <ButtonC 
              title="Zdaj teren" 
              isLoading={state.isLoading} 
              onPress={() => {
                makeTerritoryFreeAgain(territory._id, lastWorked)
                refresh && refresh()
              }} 
            />
        </ListItem.Accordion>
      ) : (
        <ListItem.Accordion
        containerStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.0)'
        }}
          content={
            <>
              
              <ListItem.Content>
                <ListItem.Title>Przydziel teren</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
            <DropDownPicker
                placeholder="Wybierz głosiciela"
                open={preacherOpen}
                value={preacherValue}
                items={preacherItems}
                setOpen={setPreacherOpen}
                setValue={setPreacherValue}
                searchable={true}
                listMode="MODAL"
                modalTitle={`Przydzielenie głosiciela do terenu nr ${territory?.number}`}
                modalTitleStyle={{ color: 'black' }}
                containerStyle={{
                    position: 'relative',
                    marginVertical: 15,
                    width: '100%'
                }}
            />
            {preacherValue !== "" && <ButtonC 
                                          title="Przydziel teren" 
                                          isLoading={state.isLoading} 
                                          onPress={() => {
                                            assignTerritory(territory._id, preacherValue);
                                            refresh && refresh()
                                            }} 
                                      />}
        </ListItem.Accordion>
      )
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 6,
        padding: 5,
        borderColor: 'black',
    },
})

export default TerritoryAssignment;