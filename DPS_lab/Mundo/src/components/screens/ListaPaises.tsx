import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ListRenderItem,
} from "react-native";
import type { ListaPaisesProps, Pais } from "../../types/types";

const windowWidth = Dimensions.get("window").width;

const ListaPaises = ({ navigation }: ListaPaisesProps) => {
  // El estado se tipa con el arreglo de países que devuelve la API.
  const [countries, setCountries] = useState<Pais[]>([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://65f9be823909a9a65b1942ac.mockapi.io/paises",
      );
      const data: Pais[] = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  // ListRenderItem<Pais> tipa el parámetro item de forma automática.
  const renderItem: ListRenderItem<Pais> = ({ item }) => (
    <TouchableOpacity
      style={styles.countryCard}
      onPress={() => navigation.navigate("DetallePais", { country: item })}>
      <View style={styles.countryInfo}>
        <Image
  source={{
    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1920px-Flag_of_Argentina.svg.png",
  }}
  style={styles.flagImage}
  onError={({ nativeEvent }) =>
    console.warn("Error bandera:", nativeEvent.error)
  }
/>
        <Text style={styles.countryName}>{item.nombre.espanol}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={countries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.countryList}
        numColumns={2} // Muestra dos países por fila
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  countryList: {
    padding: 10,
  },
  countryCard: {
    width: windowWidth / 2 - 15, // Ajusta el ancho para mostrar dos países por fila
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  countryInfo: {
    justifyContent: "center",
    // 'stretch' da un ancho real a la imagen con width: '100%'.
    alignItems: "stretch",
    padding: 10,
  },
  flagImage: {
    width: "100%",
    height: 90, // Alto fijo: evita que la imagen quede en 0px y no se vea.
    resizeMode: "contain", // Muestra la bandera completa sin recortarla
    backgroundColor: "#f2f2f2",
  },
  countryName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default ListaPaises;
