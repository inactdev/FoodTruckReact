// Import libraries we need
import React, {Component} from 'react'
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} from 'react-native'

// Get components from other files
import TruckList from './utilities/truckList.ios.js'

// Create a react component
var FoodTrucks = React.createClass({
  render() {
    return (
      <NavigatorIOS style={styles.container} initialRoute={{ title: 'Truck List', component: TruckList }}/>
    );
  },
})


// Style the React component
var styles = StyleSheet.create({
  container: {
    flex: 1, // fill the entire screen
  },
});

// Futura-CondensedExtraBold
// Futura-CondensedExtraBold
// Futura-CondensedExtraBold
// GillSans-UltraBold

// Show the react component on the screen
AppRegistry.registerComponent('FoodTruckReact', () => FoodTrucks)