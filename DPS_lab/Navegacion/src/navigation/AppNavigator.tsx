// import {NavigationContainer} from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import HomeScreen from '../HomeScreen';
// import DetailsScreen from '../DetailsScreen';
// import type {RootStackParamList} from '../navigation/type';

//const Drawer = createDrawerNavigator<RootStackParamList>();

import { Text } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createDrawerNavigator } from '@react-navigation/drawer';//Para ejercicio #1 
import HomeScreen from '../HomeScreen'; 
import DetailsScreen from '../DetailsScreen'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RootStackParamList } from '../navigation/type'; 
 
const Tab = createBottomTabNavigator<RootStackParamList>(); 

function AppNavigator(){
    return (
        // <NavigationContainer>
        //     <Drawer.Navigator initialRouteName="Home">
        //         <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        //         <Drawer.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalles' }} />
        //     </Drawer.Navigator>
        // </NavigationContainer>
        <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Inicio',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>🏠</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'Detalles',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>ℹ️</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    );
}

export default AppNavigator;