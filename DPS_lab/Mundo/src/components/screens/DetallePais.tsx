import { Button, Image, StyleSheet, Text, View } from "react-native";
import type { DetallePaisProps } from "../../types/types";

const DetallePais = ({ route, navigation }: DetallePaisProps) => {
  const { country } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Detalles del País</Text>

      <View style={styles.detailsContainer}>
        <Image source={{ uri: country.bandera }} style={styles.flagImage} />
        <Text>
          <Text style={styles.label}>Nombre:</Text>
          {country.nombre.espanol} ({country.monedas[0].codigo_pais})
        </Text>
        <Text>
          <Text style={styles.label}>Capital:</Text>
          {country.capital.espanol}
        </Text>
        <Text>
          <Text style={styles.label}>Población:</Text>
          {country.poblacion}
        </Text>
        <Text>
          <Text style={styles.label}>Región:</Text>
          {country.region.espanol}
        </Text>
        <Text>
          <Text style={styles.label}>Idioma:</Text>
          {country.lenguaje.espanol}
        </Text>
        <Text>
          <Text style={styles.label}>Moneda:</Text>
          {country.monedas[0].nombre.espanol} ({country.monedas[0].codigo})
        </Text>
        <Text style={styles.descripcion}>{country.descripcion.espanol}</Text>
      </View>
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  detailsContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 20,
    width: "80%",
  },
  label: { fontWeight: "bold" },
  descripcion: { marginTop: 12, textAlign: "justify" },
  flagImage: {
    width: "100%",
    aspectRatio: 2,
    resizeMode: "cover",
    borderColor: "#000000",
  },
});

export default DetallePais;
