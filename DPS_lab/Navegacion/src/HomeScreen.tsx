import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { RootStackParamList } from './navigation/type';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
type Props = BottomTabScreenProps<RootStackParamList, 'Home'>;

// Definir el array de imágenes
const images = [
  {
    id: 1,
    source: 'https://img.freepik.com/vector-gratis/seminario-web-concepto-ecologia-diseno-plano_23-2149849805.jpg',
    description: 'Reduce, Reutiliza, Recicla',
    info: 'Descubre cómo puedes contribuir al cuidado del medio ambiente con simples acciones en tu hogar.'
  },
  {
    id: 2,
    source: 'https://img.freepik.com/vector-gratis/ninos-plantando-arboles-utilizando-energia-renovable-naturaleza-energia-solar-panel-solar-turbina-eolica_1150-43076.jpg',
    description: 'Reciclaje en tu Comunidad',
    info: 'Conoce programas de reciclaje en tu área y participa activamente para mejorar tu entorno.'
  },
];

function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bannerTitle}>Bienvenido a Reciclaje Eco</Text>
        <Text style={styles.bannerText}>Ayudamos a cuidar el medio ambiente a través del reciclaje. ¡Únete a nosotros!</Text>
        <Button title="Ir a Detalles" onPress={() => navigation.navigate('Details')} />
      </View>
      <View style={styles.featured}>
        <Text style={styles.featuredTitle}>Destacado</Text>
        {images.map(image => (
          <TouchableOpacity key={image.id} style={styles.featuredItem}>
            <Image source={{ uri: image.source }} style={styles.featuredImage} />
            <Text style={styles.featuredItemTitle}>{image.description}</Text>
            <Text style={styles.featuredItemText}>{image.info}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { padding: 20, backgroundColor: '#CEFF25' },
  bannerTitle: { fontSize: 24, fontWeight: 'bold', color: '#000000' },
  bannerText: { fontSize: 16, color: '#000000' },
  bannerButton: { backgroundColor: '#ffff00', fontSize: 16, color: '#000000' },
  featured: { padding: 20 },
  featuredTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  featuredItem: { marginBottom: 20 },
  featuredImage: { width: '100%', height: 200, marginBottom: 10 },
  featuredItemTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  featuredItemText: { fontSize: 16 },
});

export default HomeScreen;
