// Import libraries we need
import React, {Component} from 'react'
import {
  AppRegistry,
  MapView,
  StyleSheet,
  Text,
  View
} from 'react-native'

// Get components from other files
import FoodType from './utilities/foodTypes.js'
import Api from './utilities/api.js'

var FOODTYPES = ['Dominican', 'American', 'Italian', 'Chinese', 'Mexican']

// Create a react component
var FoodTrucks = React.createClass({
  getInitialState() {
    return {
      pin: {
        latitude: 0,
        longitude: 0,
      },
      vendors: [],
    };
  },
  render() {
    console.log("Vendor", this.state.vendors);
    var rows = [];

    this.state.vendors.forEach(function(vendor){
      rows.push(<FoodTruckListView vendor={vendor} key={vendor.name} />);
    });
    return (
      <View style={[styles.container, this.border('yellow')]}>
        {this.mapView()}
        <View style={[styles.bottom, this.border('blue')]}>
          {rows}
        </View>
      </View>
    );
  },
  mapView() {
    return(
      <View style={[styles.top, this.border('green')]}>
        <MapView
          annotations={[this.state.pin]}
          onRegionChangeComplete={this.onRegionChangeComplete}
          style={styles.map}
        />
      </View>
    );
  },
  onRegionChangeComplete(region) {
    this.setState({
      pin: {
        latitude: region.latitude,
        longitude: region.longitude
      },
    })

    Api(region.latitude, region.longitude)
    .then((response) => {
      this.setState({
        vendors: response.vendors
      });
    });
  },
  border(color){
    return {
      borderColor: color,
      borderWidth: 4,
    }
  },
  textBorder(){
    return {
      borderColor: 'black',
      borderWidth: 1,
    }
  },
});

var FoodTruckListView = React.createClass({
  render(){
    return(
      <View style={[this.border('red'), styles.foodTruckListItem]}>
        <View style={[this.textBorder(), styles.foodTruckListItemInfo]}>
          <View style={[this.textBorder(), styles.foodTruckListItemHeader]}>
            <Text style={[this.textBorder(), styles.foodTruckNameText]}>
              {this.props.vendor.name}
            </Text>
            <Text style={[this.textBorder(), styles.foodTruckDistanceText]}>
              13 mi
            </Text>
          </View>
          <View style={[this.textBorder(), styles.foodTruckListItemFooter]}>
            <Text style={[this.textBorder(), styles.foodTruckTypeText]}>
              {this.props.vendor.food_type}
            </Text>
            <Text style={[this.textBorder(), styles.foodTruckDescriptionText]}>
              {this.props.vendor.description}
            </Text>
          </View>
        </View>
        <View style={[this.textBorder(), styles.foodTruckListItemMap]}>
          <MapView
            style={styles.foodTruckMap}
          />
        </View>
      </View>
    );
  },
  border(color){
    return {
      borderColor: color,
      borderWidth: 4,
    }
  },
  textBorder(){
    return {
      borderColor: 'black',
      borderWidth: 1,
    }
  },

})


// Style the React component
var styles = StyleSheet.create({
  container: {
    flex: 1, // fill the entire screen
    alignItems: `stretch`,
  },
  map: {
    flex: 1,
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
    flex: 2,
  },
  foodTruckNameText: {
    flex: 4
  },
  foodTruckDistanceText: {
    flex: 1,
    textAlign: 'right'
  },
  foodTruckTypeText: {
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
    flexDirection: 'row'
  }
});

// Show the react component on the screen
AppRegistry.registerComponent('FoodTruckReact', () => FoodTrucks)