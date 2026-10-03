import { createStackNavigator } from 'expo-router/js-stack';
import Detalle from './DetalleMaravillas';
import MaravillasList from './ListaMaravillas';
import type { MaravillasStackParamList } from '../../types/types';

const Stack = createStackNavigator<MaravillasStackParamList>();

const Maravillas = () => {
  return (
    <Stack.Navigator initialRouteName="Maravillas">
      <Stack.Screen name="Maravillas" component={MaravillasList} options={{ headerShown: false }} />
      <Stack.Screen name="Consejos" component={Detalle} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Maravillas;
