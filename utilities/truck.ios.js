// Import libraries we need
import React, {Component} from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

// Create a react component
var Truck = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.vendor.name}</Text>
      </View>
    )
  }
})


// Style the React component
var styles = StyleSheet.create({
  container: {
    flex: 1, // fill the entire screen
    flexDirection: 'row',
    alignItems: 'center',
  },
});

module.exports = Truck;
