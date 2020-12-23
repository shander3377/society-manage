import React from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView} from 'react-native';
export default class SocietyLoginScreen extends React.Component {

    constructor(){
        super();
        this.state={
     name: 'agrim'
        }
      }
    


  render(){
      return(
        <KeyboardAvoidingView style = {{alignItems:'center',marginTop:20}}>
        <View>

      <Text style={{textAlign: 'center', fontSize: 30, marginLeft: 200}}>Hello {this.state.name}</Text>
  </View>
      </KeyboardAvoidingView>

      )
  }
}


