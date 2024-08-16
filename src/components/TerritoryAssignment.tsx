import React, { useContext, useEffect, useState } from "react";
import { IPreacher, ITerritory } from "../contexts/interfaces";
import { Context as TerritoriesContext } from "../contexts/TerritoriesContext";
import { Context as SettingsContext } from "../contexts/SettingsContext";
import { ListItem, Switch } from "@rneui/base";
import ButtonC from "./Button";
import DropDownPicker from "react-native-dropdown-picker";
import Label from "./Label";
import ChooseDate from "./ChooseDate";
import { defaultStyles } from "../screens/defaultStyles";
import { View } from "react-native";

interface TerritoryAssignmentProps {
    territory: ITerritory;
    preachers?: IPreacher[];
    refresh?: Function; 
}

const TerritoryAssignment:React.FC<TerritoryAssignmentProps> = ({ territory, preachers, refresh }) => {

    const [expanded, setExpanded] = useState(false);
    const [isChosenDate, setIsChosenDate] = useState(false);
    const [lastWorkedOpen, setLastWorkedOpen] = useState(false)
      const [lastWorked, setLastWorked] = useState(new Date(territory?.lastWorked || Date.now()))
      const [takenOpen, setTakenOpen] = useState(false)
      const [taken, setTaken] = useState(new Date(territory?.taken || Date.now()))
    const [preacherValue, setPreacherValue] = useState("");
      const [preacherOpen, setPreacherOpen] = useState(false);
      const [preacherItems, setPreacherItems] = useState([]);
      const { state, assignTerritory, makeTerritoryFreeAgain } = useContext(TerritoriesContext)
      const settings = useContext(SettingsContext)

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

              <ChooseDate 
                date={lastWorked}
                dateOpen={lastWorkedOpen}
                label="Ostatnio opracowane"
                setDate={setLastWorked}
                setDateOpen={setLastWorkedOpen}
              />
              <View style={{ marginTop: 15 }}>
                <ButtonC 
                  title="Zdaj teren" 
                  isLoading={state.isLoading} 
                  onPress={() => {
                    makeTerritoryFreeAgain(territory._id, lastWorked)
                    refresh && refresh()
                  }} 
                />
              </View>
          
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
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                modalTitle={`Przydzielenie głosiciela do terenu nr ${territory?.number}`}
                modalTitleStyle={{ color: 'black' }}
                containerStyle={{
                    position: 'relative',
                    marginVertical: 15,
                    width: '100%'
                }}
            />

            <Label text="Własna data przydzielenia" />

            <Switch 
                value={isChosenDate}
                onValueChange={(value) => setIsChosenDate(value)}
                style={{ alignSelf: 'flex-start',  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}

                color={settings.state.mainColor}
            />

            {isChosenDate && <>
              <ChooseDate 
                date={taken}
                dateOpen={takenOpen}
                label="Pobrany"
                setDate={setTaken}
                setDateOpen={setTakenOpen}
              />
              
            </>}
            {preacherValue !== "" && <ButtonC 
                                          title="Przydziel teren" 
                                          isLoading={state.isLoading} 
                                          onPress={() => {
                                            assignTerritory(territory._id, preacherValue, taken, isChosenDate);
                                            refresh && refresh()
                                            }} 
                                      />}
        </ListItem.Accordion>
      )
}

export default TerritoryAssignment;