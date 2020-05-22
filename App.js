import React from 'react';

import FoodList from './Screens/foodList.js';
import ShoppingList from './Screens/shoppingList';
import FoodDetails from './Screens/foodDetails';
import AddFood from './Screens/addFood.js';

import { NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();

export default function App() {
  
  const createHomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Foods List" 
          component={ FoodList }
          options={{
            title:"Food List",
            headerShown:false
          }}
          />
        <Stack.Screen 
          name="Food Details"
          component={ FoodDetails }
          options={{
            title:"Food Details",
            headerShown:false
          }}
        />
        <Stack.Screen 
          name="Add Food" 
          component={ AddFood }
          options={{
            title:"Add New Food",
            headerShown:false
          }}
        />
        <Stack.Screen 
          name="Shopping List" 
          component={ ShoppingList }
          options={{
            title:"Shopping List",
            headerShown:false
          }}
        /> 
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Foods List" children={ createHomeStack }/>
        <Drawer.Screen name="Shopping List" component={ ShoppingList }/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


