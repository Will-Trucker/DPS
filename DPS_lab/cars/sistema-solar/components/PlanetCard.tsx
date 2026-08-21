import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { Planet } from '../types/planet';

interface PlanetCardProps {
  planet: Planet;
  onPress: (planet: Planet) => void;
}

const PlanetCard = ({ planet, onPress }: PlanetCardProps) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => onPress(planet)}
    >
      <Image source={{ uri: planet.image }} style={styles.image} />
      <View style={[styles.badge, { backgroundColor: planet.color }]}>
        <Text style={styles.badgeText}>{planet.type}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{planet.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {planet.description}
        </Text>
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>#{planet.order} del Sol</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    margin: 6,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 100,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  description: {
    fontSize: 11,
    color: '#6B6F85',
    marginTop: 3,
    minHeight: 28,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  footerText: {
    fontSize: 10,
    color: '#9094A6',
    fontWeight: '600',
  },
});

export default PlanetCard;
