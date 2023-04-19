import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { backgroundColor2, primaryColor, themecol } from "../Styles/Theme1";
const BottomNav = ({ activepage, navigation }) => {
  return (
    <View style={styles.container}>
      {activepage == "allmusic" ? (
        <Entypo
          name="folder-music"
          size={50}
          color="black"
          style={styles.iconactive}
        />
      ) : (
        <Entypo
          name="folder-music"
          size={50}
          color="black"
          style={styles.icon}
          onPress={() => navigation.navigate("Allmusic")}
        />
      )}
      {activepage == "player" ? (
        <MaterialCommunityIcons
          name="headphones"
          size={50}
          color={primaryColor}
          style={styles.iconactive}
        />
      ) : (
        <MaterialCommunityIcons
          name="headphones"
          size={50}
          color={primaryColor}
          style={styles.icon}
          onPress={() => navigation.navigate("Player")}
        />
      )}
      {activepage == "allplaylists" ? (
        <MaterialCommunityIcons
          name="playlist-music"
          size={50}
          color={primaryColor}
          style={styles.iconactive}
        />
      ) : (
        <MaterialCommunityIcons
          name="playlist-music"
          size={50}
          color={primaryColor}
          style={styles.icon}
          onPress={() => navigation.navigate("Allplaylists")}
        />
      )}
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    backgroundColor: "#4C4C4C",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  icon: {
    color: primaryColor,
    marginHorizontal: 100,
  },
  iconactive: {
    color: primaryColor,
    backgroundColor: themecol,
    borderRadius: 50,
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: "40%",
  },
});
