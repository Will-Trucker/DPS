import {Stack} from 'expo-router';

export default function RootLayout(): React.JSX.Element {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="registro" />
            <Stack.Screen name="citas" />
            <Stack.Screen name="formulario-cita" />
        </Stack>
    );
}