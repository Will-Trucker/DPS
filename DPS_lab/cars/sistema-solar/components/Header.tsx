import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const Header = () => {
  return (
    <ImageBackground
      source={{
        uri: 'https://images-assets.nasa.gov/image/PIA23122/PIA23122~orig.jpg',
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Explora el Sistema Solar</Text>
        <Text style={styles.subtitle}>
          Descubre los planetas, sus características y curiosidades
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: 'auto',
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(10, 14, 35, 0.55)',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 13,
    color: '#E0E0E0',
    marginTop: 4,
  },
});

export default Header;
