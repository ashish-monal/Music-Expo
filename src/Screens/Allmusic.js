import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
// imported Bottom Navigation
import BottomNav from "../Components/BottomNav";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";
import {
  setActiveSong_global,
  setAllSongs,
  setIsPlaying_global,
} from "../redux/actions";
import {
  backgroundColor1,
  backgroundColor2,
  primaryColor,
} from "../Styles/Theme1";
import { musicimg } from "../../assets/musicimg1.png";

const Allmusic = ({ navigation }) => {
  const mysongs = useSelector((state) => state.allsongs);

  const permissionPopUp = async () => {
    Alert.alert(
      "Permission Required",
      "This app requires permission to access your media library",
      [
        {
          text: "Accept",
          onPress: () => MediaLibrary.requestPermissionsAsync(),
        },
        { text: "Cancle", onPress: () => permissionPopUp() },
      ]
    );
  };

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();

    if (permission.granted == true) {
      console.log("Permission Granted ,Showing all music");
      getAllSongs();
    }
    if (permission.granted == false && permission.canAskAgain == true) {
      const askpermission = await MediaLibrary.requestPermissionsAsync();
      // console.log(askpermission);
      if (
        askpermission.status == "denied" &&
        askpermission.canAskAgain == true
      ) {
        permissionPopUp();
        getAllSongs();
        console.log(
          "Permission Denied, Please allow permission to show all music"
        );
      }
      if (askpermission.status == "granted") {
        console.log("Permission Granted, Showing all Music");
      }
      if (
        askpermission.status == "denied" &&
        askpermission.canAskAgain == false
      ) {
        console.log("Can't Show Music");
      }
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  const dispatch = useDispatch();

  const getAllSongs = async () => {
    const songs = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    dispatch(setAllSongs(songs));
  };

  let activesonguri = "null";
  if (mysongs?.assets) {
    activesonguri = mysongs?.assets[0]?.uri;
  }

  const [activesong, setActivesong] = useState("");
  const activesong_global = useSelector((state) => state.activesong_global);

  useEffect(() => {
    setActivesong(activesong_global);
  }, []);

  const isPlaying = useSelector((state) => state.isplaying_global);
  const updatecurrentsong = (item) => {
    setActivesong(item);
    dispatch(setActiveSong_global(item));
    dispatch(setIsPlaying_global(true));
  };

  const playpausesong = () => {
    dispatch(setIsPlaying_global(!isPlaying));
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.bottomnav}>
        {activesong?.filename && (
          <View style={styles.bottomsong}>
            <Image source={musicimg} style={styles.songimage} />
            <Text style={styles.songtitle1}>{activesong.filename}</Text>
            {isPlaying == true ? (
              <MaterialIcons
                name="pause-circle-filled"
                size={40}
                style={styles.iconactive}
                onPress={() => playpausesong()}
              />
            ) : (
              <MaterialIcons
                name="play-circle-filled"
                size={40}
                style={styles.iconactive}
                onPress={() => playpausesong()}
              />
            )}
          </View>
        )}
        <BottomNav activepage={"allmusic"} navigation={navigation} />
      </View>
      <Text style={styles.head1}>Your Songs</Text>
      <ScrollView style={styles.cont2}>
        {mysongs?.assets &&
          mysongs.assets.map((item) => (
            <View key={item.id}>
              {item.uri == activesong.uri ? (
                <View style={styles.songcardactive}>
                  <Image source={musicimg} style={styles.songimage} />
                  <Text style={styles.songtitle1}>{item.filename}</Text>
                  {isPlaying == true ? (
                    <MaterialIcons
                      name="pause-circle-filled"
                      size={40}
                      style={styles.iconactive}
                      onPress={() => playpausesong()}
                    />
                  ) : (
                    <MaterialIcons
                      name="play-circle-filled"
                      size={40}
                      style={styles.iconactive}
                      onPress={() => playpausesong()}
                    />
                  )}
                  <MaterialIcons
                    name="playlist-add"
                    size={24}
                    color="black"
                    style={styles.iconactive}
                  />
                </View>
              ) : (
                <View style={styles.songcard}>
                  <Image source={musicimg} style={styles.songimage} />
                  <Text style={styles.songtitle}>{item.filename}</Text>
                  <AntDesign
                    name="play"
                    size={24}
                    color="black"
                    style={styles.icon}
                    onPress={() => updatecurrentsong(item)}
                  />
                  <MaterialIcons
                    name="playlist-add"
                    size={24}
                    color="black"
                    style={styles.icon}
                  />
                </View>
              )}
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default Allmusic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: backgroundColor2,
    width: "100%",
  },
  bottomnav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    zIndex: 10,
  },
  head1: {
    color: primaryColor,
    fontSize: 20,
    backgroundColor: "#4C4C4C",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20,
    width: "50%",
    textAlign: "center",
    alignItems: "center",
  },
  songtitle: {
    color: primaryColor,
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
    width: "60%",
  },
  cont2: {
    width: "100%",
  },
  songcard: {
    width: "95%",
    backgroundColor: "#4C4C4A",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  songimage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: backgroundColor1,
  },
  icon: {
    marginHorizontal: 10,
    color: primaryColor,
  },
  iconactive: {
    marginHorizontal: 2,
    color: backgroundColor1,
  },
  songcardactive: {
    width: "95%",
    backgroundColor: primaryColor,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  songtitle1: {
    color: backgroundColor1,
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
    width: "60%",
  },
  bottomsong: {
    backgroundColor: primaryColor,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
