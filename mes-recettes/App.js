import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from "./src/redux/store";
import RecipesListScreen from "./src/components/RecipesEpic/RecipesListScreen";
import RecipesDetailsScreen from "./src/components/RecipesEpic/RecipeDetailsScreen";

const Stack = createStackNavigator();


export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Recipes List">
            <Stack.Screen name="Recipes List" component={RecipesListScreen} />
            <Stack.Screen name="Recipe Details" component={RecipesDetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}
