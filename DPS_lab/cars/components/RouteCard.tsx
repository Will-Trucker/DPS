import {
    View,
    Text,
    ImageBackground,
    StyleSheet
} from "react-native";

import {Route} from "../types/Route";

interface Props {
    route: Route;
}

export function RouteCard({route}: Props){
    return(
        <ImageBackground
      source={route.image}
      style={styles.card}
      imageStyle={styles.image}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>
          {route.name}
        </Text>

        <Text style={styles.description}>
          {route.description}
        </Text>
      </View>
    </ImageBackground>
    );
}


const styles = StyleSheet.create({
  card: {
    height: 200,
    marginHorizontal: 15,
    marginBottom: 15,
    justifyContent: 'flex-end',
  },

  image: {
    borderRadius: 16,
  },

  overlay: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    padding: 15,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  description: {
    color: '#F3F4F6',
    fontSize: 14,
    lineHeight: 20,
  },
});