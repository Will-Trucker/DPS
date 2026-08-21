import {
    ImageBackground,
    Text,
    View,
    StyleSheet
} from "react-native";

interface Props {
    title: string;
    subtitle: string;
}

export function Header({title, subtitle}: Props) {
    return(
    <ImageBackground
      source={require('../assets/img/bg.jpg')}
      style={styles.hero}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      </View>
    </ImageBackground>
    );
}

const styles = StyleSheet.create({
  hero: {
    height: 250,
    justifyContent: 'flex-end',
  },

  overlay: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 20,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
  },
});