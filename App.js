import * as React from "react";

import {

    StyleSheet,

  

    View,

    
} from "react-native";

import LoginScreen from "./screens/LoginScreen.js";

import HomeScreen from "./screens/HomeScreen.js";

import SocietyLoginScreen from "./screens/SocietyLoginScreen.js";

import UserLoginScreen from "./screens/UserLoginScreen.js";

import UserSignUpScreen from "./screens/UserSignUpScreen.js";

import SocietySignUpScreen from "./screens/SocietySignUpScreen.js";

import ShowComplainScreen from "./screens/ShowComplainScreen.js";

import ComplainScreen from "./screens/ComplainScreen.js";
import UserSocietyJoinScreen from "./screens/UserSocietyJoinScreen.js";
import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
    CardStyleInterpolators,
} from "@react-navigation/stack";


const Stack = createStackNavigator();

export default class App extends React.Component {

    render() {

        return (

            <View style={styles.container}>

             
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="LoginScreen"
                            component={LoginScreen}
                            options={{
                                cardStyleInterpolator:
              CardStyleInterpolators.forRevealFromBottomAndroid,
                                headerLeft: null,
                                gesturesEnabled: false,
                                title: "Welcome Screen"
                            }}
                        />
                  

                        <Stack.Screen
                            name="SocietyLoginScreen"
                            component={SocietyLoginScreen}
                            options={{
                                cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
                                title: "Society Login Screen"
                            }}
                        />


                        <Stack.Screen
                            name="UserLoginScreen"
                            component={UserLoginScreen}
                            options={{
                                cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
                                headerLeft: null,
                                gesturesEnabled: false,
                                title: "Login Screen"
                            }}
                        />


                        


                        <Stack.Screen
                            name="UserSignUpScreen"
                            component={UserSignUpScreen}
                            options={{
                                cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
                                headerLeft: null,
                                gesturesEnabled: false,
                                title: "Sign Up Screen"
                            }}
                        />


                        <Stack.Screen
                            name="SocietySignUpScreen"
                            component={SocietySignUpScreen}
                            options={{
                                cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
                                headerLeft: null,
                                gesturesEnabled: false, 
                                title: "Soceity Sign Up Screen"
                            }}
                        />

                        <Stack.Screen
                            name="UserSocietyJoinScreen"
                            component={UserSocietyJoinScreen}
                            options={{
                                cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
                                title: "Society Join Screen"
                            }}
                        />
                        <Stack.Screen
                            name="HomeScreen"
                            component={HomeScreen}
                            options={{
                                cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
                                headerShown: false,
                                gesturesEnabled: false,
                           
                            }}

                        />
                        <Stack.Screen
                            name="ComplainScreen"
                            component={ComplainScreen}
                            options={{
                                cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
                                title: "Complaint Screen"
                            }}
                        />
                   

                        <Stack.Screen
                            name="ShowComplainScreen"
                            component={ShowComplainScreen}
                            options={{
                                cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
                                title: "Complaints Screen"
                            }}
                        />
                    </Stack.Navigator>
                 
                </NavigationContainer>
            </View>

        );

    }

}



// const switchNavigator = createSwitchNavigator({

//     LoginScreen: { screen: LoginScreen },

//     SocietyLoginScreen: { screen: SocietyLoginScreen },

//     UserLoginScreen: { screen: UserLoginScreen },

//     HomeScreen: { screen: HomeScreen },

//     UserSignUpScreen: {screen: UserSignUpScreen},
   
//     SocietySignUpScreen: {screen: SocietySignUpScreen},
// });



// const AppContainer = createAppContainer(switchNavigator);



const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: "#b8b8b8",

    },

});

