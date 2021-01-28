/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import { SearchBar } from 'react-native-elements';

import AntDesign from "react-native-vector-icons/AntDesign";
export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "agrim",
            search: '',
        };
    }
    updateSearch = (search) => {
        this.setState({ search });
    };
    render() {
        const { search } = this.state;

        return (
            <View style={styles.container}>
             
                <SearchBar
                    placeholder="Search Users"
                    onChangeText={this.updateSearch}
                    value={search}
                    containerStyle={{marginTop:30}}
                    round={true}
                />
         
             
                  
                <View
                    style={{
                        backgroundColor: "rgb(69,54,88)",
                        borderRadius: 30,
                        marginTop: 30,
                        width: 230,
                        height: 150,
                        marginLeft: 55
                    }}
                >
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("ComplainScreen")}>
                        <Image
                            source={require("../assets/img1.png")}
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 10,
                                marginTop: 10,
                                marginLeft: 72,
                            }}
                        ></Image>
                        <Text style={{ marginLeft: 70, color: "white", fontSize: 20 }}>
            Complain
                        </Text>
                        <Text style={{ marginLeft: 70, color: "#A9A9A9", fontSize: 10 }}>
            Submit a Complain
                        </Text>
                    </TouchableOpacity>
                </View>
                 
              
                <View
                    style={{
                        backgroundColor: "rgb(69,54,88)",
                        borderRadius: 30,
                        marginTop: 30,
                        width: 230,
                        height: 150,
                        marginLeft: 55
                    }}
                >
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("ShowComplainScreen")}>
                        <Image
                            source={require("../assets/img1.png")}
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 10,
                                marginTop: 10,
                                marginLeft: 72,
                            }}
                        ></Image>
                        <Text style={{ marginLeft: 70, color: "white", fontSize: 20 }}>
           Complains
                        </Text>
                        <Text style={{ marginLeft: 50, color: "#A9A9A9", fontSize: 10 }}>
            Bodcast a message to everyone
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(59,39,79)",
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 25,
        paddingBottom: 50,
    },
    footer: {
        flex: 3,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    headerText: {
        color: "#05375a",
        fontSize: 18,
    },
    footerText: {
        color: "#05375a",
        fontSize: 18,
    },
    animation: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: "#b8b8b8",
    },
    button: {
        alignItems: "center",
        marginTop: 50,
    },
    signIn: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    signinText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
