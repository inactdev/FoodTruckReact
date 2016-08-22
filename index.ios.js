// Import libraries we need
import React, {Component} from 'react'
import {
  AppRegistry,
  MapView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import _ from 'lodash';

// Get components from other files
import Api from './utilities/api.js'

// Create a react component
var FoodTrucks = React.createClass({
  getInitialState() {
    return {
      searchArea: {
        latitude: 0,
        longitude: 0,
      },
      coordinates: {
        southwestPoint: [0, 0],
        northeastPoint: [0, 0]
      },
      vendors: [],
      positionAquired: false,
    };
  },
  getInitialPosition(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          searchArea: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 5,
            longitudeDelta: 5
          },
          pin: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            title: 'You',
            tintColor: MapView.PinColors.RED,
          },
          positionAquired: true
        });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  },
  getPosition(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          searchArea: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 5,
            longitudeDelta: 5
          },
          positionAquired: true
        });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  },
  componentDidMount() {
    this.getInitialPosition()
  },
  render() {
    console.log("Vendor", this.state.vendors);
    var rows = [];
    var vendorPins = [];

    this.state.vendors.forEach(function(vendor){
      rows.push(<FoodTruckListView vendor={vendor} key={vendor.name} />);
      vendorPin = {
        latitude: vendor.latitude,
        longitude: vendor.longitude,
        title: vendor.name,
        animateDrop: true,
      }
      // TODO add more vendors to see if this array works with multiple
      vendorPins.push(vendorPin);
    });
    return (
      <View style={[styles.container, this.border('yellow')]}>
        {this.mapView(vendorPins)}
        <View style={[styles.bottom, this.border('blue')]}>
          {rows}
        </View>
      </View>
    );
  },
  mapView(vendorPins) {
    console.log("Vendor Pins", vendorPins)
    return(
      <View style={[styles.top, this.border('green')]}>
        {this.state.positionAquired ?
          <MapView
            annotations={vendorPins}
            onRegionChangeComplete={_.debounce(this.onRegionChangeComplete, 2000)}
            region={this.state.searchArea}
            showsUserLocation={true}
            style={styles.map}
          /> :
          <Text>Loading...</Text>
        }
      </View>
    );
  },
  onRegionChangeComplete(region) {
    this.setState({
      searchArea: {
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta
      },
      coordinates: {
        southwestPoint: [(region.latitude - (region.latitudeDelta/2)), (region.longitude - (region.longitudeDelta/2))],
        northeastPoint: [(region.latitude + (region.latitudeDelta/2)), (region.longitude + (region.longitudeDelta/2))]
      },
    })
    Api(this.state.coordinates.southwestPoint, this.state.coordinates.northeastPoint)
    .then((response) => {
      this.setState({
        vendors: response.vendors
      })
    })
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
      vendorLat = this.props.vendor.latitude
      vendorLong = this.props.vendor.longitude
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
            annotations={[{latitude: vendorLat, longitude: vendorLong}]}
            region={{latitude: vendorLat, longitude: vendorLong}}
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