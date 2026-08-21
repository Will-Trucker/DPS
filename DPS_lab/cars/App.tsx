import {
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import { destinations } from "../cars/data/Destination";
import { foods } from "../cars/data/Food";
import { routes } from "../cars/data/Routes";

import { DestinationCard } from "../cars/components/DestinationCard";
import { FoodCard } from "../cars/components/FoodCard";
import { RouteCard } from "../cars/components/RouteCard";
import { SearchBar } from "../cars/components/SearchBar";
import { Header } from "../cars/components/Header";

export default function App() {
  const [search, setSearch] = useState("");

  const filteredDestinations = destinations.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <Header
          title="Descubre El Salvador"
          subtitle="Explora lugares increíbles"
        />

        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <Text style={styles.sectionTitle}>
          Destinos Destacados
        </Text>

        <FlatList
          data={filteredDestinations}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 12,
          }}
          renderItem={({ item }) => (
            <DestinationCard destination={item} />
          )}
        />

        <Text style={styles.sectionTitle}>
          Gastronomía Salvadoreña
        </Text>

        <FlatList
          horizontal
          data={foods}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}
          renderItem={({ item }) => (
            <FoodCard food={item} />
          )}
        />

        <Text style={styles.sectionTitle}>
          Rutas Turísticas
        </Text>

        {routes.map((route) => (
          <RouteCard
            key={route.id}
            route={route}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F9FA",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginHorizontal: 15,
    marginBottom: 15,
  },
});