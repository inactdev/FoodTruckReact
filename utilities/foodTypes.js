// Import libraries we need
import React, {Component} from 'react'
import {
  StyleSheet,
  Text
} from 'react-native'

// Create a React component
var FoodType = React.createClass({
  render() {
    return (
      <Text style={styles.food_type}>
        {this.props.food_type}
      </Text>
    );
  }
});

// Style the component
var styles = StyleSheet.create({
  food_type: {
    fontSize: 18,
    color: '#0000FF'
  }
});

// Make this available elsewhere
module.exports = FoodType;