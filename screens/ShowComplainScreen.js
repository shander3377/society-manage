import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from "react-native";
import { ListItem } from "react-native-elements";
import db from "../config.js";
import firebase from "firebase";
export default class ShowComplainScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            complainList: [],
            pass: "",
            docId: "",
        };
        this.complainRef = null;
    }
getComplaints = () =>{ 
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
            console.warn(this.state.pass);
            this.complainRef = db.collection("societies").doc(this.state.pass).collection("complains").onSnapShot((snapshot)=>{
              
                var complainList = snapshot.docs.map((doc) => doc.data());
                this.setState({
                    complainList: complainList,
                });
            });
        });
}
componentDidMount = () =>{
    this.getComplaints();
}
  componentWillUnmount = () =>{
      this.complainRef();
  }

  
  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
      return (
          <ListItem
              key={i}
              Topic={item.topic}
              Description={item.Description}
              titleStyle={{ color: "black", fontWeight: "bold" }}
              rightElement={
                  <TouchableOpacity style={styles.button}>
                      <Text style={{color:"#ffff"}}>View</Text>
                  </TouchableOpacity>
              }
              bottomDivider
          />
      );
  }
  render(){
      return(

          <View style={styles.container}>
              {
                  this.state.complainList.length === 0
                      ?(
                          <View style={styles.subContainer}>
                              <Text style={{ fontSize: 20}}>List Of All Complains</Text>
                          </View>
                      )
                      :(
                          <FlatList
                              keyExtractor={this.keyExtractor}
                              data={this.state.requestedBooksList}
                              renderItem={this.renderItem}
                          />
                      )
              }
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
