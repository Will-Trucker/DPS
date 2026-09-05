import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import LoadingScreen from './src/screens/LoadingScreen';
import FiveRScreen from './src/screens/FiveRScren';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <StatusBar style="dark" />
      {isLoading ? (
        <LoadingScreen onFinish={() => setIsLoading(false)} />
      ) : (
        <FiveRScreen />
      )}
    </>
  );
};

export default App;