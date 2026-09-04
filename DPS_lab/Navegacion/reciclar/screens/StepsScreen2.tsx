import React from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import StepScreen from './StepScreen';

interface Step {
  step: number;
  description: string;
}

interface StepsScreen2Props {
  steps: Step[];
  navigation: NavigationProp<ParamListBase>;
}

const StepsScreen2 = ({ steps, navigation }: StepsScreen2Props) => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Si estamos en el último paso, podemos navegar a otra pantalla o reiniciar los pasos
      navigation.navigate('Inicio'); // Esto es solo un ejemplo, puedes cambiarlo según tu flujo de la aplicación
    }
  };

  return (
    <StepScreen
      step={steps[currentStep].step}
      description={steps[currentStep].description}
      onNextStep={handleNextStep}
    />
  );
};

export default StepsScreen2;
