import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import LoginScreen from "./screens/LoginScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import SocietyLoginScreen from "./screens/SocietyLoginScreen.js";
import UserLoginScreen from "./screens/UserLoginScreen.js";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Header } from "react-native-elements";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={"#9c8210"}
          centerComponent={{
            text: "App",
            style: { color: "#fff", fontSize: 20 },
          }}
        />
        <AppContainer />
      </View>
    );
  }
}

const switchNavigator = createSwitchNavigator({
  LoginScreen: { screen: LoginScreen },
  SocietyLoginScreen: { screen: SocietyLoginScreen },
  UserLoginScreen: { screen: UserLoginScreen },
  HomeScreen: { screen: HomeScreen },
});

const AppContainer = createAppContainer(switchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b8b8b8",
  },
});
