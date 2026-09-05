import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { FIVE_R, FiveR } from '../data/fiveR';

const FiveRScreen = () => {
  const [selected, setSelected] = useState<FiveR | null>(null);

  const renderItem = ({ item }: { item: FiveR }) => (
    <TouchableOpacity
      style={[styles.card, { borderTopColor: item.color }]}
      activeOpacity={0.75}
      onPress={() => setSelected(item)}
    >
      <Text style={styles.cardIcon}>{item.icon}</Text>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardInfo} numberOfLines={3}>
        {item.shortInfo}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Las 5R del Reciclaje</Text>
        <Text style={styles.headerSubtitle}>
          Toca cada tarjeta para aprender más
        </Text>
      </View>

      <FlatList
        data={FIVE_R}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={selected !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelected(null)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setSelected(null)}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            {selected && (
              <>
                <Text style={styles.modalIcon}>{selected.icon}</Text>
                <Text style={[styles.modalTitle, { color: selected.color }]}>
                  {selected.title}
                </Text>
                <Text style={styles.modalText}>{selected.longInfo}</Text>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: selected.color }]}
                  onPress={() => setSelected(null)}
                >
                  <Text style={styles.modalButtonText}>Entendido</Text>
                </TouchableOpacity>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8E9',
  },
  header: {
    backgroundColor: '#2E7D32',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#C8E6C9',
    marginTop: 4,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderTopWidth: 5,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 6,
  },
  cardInfo: {
    fontSize: 12,
    color: '#455A64',
    textAlign: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  modalIcon: {
    fontSize: 44,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    color: '#37474F',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default FiveRScreen;