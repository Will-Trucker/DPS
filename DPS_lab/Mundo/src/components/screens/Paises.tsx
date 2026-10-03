import { createStackNavigator } from 'expo-router/js-stack';

import DetallePais from './DetallePais';
import ListaPaises from './ListaPaises';

import type { PaisesStackParamList } from '../../types/types';

const Stack = createStackNavigator<PaisesStackParamList>();

const Paises = () => {
  return (
    <Stack.Navigator initialRouteName="ListaPaises">
      <Stack.Screen
        name="ListaPaises"
        component={ListaPaises}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DetallePais"
        component={DetallePais}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Paises;