// Import libraries we need
import React, {Component} from 'react'
import {
  AppRegistry,
  Navigator,
  StyleSheet,
} from 'react-native'

// Get components from other files
import TruckList from './utilities/truckList.ios.js'
import Truck from './utilities/truck.ios.js'

// Create a react component
var FoodTrucks = React.createClass({
  configureScene(route, routeStack){
   return Navigator.SceneConfigs.FloatFromRight
  },
  renderScene(route, navigator) {
    if(route.title === 'Truck List') {
      return <TruckList navigator={navigator} {...route.passProps} />
    }
    if(route.title === 'Truck') {
      return <Truck navigator={navigator} {...route.passProps} />
    }
  },
  render() {
    return (
      <Navigator
        configureScene={ this.configureScene }
        style={styles.container}
        initialRoute={{ title: 'Truck List'}}
        renderScene={ this.renderScene }/>
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