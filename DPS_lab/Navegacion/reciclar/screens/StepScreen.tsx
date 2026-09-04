import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

interface StepScreenProps {
    step: number;
    description: string;
    onNextStep: () => void;
}

const StepScreen = ({step, description, onNextStep}: StepScreenProps) => {
    return (
    <View style={styles.container}>
      <Text style={styles.stepText}>Paso {step}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
      <Button title="Siguiente" onPress={onNextStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  stepText: {
    fontSize: 24,
    marginBottom: 10,
  },
  descriptionText: {
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default StepScreen;