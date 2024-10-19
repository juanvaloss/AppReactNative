import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

export default function SurveyScreen() {
  const [name, setName] = useState('');
  const [cal, setCal] = useState('');

  const saveSurveyData = async () => {
    try {
      const surveyData = {
        name,
        cal: parseInt(cal),
      };
      const storedSurveys = await AsyncStorage.getItem('Registro de examenes');
      let surveys = storedSurveys ? JSON.parse(storedSurveys) : [];
      surveys.push(surveyData);

      await AsyncStorage.setItem('Registro de examenes', JSON.stringify(surveys));

      setName('');
      setCal('');

      alert('Datos guardados con éxito');
    } catch (error) {
      console.log('Error al guardar los datos de la encuesta:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6200EA" barStyle="light-content" />
      <Text style={styles.title}>Registro de Calificaciones</Text>
      <Text style={styles.subtitle}>Ingresa los datos del alumno y su calificación</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Alumno"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Calificación"
        value={cal}
        keyboardType="numeric"
        onChangeText={setCal}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={saveSurveyData}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F7F6F2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#6200EA',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: '#6200EA',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
