/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<Props> {
  render() {
    return (
      <View class="default-screen">
        <Text class="welcome mt2 ttu">Welcome to React Native!</Text>
        <Text class="instructions pt5">To get started, edit App.js</Text>
        <Text class="instructions fw7">{instructions}</Text>
      </View>
    );
  }
}
