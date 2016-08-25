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
      <View style={[this.border('red'), styles.foodTruckListItem]}>
        <View style={[this.textBorder(), styles.foodTruckListItemInfo]}>
          <View style={[this.textBorder(), styles.foodTruckListItemHeader]}>
            <Text style={[this.textBorder(), styles.foodTruckNameText, {fontWeight: 'bold'}]}>
              {this.props.vendor.name}
            </Text>
            <Text style={[this.textBorder(), styles.foodTruckDistanceText]}>
              13 mi
            </Text>
          </View>
          <View style={[this.textBorder(), styles.foodTruckListItemFooter]}>
            <Text style={[this.textBorder(), styles.foodTruckTypeText, {fontWeight: 'bold'}]}>
              {this.props.vendor.food_type}
            </Text>
            <Text style={[this.textBorder(), styles.foodTruckDescriptionText]}>
              {this.props.vendor.description}
            </Text>
          </View>
        </View>
      </View>
    )
  },
  border(color){
    return {
      // borderColor: color,
      // borderWidth: 4,
    }
  },
  textBorder(){
    return {
      // borderColor: 'black',
      // borderWidth: 1,
    }
  },
  tileSize(height) {
    return {
      height: height,
    }
  },
})


// Style the React component
var styles = StyleSheet.create({
  container: {
    flex: 1, // fill the entire screen
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  noTrucksText: {
    color: '#FC5441',
    textAlign: 'center'
  },
  noTextView: {
    flex: 1, // fill the entire screen
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  foodTruckMap: {
    flex: 1,
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 1,
  },
  foodTruck: {
    flex: 1,
  },
  foodTruckDescriptionText: {
    color: '#FC5441',
    fontFamily: 'Chalkduster',
    flex: 2,
  },
  foodTruckNameText: {
    color: '#FC5441',
    fontFamily: 'Chalkduster',
    flex: 4
  },
  foodTruckDistanceText: {
    color: '#FC5441',
    fontFamily: 'Copperplate-Bold',
    flex: 1,
    textAlign: 'right'
  },
  foodTruckTypeText: {
    color: '#FC5441',
    fontFamily: 'Chalkduster',
    flex: 2
  },
  foodTruckListItemHeader:{
    flex: 1,
    flexDirection: 'row'
  },
  foodTruckListItemFooter:{
    flex: 1
  },
  foodTruckListItemMap: {
    flex: 1
  },
  foodTruckListItemInfo: {
    flex: 4
  },
  foodTruckListItem: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingTop: 100,
  },
  scrollView: {
    flex: 1,
  }
});

module.exports = Truck;
