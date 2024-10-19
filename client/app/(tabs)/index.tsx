import React, { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [luminance, setLuminance] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState(`rgb(0, 0, 0)`);
  const [textColor, setTextColor] = useState('white');

  useEffect(() => {
    const loadStoredColors = async () => {
      try {
        const storedRed = await AsyncStorage.getItem('red');
        const storedGreen = await AsyncStorage.getItem('green');
        const storedBlue = await AsyncStorage.getItem('blue');

        if (storedRed !== null && storedGreen !== null && storedBlue !== null) {
          setRed(parseInt(storedRed));
          setGreen(parseInt(storedGreen));
          setBlue(parseInt(storedBlue));
          setBackgroundColor(`rgb(${storedRed}, ${storedGreen}, ${storedBlue})`);
        }
      } catch (error) {
        console.log('Error', error);
      }
    };

    loadStoredColors();
  }, []);

  useEffect(() => {
    const saveColors = async () => {
      try {
        await AsyncStorage.setItem('red', red.toString());
        await AsyncStorage.setItem('green', green.toString());
        await AsyncStorage.setItem('blue', blue.toString());
      } catch (error) {
        console.log('Error saving colors:', error);
      }
    };

    saveColors();
  }, [red, green, blue]);

  useEffect(() => {
    const newBackgroundColor = `rgb(${red}, ${green}, ${blue})`;
    setBackgroundColor(newBackgroundColor);

    const luminanceValue = calculateLuminance();
    setLuminance(luminanceValue);
    if (luminanceValue < 50) {
      setTextColor('white');
    } else {
      setTextColor('black');
    }
  }, [red, green, blue]);

  const sRGBtoLin = (color: number) => {
    if (color <= 0.04045) {
      return color / 12.92;
    } else {
      return Math.pow((color + 0.055) / 1.055, 2.4);
    }
  };

  const YtoLstar = (Y: number) => {
    if (Y <= 216 / 24389) {
      return Y * (24389 / 27);
    } else {
      return Math.pow(Y, 1 / 3) * 116 - 16;
    }
  };

  const calculateLuminance = () => {
    const r = red / 255;
    const g = green / 255;
    const b = blue / 255;

    const Y = 0.2126 * sRGBtoLin(r) + 0.7152 * sRGBtoLin(g) + 0.0722 * sRGBtoLin(b);

    const LStar = YtoLstar(Y);
    return LStar;
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.innerContainer}>
        <Text style={[styles.text, { color: textColor }]}>Adjust the sliders to change background color</Text>

        <Text style={[styles.rgbText, { color: textColor }]}>Red: {red}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          value={red}
          onValueChange={value => setRed(Math.round(value))}
          minimumTrackTintColor="red"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="red"
        />

        <Text style={[styles.rgbText, { color: textColor }]}>Green: {green}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          value={green}
          onValueChange={value => setGreen(Math.round(value))}
          minimumTrackTintColor="green"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="green"
        />

        <Text style={[styles.rgbText, { color: textColor }]}>Blue: {blue}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          value={blue}
          onValueChange={value => setBlue(Math.round(value))}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="blue"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  rgbText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 10,
  },
});
