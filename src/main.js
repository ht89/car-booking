import React from 'react';
import { View, Animated, Image, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import GeoCoder from 'react-native-geocoder';

// components
import LocationPin from './components/LocationPin';
import LocationSearch from './components/LocationSearch';
import ClassSelection from './components/ClassSelection';
// import ConfirmationModal from './components/ConfirmationModal';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.initialRegion = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0092, 
      longitudeDelta: 0.00421,
    };

    this.state = {
      position: null,
      carLocations: [
        {
          rotation: 78,
          latitude: 37.78725,
          longitude: -122.4318,
        },
        {
          rotation: -10,
          latitude: 37.79015,
          longitude: -122.4318,
        },
        {
          rotation: 262,
          latitude: 37.78725,
          longitude: -122.4348,
        }
      ]
    }
  }

  componentDidMount() {
    this._onRegionChange(this.initialRegion);
  }

  _onRegionChange = region => {
    this.setState({ position: null });

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(async() => {
      try {
        const res = await GeoCoder.geocodePosition({
          lat: region.latitude,
          lng: region.longitude
        });

        this.setState({ position: res[0] });
      } catch (err) {
        console.log(err);
      }
    }, 2000);
  }

  _onBookingRequest = () => {
    this.setState({
      confirmationModalVisible: true,
    });
  }  

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView  
          style={styles.fullScreenMap}
          initialRegion={this.initialRegion}
          onRegionChange={this.onRegionChange}
        />

        {this.state.carLocations.map((carLocation, i) => (
          <MapView.Marker 
            key={i}
            coordinate={carLocation}>

            <Animated.Image 
              style={{
                transform: [
                  { rotate: `${carLocation.rotation}deg` }
                ]
              }}
              source={require('../assets/img/car.png')} />
          </MapView.Marker>
        ))}

        <LocationSearch 
          value={this.state.position && (this.state.position.feature || this.state.position.formattedAddress)}
        />

        <LocationPin 
          onPress={this._onBookingRequest}
        />

        <ClassSelection />

        {/*<ConfirmationModal 
          visible={this.state.confirmationModalVisible}
          onClose={() => this.setState({ confirmationModalVisible: false })}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreenMap: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});