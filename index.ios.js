// Import libraries we need
import React, {Component} from 'react'
import {
  AppRegistry,
  Dimensions,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight
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
    var windowHeight = Dimensions.get('window').height;
    var navBarTitle = windowHeight/18;
    var navBarBack = windowHeight/24;
    console.log("Nav bar title", navBarTitle);
    return (
      <Navigator
        configureScene={ this.configureScene }
        style={ styles.container }
        initialRoute={{ title: 'Truck List'}}
        renderScene={ this.renderScene }
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
                {
                  if (route.title === 'Truck List') {
                    return null;
                  } else {
                    return (
                      <TouchableHighlight onPress={() => navigator.pop()}>
                        <Text style={{fontSize: navBarBack, textAlign: 'center'}}>&lt;</Text>
                      </TouchableHighlight>
                    );
                  }
                },
              // THIS IS WHERE YOU WOULD CONFIGURE THE RIGHT BUTTON IN THE NAV BAR
              RightButton: (route, navigator, index, navState) =>
                { return null; },
              //   { return (<Text style={{fontFamily: 'Futura-CondensedExtraBold'}}>Done</Text>); },
              Title: (route, navigator, index, navState) =>
                { return (<Text style={{fontFamily: 'PartyLetPlain', color: 'white', fontSize: navBarTitle}}>Food Trucks</Text>); },
            }}
            style={{backgroundColor: '#FC5441', borderBottomWidth: .5, borderBottomColor: 'black'}}
          />
        }
      />
    );
  },
})

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => { if (index > 0) { navigator.pop() } }}>
          <Text style={ styles.leftNavButtonText }>Back</Text>
        </TouchableHighlight>)
    }
    else { return null }
  }
}


// Style the React component
var styles = StyleSheet.create({
  container: {
    flex: 1, // fill the entire screen
  },
});

// Show the react component on the screen
AppRegistry.registerComponent('FoodTruckReact', () => FoodTrucks)