
import React , { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import _ from 'lodash';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';

import Router from './Router';
import { Provider } from 'react-redux';
import { store } from './Config/Redux/'; 

export default class App extends Component{
  render(){
    return(
    <Provider store={store}>
      <NavigationContainer>
        <Router/>
      </NavigationContainer>
    </Provider>     

    )
  }
}

const styles = StyleSheet.create({
 
});

