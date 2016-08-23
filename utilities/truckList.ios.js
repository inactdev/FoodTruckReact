// Import libraries we need
import React, {Component} from 'react'
import {
  AppRegistry,
  Dimensions,
  MapView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import _ from 'lodash';

// Get components from other files
import Api from './api.js'
import Truck from './truck.ios.js'

// Create a react component
var TruckList = React.createClass({
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
            latitudeDelta: .2,
            longitudeDelta: .2
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
            latitudeDelta: .2,
            longitudeDelta: .2
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
    var windowWidth = Dimensions.get('window').width;
    var noTrucksFontSize = windowWidth/12;
    var navigator = this.props.navigator;

    this.state.vendors.forEach(function(vendor){
      rows.push(<FoodTruckListView vendor={vendor} key={vendor.name} navigator={navigator}/>);
      vendorPin = {
        latitude: vendor.latitude,
        longitude: vendor.longitude,
        title: vendor.name,
        animateDrop: true,
      }
      vendorPins.push(vendorPin);
    });

    if (rows.length == 0) {
      lowerBoxDisplay = <View style={[styles.noTextView, {width: windowWidth}]}><Text style={[styles.noTrucksText, {fontSize: noTrucksFontSize}, {fontFamily: 'Chalkduster'}]}>No Trucks Found :(</Text></View>;
    } else {
      lowerBoxDisplay = <ScrollView style={styles.scrollView}>{rows}</ScrollView>;
    }
    return (
      <View style={[styles.container, this.border('yellow')]}>
        {this.mapView(vendorPins)}
        <View style={[styles.bottom, this.border('blue')]}>
          {lowerBoxDisplay}
        </View>
      </View>
    );
  },
  mapView(vendorPins) {
    return(
      <View style={[styles.top, {borderColor: 'black'}, {borderWidth: 1}]}>
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
      // borderColor: color,
      // borderWidth: 4,
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
  goToVendor(vendor){
    this.props.navigator.push({
      title: 'Truck',
      component: Truck,
      passProps: {vendor: vendor},
    });
  },
  render(){
    var vendorLat = this.props.vendor.latitude
    var vendorLong = this.props.vendor.longitude
    var windowHeight = Dimensions.get('window').height;
    var truckTileHeight = windowHeight/8
    var truckNameFontSize = windowHeight/28
    var truckFoodTypeFontSize = windowHeight/42

    return(
      <TouchableHighlight style={styles.buttonContainer} onPress={() => this.goToVendor(this.props.vendor)}>
        <View style={[this.border('red'), this.tileSize(truckTileHeight), styles.foodTruckListItem]}>
          <View style={[this.textBorder(), styles.foodTruckListItemInfo]}>
            <View style={[this.textBorder(), styles.foodTruckListItemHeader]}>
              <Text style={[this.textBorder(), styles.foodTruckNameText, {fontSize: truckNameFontSize, fontWeight: 'bold'}]}>
                {this.props.vendor.name}
              </Text>
              <Text style={[this.textBorder(), styles.foodTruckDistanceText]}>
                13 mi
              </Text>
            </View>
            <View style={[this.textBorder(), styles.foodTruckListItemFooter]}>
              <Text style={[this.textBorder(), styles.foodTruckTypeText, {fontSize: truckFoodTypeFontSize, fontWeight: 'bold'}]}>
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
              region={{latitude: vendorLat, longitude: vendorLong, latitudeDelta: .2, longitudeDelta: .2}}
              scrollEnabled={false}
              showsUserLocation={true}
              style={styles.foodTruckMap}
              zoomEnabled={false}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
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
    alignItems: `stretch`,
    backgroundColor: '#FAFF9B'
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
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  scrollView: {
    flex: 1,
  }
});

// Futura-CondensedExtraBold
// Futura-CondensedExtraBold
// Futura-CondensedExtraBold
// GillSans-UltraBold

// Show the react component on the screen

module.exports = TruckList;