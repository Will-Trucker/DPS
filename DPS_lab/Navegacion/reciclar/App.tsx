import 'react-native-gesture-handler'; // ¡debe ir primero! (requerido por @react-navigation/stack)
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StepsScreen from './screens/StepsScreen2';

const App = () => {
  const steps = [
    { step: 1, description: 'Separa los materiales reciclables del resto de la basura.' },
    { step: 2, description: 'Lava los envases antes de reciclarlos.' },
    { step: 3, description: 'Identifica los contenedores de reciclaje de tu área.' },
    { step: 4, description: 'Coloca los materiales reciclables en los contenedores correspondientes.' },
  ];

  const Stack = createStackNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Pasos de Reciclaje">
            {(props) => <StepsScreen {...props} steps={steps} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
