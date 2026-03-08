import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import IngredientSelectionScreen from './src/screens/IngredientSelectionScreen';
import RecipeListScreen from './src/screens/RecipeListScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="IngredientSelection"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FF6B6B',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="IngredientSelection" 
          component={IngredientSelectionScreen} 
          options={{ title: 'Evimde Ne Var?' }} 
        />
        <Stack.Screen 
          name="RecipeList" 
          component={RecipeListScreen} 
          options={{ title: 'Sizin İçin Tarifler' }} 
        />
        <Stack.Screen 
          name="RecipeDetail" 
          component={RecipeDetailScreen} 
          options={({ route }) => ({ title: route.params.recipe.name })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
