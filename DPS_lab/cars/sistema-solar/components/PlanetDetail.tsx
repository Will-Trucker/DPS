import React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {Planet} from "../types/planet";

interface PlanetDetailProps {
    planet: Planet | null;
    visible: boolean;
    onClose:() => void;
}

const formatNumber = (n: number) => n.toLocaleString('es-SV');

const PlanetDetail = ({
  planet,
  visible,
  onClose,
}: PlanetDetailProps) => {
    if(!planet) return null;
    return(
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image source={{ uri: planet.image }} style={styles.image} />

            <View style={styles.content}>
              <View style={styles.headerRow}>
                <Text style={styles.name}>{planet.name}</Text>
                <View
                  style={[styles.badge, { backgroundColor: planet.color }]}
                >
                  <Text style={styles.badgeText}>{planet.type}</Text>
                </View>
              </View>

              <Text style={styles.description}>{planet.description}</Text>
            </View>
            <View style={styles.statsGrid}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Diámetro</Text>
                  <Text style={styles.statValue}>
                    {formatNumber(planet.diameter)} km
                  </Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Masa</Text>
                  <Text style={styles.statValue}>
                    {planet.mass}x Tierra
                  </Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Dist. al Sol</Text>
                  <Text style={styles.statValue}>
                    {formatNumber(planet.distanceSun)} km
                  </Text>
                </View>
              </View>

              <Text style={styles.sectionHeader}>Características</Text>
              {planet.characteristics.map((c, i) => (
                <View key={i} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{c}</Text>
                </View>
              ))}
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
  };

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 14, 35, 0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '88%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A2E',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    color: '#6B6F85',
    marginTop: 6,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBox: {
    width: '48%',
    backgroundColor: '#F4F5F9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 11,
    color: '#9094A6',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 15,
    color: '#1A1A2E',
    fontWeight: '700',
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginTop: 10,
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingRight: 8,
  },
  bulletDot: {
    fontSize: 14,
    color: '#3B82F6',
    marginRight: 8,
  },
  bulletText: {
    fontSize: 13,
    color: '#4A4E63',
    flex: 1,
  },
  closeButton: {
    backgroundColor: '#1A1A2E',
    margin: 16,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default PlanetDetail;