import React from 'react';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView, Dimensions} from 'react-native';



const {width, height} = Dimensions.get("window")

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class LoginScreen extends React.Component {

    constructor(){
        super();
        this.state={
     imageIsReady: false,
        }
   
      
      }
      async _loadAssetsAsync() {
        const imageAssets = cacheImages([
        
          require('../assets/bgimg.jpg'),
        ]);
   
      
        await Promise.all([...imageAssets]);
      }



  render(){
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
      return(

        <View style={{flex:1, backgroundColor: 'white', justifyContent: 'flex-end'}}>
<View style={StyleSheet.absoluteFill}>
 

<Image       source={require("../assets/bgimg.jpg")}
      style={{flex:1, height:null, width:null}}/>

    

  </View>
      <View style={{height: height/3, justifyContent: 'center' }}>
<TouchableOpacity onPress={()=>this.props.navigation.navigate('UserLoginScreen')}>
        <View style={styles.button}>
<Text style={{fontSize: 20, fontWeight: 'bold'}}>Please Sign In</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.button}>
<Text style={{fontSize: 20, fontWeight: 'bold'}}>Sign in using google</Text>
        </View>
        </TouchableOpacity>
      </View>
      
      </View>
    

      )
  }
}

const styles = StyleSheet.create({
button: {
  backgroundColor: 'white',
  height: 70,
  marginHorizontal: 20,
  borderRadius: 40,
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 5

}
});



