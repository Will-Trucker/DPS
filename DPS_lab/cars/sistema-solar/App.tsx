import React, {useMemo, useState} from 'react';
import{
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SectionTitle from './components/SectionTitle';
import PlanetCard from './components/PlanetCard';
import PlanetDetail from './components/PlanetDetail';
import { planets } from './data/planet';
import { Planet } from './types/planet';


type FilterType = 'Todos' | 'Rocoso' | 'Gaseoso' | 'Helado';

const FILTERS: FilterType[] = ['Todos', 'Rocoso', 'Gaseoso', 'Helado'];

export default function App(){
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('Todos');
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredPlanets = useMemo(() => {
    return planets
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => filter === 'Todos' || p.type === filter)
      .sort((a, b) => a.order - b.order);
  }, [search, filter]);

  const handleOpenPlanet = (planet: Planet) => {
    setSelectedPlanet(planet);
    setModalVisible(true);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={filteredPlanets}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <Header />
            <SearchBar value={search} onChangeText={setSearch} />

            <View style={styles.filterRow}>
              {FILTERS.map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[
                    styles.filterChip,
                    filter === f && styles.filterChipActive,
                  ]}
                  onPress={() => setFilter(f)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      filter === f && styles.filterTextActive,
                    ]}
                  >
                    {f}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <SectionTitle
              title="Planetas del Sistema Solar"
              subtitle={`${filteredPlanets.length} planetas encontrados`}
            />
          </>
        }
        renderItem={({ item }) => (
          <PlanetCard planet={item} onPress={handleOpenPlanet} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No se encontro el/los planetas 🔭</Text>
        }
      />

      <PlanetDetail
        planet={selectedPlanet}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F5F9',
  },
  listContent: {
    paddingBottom: 24,
  },
  row: {
    paddingHorizontal: 10,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 6,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#EAEBF2',
  },
  filterChipActive: {
    backgroundColor: '#1A1A2E',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B6F85',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#9094A6',
    fontSize: 14,
  },
});


