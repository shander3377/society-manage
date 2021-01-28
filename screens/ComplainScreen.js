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
export default class ComplainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkTopicInput: false,
            checkDescriptionInput: false,
            topic: "",
            description: "",
            imageIsReady: false,
            docId: "",
            pass: ""
        };
    }
  uploadComp = async (topic, description) => {
      var email = firebase.auth().currentUser.email;
      db.collection("user")
          .where("email_id", "==", email)
          .get()
          .then((snapshot) => {
              snapshot.forEach((doc) => {
                  this.setState({
                      docId: doc.id,
                      pass: doc.data().pass
                  });
              });
              console.warn(this.state.topic, this.state.description);
              console.warn(description);
              db.collection("societies").doc(this.state.pass).collection("complains").add({
                  topic: topic,
                  description: description
              });
             
          });

  };
  async _loadAssetsAsync() {
      const imageAssets = cacheImages([require("../assets/bgimg.jpg")]);

      await Promise.all([...imageAssets]);
  }
  topicInputChange(text) {
      if (text.length >= 5) {
          this.setState({
              checkTopicInput: true,
              topic: text,
          });
      } else {
          this.setState({
              checkTopicInput: false,
          });
      }
  }
  descriptionInputChange(text) {
      if (text.length >= 10) {
          this.setState({
              checkDescriptionInput: true,
              description: text,
          });
      } else {
          this.setState({
              checkDescriptionInput: false,
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
                  <Text style={styles.footerText}>Topic</Text>
                  <View style={styles.animation}>
                      <FontAwesome5 name="user-circle" color="#05375a" size={20} />
                      <TextInput
                          placeholder="topic"
                          style={styles.textInput}
                          onChangeText={(text) => this.topicInputChange(text)}
                      />
                      {this.state.checkTopicInput ? (
                          <Animatable.View animation="bounceIn">
                              <Feather name="check-circle" color="green" size={20} />
                          </Animatable.View>
                      ) : null}
                  </View>

                 
           
                  <Text style={styles.footerText}>Description</Text>
                  <View style={styles.animation}>
                      <FontAwesome5 name="user-circle" color="#05375a" size={20} />
                      <TextInput
                          placeholder="Description"
                          style={styles.textInput}
                          onChangeText={(text) => this.descriptionInputChange(text)}
                      />
                      {this.state.checkDescriptionInput ? (
                          <Animatable.View animation="bounceIn">
                              <Feather name="check-circle" color="green" size={20} />
                          </Animatable.View>
                      ) : null}
                  </View>
                 
          
                  <View style={styles.button}>
                      <TouchableOpacity
                          onPress={() => {
                              this.uploadComp(this.state.topic, this.state.description);}}
                          style={styles.signIn}
                      >
                          <LinearGradient
                              colors={["#5db8fe", "#39cff2"]}
                              style={styles.signIn}
                          >
                              <Text style={[styles.signinText, { color: "white" }]}>
               Upload Complain
                              </Text>
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
