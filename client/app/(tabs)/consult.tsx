import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

interface Survey {
  name: string;
  cal: number;
}

export default function SurveyResultsScreen() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [averageCal, setAverageCal] = useState(0);

  const loadSurveyData = async () => {
    try {
      const storedSurveys = await AsyncStorage.getItem('Registro de examenes'); // Usar la misma clave
      const surveys: Survey[] = storedSurveys ? JSON.parse(storedSurveys) : [];
      setSurveys(surveys);

      if (surveys.length > 0) {
        const totalCal = surveys.reduce((acc: number, survey: Survey) => acc + survey.cal, 0);
        setAverageCal(totalCal / surveys.length);
      } else {
        setAverageCal(0); // Si no hay datos, se resetea a 0.
      }
    } catch (error) {
      console.log('Error al cargar los datos de la encuesta:', error);
    }
  };

  // Cargar los datos al montar el componente.
  useEffect(() => {
    loadSurveyData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultados de Exámenes</Text>
      <Text style={styles.text}>Calificación promedio: {averageCal.toFixed(2)}</Text>

      <FlatList
        data={surveys}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.surveyItem}>
            <Text>Nombre: {item.name}</Text>
            <Text>Calificación: {item.cal}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={loadSurveyData}>
        <Text style={styles.buttonText}>Refrescar Datos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FF0000' }]}
        onPress={async () => {
          await AsyncStorage.removeItem('Registro de examenes'); // Usar la misma clave
          setSurveys([]);
          setAverageCal(0); // Resetea el promedio
        }}
      >
        <Text style={styles.buttonText}>Eliminar Datos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 50, // Añadimos un espacio en la parte superior
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  surveyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
