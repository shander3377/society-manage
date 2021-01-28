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
export default class SearchScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "agrim",
            search: '',
        };
    }
    fetchUsers= () =>{
        
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
                    onChangeText={this.props.navigation.navigate("SearchScreen")}
                    value={search}
                    containerStyle={{marginTop:30}}
                    round={true}
                />
         
             
                  
               
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
