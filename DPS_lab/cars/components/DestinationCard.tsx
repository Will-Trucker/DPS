import {
    View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  Dimensions,
} from "react-native";
import {Destination} from "../types/Destination";

interface Props {
    destination: Destination;
}

const {width} = Dimensions.get("window");

const CARD_WIDTH = (width - 48) / 2;

export function DestinationCard({destination}:Props){
    return(
        <Pressable
      style={styles.card}
      onPress={() => {
        Alert.alert(destination.title, `Ubicación: ${destination.location}`);
      }}
    >
      <Image source={destination.image} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{destination.title}</Text>

        <Text style={styles.location}>📍 {destination.location}</Text>
      </View>
    </Pressable>
    );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,

    elevation: 4,
  },

  image: {
    width: "100%",
    height: 120,
  },

  content: {
    padding: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
  },

  location: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },
});