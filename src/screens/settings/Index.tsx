import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { Context as AuthContext } from "../../contexts/AuthContext";
import packageJson from "../../../package.json";
import useLocaLization from "../../hooks/useLocalization";
import { mainTranslations } from "../../../localization";
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import { Slider } from "@rneui/base";
import { ScrollView } from "react-native";
import SectionTitle from "./components/SectionTitle";
import SectionLink from "./components/SectionLink";
import SectionButton from "./components/SectionButton";
import { settingsTranslations } from "./translations";


const SettingsScreen: React.FC = () => {
  const auth = useContext(AuthContext);
  const mainTranslate = useLocaLization(mainTranslations);
  const settingsTranslate = useLocaLization(settingsTranslations);
  const { state, changeMainColor, loadColor, incrementFont, changeFormat } =
    useContext(SettingsContext);
  const [fontIncrement, setFontIncrement] = useState<number>(
    state.fontIncrement || 0
  );


  useEffect(() => {
    loadColor();
  }, []);

  const availableColors = ['#28a745', '#0078E0', '#707070', '#4B4B95','#A6037A','#8A038C','#0378A6','#F25050','#688C4F','#733D38','#00565B','#A6634B']

  const styles = StyleSheet.create({
    container: {
      padding: 15,
    },
    title: {
      fontSize: 20 + fontIncrement,
      fontFamily: "MontserratRegular",
    },
    section: {
      paddingVertical: 10,
    },
    color: {
      width: "48%",
      height: 100,
      marginRight: 10,
      borderRadius: 10,
    },
    versionText: {
      fontSize: 13 + fontIncrement,
      textAlign: "center",
      fontFamily: "MontserratRegular",
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ justifyContent: "center", paddingBottom: 40 }}
    >

      <SectionTitle
        iconName="palette-outline"
        value={settingsTranslate.t("customizeSectionLabel")}
      />
      <View style={styles.section}>
        <Text style={styles.title}>{settingsTranslate.t("chooseColor")}</Text>
        <FlatList
          data={availableColors}
          keyExtractor={(color, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => changeMainColor(item)}
              style={[
                styles.color,
                { backgroundColor: item },
                state?.mainColor === item && {
                  borderWidth: 3,
                  borderColor: "black",
                },
              ]}
            ></TouchableOpacity>
          )}
          scrollEnabled={false}
          numColumns={2}
          contentContainerStyle={{ gap: 15, marginTop: 15, paddingBottom: 25 }}
        />
        <Text style={styles.title}>{settingsTranslate.t("fontIncreaseLabel")}</Text>
        <View style={{ marginVertical: 20 }}>
          <Slider
            value={fontIncrement}
            onValueChange={(value) => setFontIncrement(value)}
            onSlidingComplete={() => incrementFont(fontIncrement)}
            step={1}
            maximumValue={10}
            thumbTouchSize={{ width: 25, height: 25 }}
            thumbTintColor={state.mainColor}
          />
        </View>
        
      </View>
      <SectionTitle
        iconName="handshake-outline"
        value={settingsTranslate.t("contributionLabel")}
      />
      <View style={[styles.section, { marginBottom: 20 }]}>
        <SectionLink
          screen={`Translate`}
          iconName="google-translate"
          description={settingsTranslate.t("translateLabel")}
        />
        <SectionLink
          screen={`Suggestion`}
          iconName="message-reply-text-outline"
          description={settingsTranslate.t("feedbackLabel")}
        />
        <SectionLink
          screen={`Error`}
          iconName="bug"
          description={settingsTranslate.t("issueLabel")}
        />
      </View>

      <SectionTitle
        iconName="file-document-outline"
        value={settingsTranslate.t("lawLabel")}
      />
      <View style={styles.section}>
        <SectionLink
          screen={`Policy_${mainTranslate.locale}`}
          iconName="file-document"
          description={settingsTranslate.t("policyLabel")}
        />
      </View>
      <SectionButton
        iconName="power"
        description={settingsTranslate.t("logOutLabel")}
        onPress={() => auth.signOut()}
      />
      <View style={{ paddingTop: 15 }}>
        <Text style={styles.versionText}>
          {settingsTranslate.t("copyrightLabel")}
        </Text>
        <Text style={styles.versionText}>
          {settingsTranslate.t("versionLabel")} {packageJson.version}
        </Text>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
