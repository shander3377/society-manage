/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import React from "react";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as Animatable from "react-native-animatable";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import db from "../config.js";
import firebase from "firebase";
import { uid } from "uid";
import { Header } from "@react-navigation/stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
function cacheImages(images) {
    return images.map((image) => {
        if (typeof image === "string") {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}
export default class SocietySignUpScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            imageIsReady: false,
            next: false,
            checkNameInput: false,
            name: "",
            plot: "",
            checkPlotInput: false,
            locality: "",
            checkLocalityInput: false,
            city: "",
            checkCityInput: false,
            state: "",
            checkStateInput: false,
            country: "",
            checkCountryInput: false,
            presidentName: "",
            checkPresidentNameInput: false,
            presidentMobile: "",
            checkPresidentMobileInput: false,
            secretaryName: "",
            checkSecretaryNameInput: false,
            secretaryMobile: "",
            checkSecretaryMobile: false,
            done1: false,
            docId: "",
            userName: "",
            mobile_no: "",
        };
    }
    async _loadAssetsAsync() {
        const imageAssets = cacheImages([require("../assets/bgimg.jpg")]);

        await Promise.all([...imageAssets]);
    }

    nameInputChange(text) {
        if (text.length >= 3) {
            this.setState({
                checkNameInput: true,
                name: text,
            });
        } else {
            this.setState({
                checkNameInput: false,
            });
        }
    }

    plotInputChange(text) {
        if (text.length >= 3) {
            this.setState({
                checkPlotInput: true,
                plot: text,
            });
        } else {
            this.setState({
                checkPlotInput: false,
            });
        }
    }

    localityInputChange(text) {
        if (text.length >= 3) {
            this.setState({
                checkLocalityInput: true,
                locality: text,
            });
        } else {
            this.setState({
                checkLocalityInput: false,
            });
        }
    }

    cityInputChange(text) {
        if (text.length >= 3) {
            this.setState({
                checkCityInput: true,
                city: text,
            });
        } else {
            this.setState({
                checkCityInput: false,
            });
        }
    }

    stateInputChange(text) {
        if (text.length >= 3) {
            this.setState({
                checkStateInput: true,
                state: text,
            });
        } else {
            this.setState({
                checkStateInput: false,
            });
        }
    }

    countryInputChange(text) {
        if (text.length >= 3) {
            this.setState({
                checkCountryInput: true,
                country: text,
            });
        } else {
            this.setState({
                checkCountryInput: false,
            });
        }
    }

    presidentNameInputChange(text) {
        if (text.length >= 3) {
            this.setState({
                checkPresidentNameInput: true,
                presidentName: text,
            });
        } else {
            this.setState({
                checkPresidentNameInput: false,
            });
        }
    }

    presidentMobileInputChange(text) {
        if (text.length == 10 && isNaN(text) == false) {
            this.setState({
                checkPresidentMobileInput: true,
                presidentMobile: text,
            });
        } else {
            this.setState({
                checkPresidentMobileInput: false,
            });
        }
    }

    secretaryMobileInputChange(text) {
        if (text.length == 10 && isNaN(text) == false) {
            this.setState({
                checkSecretaryMobileInput: true,
                secretaryMobile: text,
            });
        } else {
            this.setState({
                checkSecretaryMobileInput: false,
            });
        }
    }

    secretaryNameInputChange(text) {
        if (text.length >= 3) {
            this.setState({
                checkSecretaryNameInput: true,
                secretaryName: text,
            });
        } else {
            this.setState({
                checkSecretaryNameInput: false,
            });
        }
    }

  showNext = () => {
      if (
          this.state.checkNameInput == true &&
      this.state.checkLocalityInput == true &&
      this.state.checkCityInput == true &&
      this.state.checkPlotInput == true &&
      this.state.checkStateInput == true
      ) {
          this.setState({ next: true });
      } else {
          Alert.alert("Please fill all the details");
      }
  };
  addDb = () => {
      if (
          this.state.checkCountryInput == true &&
      this.state.checkPresidentNameInput == true &&
      this.state.checkSecretaryNameInput == true &&
      this.state.checkSecretaryMobileInput == true &&
      this.state.checkPresidentMobileInput == true
      ) {
          var pass = uid(4);
          this.setState({ pass: pass });
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
                      pass: pass,
                  });
                  db.collection("user")
                      .doc(this.state.docId)
                      .get()
                      .then((doc2) => {
                          // Document was found in the cache. If no cached document exists,
                          // an error will be returned to the 'catch' block below.
                          console.warn("Cached document data:", doc2.data());
                          db.collection("societies").doc(pass).collection("users").add({
                              userEmail: email,
                              membername: doc2.data().first_name,
                              memberMobile_no: doc2.data().mobile_no,
                          });
                      })
                      .catch(function (error) {
                          console.warn("Error getting cached document:", error);
                      });
              });

          db.collection("societies").doc(pass).set({
              society_pass: pass,
              name: this.state.name,
              plot_no: this.state.plot,
              locality: this.state.locality,
              city: this.state.city,
              state: this.state.state,
              country: this.state.country,
              president_name: this.state.presidentName,
              president_mobile: this.state.presidentMobile,
              secretary_name: this.state.secretaryName,
              secretary_mobile: this.state.secretaryMobile,
          });
          Alert.alert("Your Society code is "+ pass+ "Please note it down")
          this.props.navigation.navigate("UserSocietyJoinScreen");
      } else {
          Alert.alert("Please fill all the details");
      }
  };
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
      if (this.state.next === false) {
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
                      <ScrollView>
                          <Text style={styles.footerText}>Society Name</Text>
                          <View style={styles.animation}>
                              <FontAwesome5 name="user-circle" color="#05375a" size={20} />
                              <TextInput
                                  placeholder="Society Name"
                                  style={styles.textInput}
                                  onChangeText={(text) => this.nameInputChange(text)}
                              />
                              {this.state.checkNameInput ? (
                                  <Animatable.View animation="bounceIn">
                                      <Feather name="check-circle" color="green" size={20} />
                                  </Animatable.View>
                              ) : null}
                          </View>

                          <Text style={styles.footerText}>Society Plot No.</Text>
                          <View style={styles.animation}>
                              <FontAwesome5 name="user-circle" color="#05375a" size={20} />
                              <TextInput
                                  placeholder="Society Plot No."
                                  style={styles.textInput}
                                  onChangeText={(text) => this.plotInputChange(text)}
                              />
                              {this.state.checkPlotInput ? (
                                  <Animatable.View animation="bounceIn">
                                      <Feather name="check-circle" color="green" size={20} />
                                  </Animatable.View>
                              ) : null}
                          </View>
                          <Text style={styles.footerText}>Society Locality</Text>
                          <View style={styles.animation}>
                              <FontAwesome5 name="user-circle" color="#05375a" size={20} />
                              <TextInput
                                  placeholder="Society Locality"
                                  style={styles.textInput}
                                  onChangeText={(text) => this.localityInputChange(text)}
                              />
                              {this.state.checkLocalityInput ? (
                                  <Animatable.View animation="bounceIn">
                                      <Feather name="check-circle" color="green" size={20} />
                                  </Animatable.View>
                              ) : null}
                          </View>
                          <Text style={styles.footerText}>Society City</Text>
                          <View style={styles.animation}>
                              <FontAwesome5 name="user-circle" color="#05375a" size={20} />
                              <TextInput
                                  placeholder="Society City"
                                  style={styles.textInput}
                                  onChangeText={(text) => this.cityInputChange(text)}
                              />
                              {this.state.checkCityInput ? (
                                  <Animatable.View animation="bounceIn">
                                      <Feather name="check-circle" color="green" size={20} />
                                  </Animatable.View>
                              ) : null}
                          </View>
                          <Text style={styles.footerText}>Society State</Text>
                          <View style={styles.animation}>
                              <FontAwesome5 name="user-circle" color="#05375a" size={20} />
                              <TextInput
                                  placeholder="Society State"
                                  style={styles.textInput}
                                  onChangeText={(text) => this.stateInputChange(text)}
                              />
                              {this.state.checkStateInput ? (
                                  <Animatable.View animation="bounceIn">
                                      <Feather name="check-circle" color="green" size={20} />
                                  </Animatable.View>
                              ) : null}
                          </View>

                          <Button
                              icon={<Icon name="arrow-right" size={15} color="white" />}
                              title="Next"
                              style={styles.signIn}
                              onPress={() => this.showNext()}
                          />
                      </ScrollView>
                  </Animatable.View>
              </View>
          );
      } else {
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
                      <ScrollView>
                          <Text style={styles.footerText}>Society Country</Text>
                          <View style={styles.animation}>
                              <FontAwesome5 name="user-circle" color="#05375a" size={20} />
                              <TextInput
                                  placeholder="Society Country"
                                  style={styles.textInput}
                                  onChangeText={(text) => this.countryInputChange(text)}
                              />
                              {this.state.checkCountryInput ? (
                                  <Animatable.View animation="bounceIn">
                                      <Feather name="check-circle" color="green" size={20} />
                                  </Animatable.View>
                              ) : null}
                          </View>

                          <Text style={styles.footerText}>Society Secretary Name</Text>
                          <View style={styles.animation}>
                              <FontAwesome5 name="user-circle" color="#05375a" size={20} />
                              <TextInput
                                  placeholder="Society Secretary Name"
                                  style={styles.textInput}
                                  onChangeText={(text) => this.secretaryNameInputChange(text)}
                              />
                              {this.state.checkSecretaryNameInput ? (
                                  <Animatable.View animation="bounceIn">
                                      <Feather name="check-circle" color="green" size={20} />
                                  </Animatable.View>
                              ) : null}
                          </View>

                          <Text style={styles.footerText}>Society Secretary Mobile_No</Text>
                          <View style={styles.animation}>
                              <FontAwesome5 name="user-circle" color="#05375a" size={20} />
                              <TextInput
                                  placeholder="Society Secretary Mobile_No"
                                  style={styles.textInput}
                                  onChangeText={(text) => this.secretaryMobileInputChange(text)}
                              />
                              {this.state.checkSecretaryMobileInput ? (
                                  <Animatable.View animation="bounceIn">
                                      <Feather name="check-circle" color="green" size={20} />
                                  </Animatable.View>
                              ) : null}
                          </View>

                          <Text style={styles.footerText}>Society President Name</Text>
                          <View style={styles.animation}>
                              <FontAwesome5 name="user-circle" color="#05375a" size={20} />
                              <TextInput
                                  placeholder="Society President Name"
                                  style={styles.textInput}
                                  onChangeText={(text) => this.presidentNameInputChange(text)}
                              />
                              {this.state.checkPresidentNameInput ? (
                                  <Animatable.View animation="bounceIn">
                                      <Feather name="check-circle" color="green" size={20} />
                                  </Animatable.View>
                              ) : null}
                          </View>

                          <Text style={styles.footerText}>Society President Mobile_No</Text>
                          <View style={styles.animation}>
                              <FontAwesome5 name="user-circle" color="#05375a" size={20} />
                              <TextInput
                                  placeholder="Society President Mobile_No"
                                  style={styles.textInput}
                                  onChangeText={(text) => this.presidentMobileInputChange(text)}
                              />
                              {this.state.checkPresidentMobileInput ? (
                                  <Animatable.View animation="bounceIn">
                                      <Feather name="check-circle" color="green" size={20} />
                                  </Animatable.View>
                              ) : null}
                          </View>
                          <View style={styles.Button}>
                              <Button
                                  icon={<Icon name="arrow-right" size={15} color="white" />}
                                  title="Next"
                                  style={[
                                      styles.signIn,
                                      {
                                          borderColor: "#4dc2f8",
                                          borderWidth: 1,
                                          marginTop: 15,
                                          borderRadius: 77,
                                      },
                                  ]}
                                  onPress={() => this.addDb()}
                              />
                          </View>
                      </ScrollView>
                  </Animatable.View>
              </View>
          );
      }
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
