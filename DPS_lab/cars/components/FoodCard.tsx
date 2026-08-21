import {
    View,
    Text,
    Image,
    StyleSheet
} from "react-native";

import {Food} from "../types/Food";

interface Props {
    food: Food;
}

export function FoodCard({food}:Props){
    return(
        <View style={styles.card}>
      <Image
        source={food.image}
        style={styles.image}
      />

      <Text style={styles.title}>
        {food.title}
      </Text>
    </View>
    );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    marginRight: 15,
  },

  image: {
    width: 140,
    height: 140,
    borderRadius: 16,
  },

  title: {
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
});

