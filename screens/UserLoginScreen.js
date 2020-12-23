import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import {LinearGradient} from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from 'react-native-animatable';
import SignInAnim from '../components/signInAnim.js'
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
export default class UserLoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkTextInput: false,
      password: '',
      email: '',
      secureTextEntry: true,
      imageIsReady: false,
    };
  }
  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
    
      require('../assets/bgimg.jpg'),
    ]);

  
    await Promise.all([...imageAssets]);
  }
  textInputChange(text){
    if(text.length!==0){
      this.setState({
        checkTextInput: true,
        email: text
      })
    } else {
      this.setState({
        checkTextInput: false
      })
    }
  }
  secureTextEntry(){
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    })
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
        <Image       source={require("../assets/bgimg.jpg")}
      style={{flex:1, height:null, width:null}}/>
      </View>
        <View style={styles.header}>
        <SignInAnim/>
        </View>

        <Animatable.View 
      animation="fadeInUpBig"
       style={styles.footer}>
          <Text style={styles.footerText}>E-MAIL</Text>
          <View style={styles.animation}>
            <FontAwesome5 name="user-circle" color="#05375a" size={20} />
            <TextInput placeholder="Your Email-ID" style={styles.textInput} 
            onChangeText={(text)=>this.textInputChange(text)}/>
            {this.state.checkTextInput ?
              <Animatable.View 
              animation="bounceIn">
            <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          : null}
        
          </View>

          <Text style={[styles.footerText, { marginTop: 35 }]}>Password</Text>
          <View style={styles.animation}>
          <FontAwesome5 name="lock" color="#05375a" size={20} />
          {this.state.secureTextEntry? 
          <TextInput
          secureTextEntry={true} 
          placeholder="Your Password" 
          style={styles.textInput}
          value={this.state.password}
          onChangeText={(text)=>this.setState({password: text})} />
          :
          <TextInput
          placeholder="Your Password" 
          style={styles.textInput}
          value={this.state.password}
          onChangeText={(text)=>this.setState({password: text})} />
  }
          <TouchableOpacity  onPress={()=>this.secureTextEntry()}>
            {this.state.secureTextEntry? 
          <Feather name="eye-off" color="gray" size={20} />
          :
          <Feather name="eye" color="gray" size={20} />
            }
          </TouchableOpacity>
          </View>
        <Text style={{ color: "#009bd1", marginTop: 15 }}>
          Forgot Password?
        </Text>
        <View style={styles.button}>
          <LinearGradient
            colors={["#5db8fe", "#39cff2"]}
            style={styles.signIn}
          >
            <Text style={[styles.signinText, {color: 'white'}]}>Sign In</Text>
          </LinearGradient>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserLoginScreen')}
          style={[styles.signIn,{
            borderColor:'#4dc2f8',
  borderWidth: 1,
  marginTop: 15,
          }]}>
<Text style={[styles.signinText,{
 color: '#4dc2f8'
}]}>Sign Up</Text>
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
    borderRadius: 10,
  },
  signinText:{
    fontSize:18,
    fontWeight:'bold'
  }
});
