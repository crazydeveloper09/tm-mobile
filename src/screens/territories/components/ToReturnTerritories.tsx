import { ListItem } from "@rneui/base";
import React, { useState } from "react";
import { Alert, Share, StyleSheet, Text } from "react-native";
import { IPreacher, ITerritory } from "../../../contexts/interfaces";
import Territory from "../../../components/Territory";
import IconLink from "../../../components/IconLink";

interface ToReturnTerritoriesProps {
  item: string;
  grouped: {
    [key: string]: any[];
  };
  preachers: IPreacher[];
}

const ToReturnTerritories: React.FC<ToReturnTerritoriesProps> = ({
  item,
  grouped,
  preachers,
}) => {
  const [expanded, setExpanded] = useState(false);
  const onShare = async (territories: ITerritory[]) => {
          console.log(territories.length)
          const territoriesMap = territories.map((territory) => `• Teren nr ${territory.number} - ${territory.city}, ${territory?.street} ${territory?.beginNumber ? territory?.beginNumber : ''} ${territory.endNumber ? '- ' + territory?.endNumber: ''} \n`);
          try {
            const result = await Share.share({
              message: `Witaj, \n Te tereny są u Ciebie już ponad 4 miesiące: \n ${territoriesMap} Daj znać proszę jak sytuacja. Jeśli masz problem z opracowaniem któregoś z nich, chętnie pomogę🤗`,
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
  return (
    <ListItem.Accordion
    containerStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.0)',
                paddingHorizontal: 0
            }}
      content={
        <>
          <ListItem.Content>
            <Text style={styles.preacherName}>{item}</Text>
          </ListItem.Content>
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
      bottomDivider
    >
        <>
            <IconLink
              iconName="information-outline"
              description="Przypomnij o oddaniu terenów"
              onPress={() => onShare(grouped[item])}
              isCentered
            />
            {grouped[item].map((t) => (
        <ListItem key={t._id} containerStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.0)',
                    paddingHorizontal: 0
                }}>
          <Territory territory={t} preachers={preachers} />
        </ListItem>
      ))}
        </>

    </ListItem.Accordion>
  );
};

const styles = StyleSheet.create({
  preacherName: {
    fontSize: 21,
    fontFamily: "MontserratSemiBold",
    marginVertical: 20,
  },
});

export default ToReturnTerritories;
