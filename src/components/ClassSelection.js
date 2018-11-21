import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';

const { height, width } = Dimensions.get('window');

export default class ClassSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      classButtonPosition: new Animated.Value(15 + width * 0.1),
    };
  }

  _onClassChange = className => {
    switch (className) {
      case 'superior':
        Animated.timing(this.state.classButtonPosition, {
          toValue: width * 0.77,
          duration: 500,
        }).start();
        break;
      case 'special':
        Animated.timing(this.state.classButtonPosition, {
          toValue: width * 0.5 - 20,
          duration: 500,
        }).start();
        break;
      case 'economy':
        Animated.timing(this.state.classButtonPosition, {
          toValue: 15 + width * 0.1,
          duration: 500,
        }).start();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.classBar}></View>

        <Animated.View style={[styles.classButton, { left: this.state.classButtonPosition }]}>
          <Image
            style={styles.classButtonImage}
            source={require('../../assets/img/class.png')} />
        </Animated.View>

        <TouchableOpacity
          style={[
            styles.classButtonContainer,
            {
              width: width / 3 - 10,
              left: width * 0.11,
            }
          ]}
          onPress={this._onClassChange}
        >
          <Text style={styles.classLabel}>economy</Text>        
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.classButtonContainer,
            {
              width: width / 3,
              left: width / 3,
            }
          ]}
          onPress={this._onClassChange}
        >
          <Text style={[
            styles.classLabel,
            {
              textAlign: 'center'
            }
          ]}>special</Text>        
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.classButtonContainer,
            {
              width: width / 3,
              right: width * 0.11,
            }
          ]}
          onPress={this._onClassChange}
        >
          <Text style={[
            styles.classLabel,
            {
              textAlign: 'right'
            }
          ]}>superior</Text>        
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 10,
  },
  classBar: {
    top: 50,
    height: 5,
    width: width * 0.65,
    left: width * 0.15,
    resizeMode: 'contain',
    backgroundColor: 'black',
  },
  classButton: {
    top: 30,
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    position: 'absolute',
    backgroundColor: 'white',
    height: 40,
    width: 40,
  },
  classButtonImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 30,
  },
  classButtonContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    height: 70,
    top: 10,
  },
  classLabel: {
    paddingTop: 5,
    fontSize: 12,
  }
});