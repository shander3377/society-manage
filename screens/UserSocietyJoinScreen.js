import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import db from "../config.js";
import firebase from "firebase";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";

function cacheImages(images) {
    return images.map((image) => {
        if (typeof image === "string") {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

export default class UserSocietyJoinScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkFlatInput: false,
            checkTowerInput: false,
            checkVehicleInput: false,
            checkFamilyInput: false,
            flat: "",
            tower: "",
            vehicle: "",
            family: "",
            imageIsReady: false,
            docId: "",
            docId2: "",
        };
    }
  userSignUp = async () => {
      if (
          this.state.checkFamilyInput == false ||
      this.state.checkFlatInput == false ||
      this.state.checkTowerInput == false ||
      this.state.checkVehicleInput == false
      ) {
          Alert.alert("Please fill all the details");
      } else {
          var email = firebase.auth().currentUser.email;
          db.collection("user")
              .where("email_id", "==", email)
              .get()
              .then((snapshot) => {
                  snapshot.forEach((doc) => {
                      this.setState({
                          docId: doc.id,
                      });
                  });
                  db.collection("user").doc(this.state.docId).update({
                      familyNo: this.state.family,
                      flat: this.state.flat,
                      tower: this.state.tower,
                      vehicle: this.state.vehicle,
                  });
                  db.collection("user")
                      .doc(this.state.docId)
                      .get()
                      .then((doc2) => {
                          // Document was found in the cache. If no cached document exists,
                          // an error will be returned to the 'catch' block below.
                          console.warn("Cached document data:", doc2.data());
                          db.collection("societies")
                              .doc(doc2.data().pass)
                              .collection("users")
                              .where("userEmail", "==", email)
                              .get()
                              .then((snapshot) => {
                                  snapshot.forEach((doc) => {
                                      this.setState({ docId2: doc.id });
                                  });
                                  db.collection("societies")
                                      .doc(doc2.data().pass)
                                      .collection("users")
                                      .doc(this.state.docId2)
                                      .update({
                                          FamilyNo: doc2.data().familyNo,
                                          Flat: doc2.data().flat,
                                          Tower: doc2.data().tower,
                                          Vehicle: doc2.data().vehicle,
                                      });
                              });
                      })
                      .catch(function (error) {
                          console.warn("Error getting cached document:", error);
                      });
                  this.props.navigation.navigate("HomeScreen");
              });
      }
  };

  async _loadAssetsAsync() {
      const imageAssets = cacheImages([require("../assets/bgimg.jpg")]);

      await Promise.all([...imageAssets]);
  }
  flatInputChange(text) {
      if (text.length >= 2) {
          this.setState({
              checkFlatInput: true,
              flat: text,
          });
      } else {
          this.setState({
              checkFlatInput: false,
          });
      }
  }
  towerInputChange(text) {
      if (text.length >= 0) {
          this.setState({
              checkTowerInput: true,
              tower: text,
          });
      } else {
          this.setState({
              checkTowerInput: false,
          });
      }
  }
  familyInputChange(text) {
      if (text.length >= 0) {
          this.setState({
              checkFamilyInput: true,
              family: text,
          });
      } else {
          this.setState({
              checkFamilyInput: false,
          });
      }
  }

  vehicleInputChange(text) {
      if (text.length >= 0) {
          this.setState({
              checkVehicleInput: true,
              vehicle: text,
          });
      } else {
          this.setState({
              checkVehicleInput: false,
          });
      }
  }
  secureTextEntry() {
      this.setState({
          secureTextEntry: !this.state.secureTextEntry,
      });
  }
  secureTextEntry2() {
      this.setState({
          secureTextEntry2: !this.state.secureTextEntry2,
      });
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
              <ScrollView>
                  <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                      <TouchableOpacity
                          onPress={() => {
                              this.props.navigation.navigate("LoginScreen");
                          }}
                      >
                          <AntDesign name="leftcircle" color="#05375a" size={30} />
                      </TouchableOpacity>
                      <Text style={styles.footerText}>Flat No.</Text>
                      <View style={styles.animation}>
                          <FontAwesome5 name="user-circle" color="#05375a" size={20} />
                          <TextInput
                              placeholder="Your Flat No."
                              style={styles.textInput}
                              onChangeText={(text) => this.flatInputChange(text)}
                          />
                          {this.state.checkFlatInput ? (
                              <Animatable.View animation="bounceIn">
                                  <Feather name="check-circle" color="green" size={20} />
                              </Animatable.View>
                          ) : null}
                      </View>

                      <Text style={[styles.footerText, { marginTop: 35 }]}>
              Tower Name
                      </Text>
                      <View style={styles.animation}>
                          <FontAwesome5 name="user-circle" color="#05375a" size={20} />
                          <TextInput
                              placeholder="Your Tower Name"
                              style={styles.textInput}
                              onChangeText={(text) => this.towerInputChange(text)}
                          />
                          {this.state.checkTowerInput ? (
                              <Animatable.View animation="bounceIn">
                                  <Feather name="check-circle" color="green" size={20} />
                              </Animatable.View>
                          ) : null}
                      </View>

                      <Text style={[styles.footerText, { marginTop: 35 }]}>
              No. of family members
                      </Text>
                      <View style={styles.animation}>
                          <Entypo name="phone" color="#05375a" size={20} />
                          <TextInput
                              placeholder="No. of family members living"
                              style={styles.textInput}
                              onChangeText={(text) => this.familyInputChange(text)}
                          />
                          {this.state.checkFamilyInput ? (
                              <Animatable.View animation="bounceIn">
                                  <Feather name="check-circle" color="green" size={20} />
                              </Animatable.View>
                          ) : null}
                      </View>

                      <Text style={[styles.footerText, { marginTop: 35 }]}>
              Vehicle No.
                      </Text>
                      <View style={styles.animation}>
                          <Entypo name="phone" color="#05375a" size={20} />
                          <TextInput
                              placeholder="Your vehice No."
                              style={styles.textInput}
                              onChangeText={(text) => this.vehicleInputChange(text)}
                          />
                          {this.state.checkVehicleInput ? (
                              <Animatable.View animation="bounceIn">
                                  <Feather name="check-circle" color="green" size={20} />
                              </Animatable.View>
                          ) : null}
                      </View>
                      <View style={styles.button}>
                          <TouchableOpacity
                              style={[
                                  styles.signIn,
                                  {
                                      borderColor: "#4dc2f8",
                                      borderWidth: 1,
                                      marginTop: 15,
                                  },
                              ]}
                              onPress={() => this.userSignUp()}
                          >
                              <LinearGradient
                                  colors={["#5db8fe", "#39cff2"]}
                                  style={styles.signIn}
                              >
                                  <Text style={[styles.signinText, { color: "white" }]}>
                    Sign Up
                                  </Text>
                              </LinearGradient>
                          </TouchableOpacity>
                      </View>
                  </Animatable.View>
              </ScrollView>
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
        paddingLeft: 10,
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
        borderRadius: 10,
    },
    signinText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
