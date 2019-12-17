import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from './components/Swiper';

export default class App extends Component {
  
  render() {
    return (
      <View style={styles.appContainer}>
        <Swiper />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
