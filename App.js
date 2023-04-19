import React from "react";

import Player from "./src/Screens/Player";
import Allmusic from "./src/Screens/Allmusic";
import Allplaylist from "./src/Screens/Allplaylist";

import { Provider } from "react-redux";
import { Store } from "./src/redux/store";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Player" component={Player} />
          <Stack.Screen name="Allmusic" component={Allmusic} />
          <Stack.Screen name="Allplaylists" component={Allplaylist} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
