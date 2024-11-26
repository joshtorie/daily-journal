import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import JournalScreen from './src/screens/JournalScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Voice Journal',
            headerStyle: {
              backgroundColor: '#6B46C1',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Journal" 
          component={JournalScreen}
          options={{
            title: 'Journal Entries',
            headerStyle: {
              backgroundColor: '#6B46C1',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}