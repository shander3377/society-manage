import React from 'react';
import LottieView from 'lottie-react-native';

export default class SignInAnim extends React.Component {
  render() {
    return (
      <LottieView
      source={require('../assets/9811-loading.json')}
      style={{width:"60%"}}
      autoPlay loop />
    )
  }
}