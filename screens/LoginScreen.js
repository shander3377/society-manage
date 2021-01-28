import React from "react";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import * as Animatable from "react-native-animatable";

const { height } = Dimensions.get("screen");
const height_logo = height * 1 * 0.4;

function cacheImages(images) {
    return images.map((image) => {
        if (typeof image === "string") {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

export default class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            imageIsReady: false,
        };
    }
    async _loadAssetsAsync() {
        const imageAssets = cacheImages([require("../assets/bgimg.jpg")]);

        await Promise.all([...imageAssets]);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }
        return (
            <View style={styles.container}>
                <View style={StyleSheet.absoluteFill}>
                    <Image
                        source={require("../assets/bgimg.jpg")}
                        style={{ flex: 1, height: null, width: null }}
                    />
                </View>
                <View stlye={styles.header}>
                    <Animatable.Image
                        animation="bounceIn"
                        duration={2000}
                        source={require("../assets/splash.png")}
                        style={styles.logo}
                        resizeMode={"stretch"}
                    />
                </View>
                <Animatable.View style={styles.footer} animation="fadeInUpBig">
                    <Text style={styles.title}>Manage your society the best</Text>
                    <Text style={styles.text}>Sign In With An Account to Continue</Text>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("UserLoginScreen")}
                        >
                            <LinearGradient
                                colors={["#5db8fe", "#39cff2"]}
                                style={styles.signIn}
                            >
                                <Text style={styles.signinText}>Get Started for free</Text>

                                <MaterialIcons name="navigate-next" color="white" size={20} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    footer: {
        flex: 1,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 50,
    },
    logo: {
        width: height_logo,
        height: height_logo,
        alignSelf: "center",
    },
    title: {
        color: "#05375a",
        fontWeight: "bold",
        fontSize: 30,
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: "#b8b8b8",
    },
    button: {
        alignItems: "center",
        marginTop: 30,
    },
    signIn: {
        width: 190,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 70,
        flexDirection: "row",
    },
    text: {
        color: "gray",
        marginTop: 5,
    },
    signinText: {
        color: "white",
        fontWeight: "bold",
    },
});
