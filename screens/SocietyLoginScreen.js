/* eslint-disable no-unused-vars */
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import db from "../config.js";

import firebase from "firebase";
function cacheImages(images) {
    return images.map((image) => {
        if (typeof image === "string") {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}
export default class SocietyLoginScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigate } = this.props.navigation;
        this.state = {
            checkTextInput: false,
            pass: "",
            secureTextEntry: true,
            imageIsReady: false,
            docId: "",
            userName: "",
            mobile_no: "",
            docId2: "",
        };
    }

    async _loadAssetsAsync() {
        const imageAssets = cacheImages([require("../assets/bgimg.jpg")]);

        await Promise.all([...imageAssets]);
    }
  signIn = (pass) => {
      if (pass) {
          var email = firebase.auth().currentUser.email;
          var docRef = db.collection("societies").doc(pass);
          docRef
              .get()
              .then((doc) => {
                  if (doc.exists) {
                      db.collection("user")
                          .where("email_id", "==", email)
                          .get()
                          .then((snapshot) => {
                              snapshot.forEach((doc) => {
                                  this.setState({
                                      docId: doc.id,
                                      first_name: this.state.userName,
                                      mobile_no: this.state.mobile_no,
                                  });
                              });
                              db.collection("user").doc(this.state.docId).update({
                                  pass: pass,
                              });
                          });
                      var userRef = db
                          .collection("societies")
                          .doc(pass)
                          .collection("users")
                          .where("userEmail", "==", email)
                          .get();
                      userRef.then((snapshot) => {
                          snapshot.forEach((doc) => {
                              this.setState({ docId2: doc.id });
                          });
                          var userRef = db
                              .collection("societies")
                              .doc(pass)
                              .collection("users")
                              .doc(this.state.docId2)
                              .get()
                              .then((doc) => {
                                  console.warn(doc.exists);
                                  if (doc.exists) {
                                      this.props.navigation.navigate("UserSocietyJoinScreen");
                                  } else {
                                      db.collection("societies")
                                          .doc(pass)
                                          .collection("users")
                                          .add({
                                              email: email,
                                              name: this.state.userName,
                                              mobile_no: this.state.mobile_no,
                                          });

                                      this.props.navigation.navigate("UserSocietyJoinScreen");
                                  }
                              })
                              .catch(function (error) {
                                  console.log("Error getting document:", error);
                              });
                      });
                  } else {
                      Alert.alert("Society not created yet");
                  }
              })
              .catch(() => {
                  this.props.navigation.navigate("UserSocietyJoinScreen");
              });
      } else {
          Alert.alert("no pass found");
      }
  };
  //if(pass){

  //       //   var email = firebase.auth().currentUser.email;
  //       var docRef = db.collection("societies").doc(pass);

  //       docRef.get().then(function(doc) {
  //           if (doc.exists) {
  //               db.collection("user").doc(pass)
  //                   .update({
  //                       pass: doc.data.society_pass
  //                   });
  //               this.props.navigation.navigate("UserSocietyJoinScreen");
  //           } else {
  //               // doc.data() will be undefined in this case
  //               console.warn("No such document!");
  //           }
  //       }).catch(function() {
  //           this.props.navigation.navigate("UserSocietyJoinScreen");
  //       });
  //   }else {
  //       Alert.alert("no pass");
  //   }

  textInputChange(text) {
      if (text.length !== 7) {
          this.setState({
              checkTextInput: true,
              pass: text,
          });
      } else {
          this.setState({
              checkTextInput: false,
          });
      }
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
              <View style={styles.header}></View>

              <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                  <Text style={styles.footerText}>PASS</Text>
                  <View style={styles.animation}>
                      <FontAwesome5 name="user-circle" color="#05375a" size={20} />
                      <TextInput
                          placeholder="Society pass provided by secretary"
                          style={styles.textInput}
                          onChangeText={(text) => this.textInputChange(text)}
                      />
                      {this.state.checkTextInput ? (
                          <Animatable.View animation="bounceIn">
                              <Feather name="check-circle" color="green" size={20} />
                          </Animatable.View>
                      ) : null}
                  </View>

                  <View style={styles.animation}>
                      <FontAwesome5 name="info-circle" color="#05375a" size={20} />
                      <Text>
              Please use the code only provided by society secretary and not any
              other person. This avoides fraudery
                      </Text>
                  </View>
                  <View style={styles.button}>
                      <TouchableOpacity
                          onPress={() => this.signIn(this.state.pass)}
                          style={styles.signIn}
                      >
                          <LinearGradient
                              colors={["#5db8fe", "#39cff2"]}
                              style={styles.signIn}
                          >
                              <Text style={[styles.signinText, { color: "white" }]}>
                  Login Society
                              </Text>
                          </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={() =>
                              this.props.navigation.navigate("SocietySignUpScreen")
                          }
                          style={[
                              styles.signIn,
                              {
                                  borderColor: "#4dc2f8",
                                  borderWidth: 1,
                                  marginTop: 15,
                                  borderRadius: 77,
                              },
                          ]}
                      >
                          <Text
                              style={[
                                  styles.signinText,
                                  {
                                      color: "#4dc2f8",
                                  },
                              ]}
                          >
                Sign Up
                          </Text>
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
        backgroundColor: "#b8b8b8",
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
