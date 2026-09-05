import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { FIVE_R } from '../data/fiveR';

interface LoadingScreenProps {
  onFinish: () => void;
}

const MESSAGE_DELAY_MS = 1000;
const FINAL_PAUSE_MS = 900;

const LoadingScreen = ({ onFinish }: LoadingScreenProps) => {
  const [visibleCount, setVisibleCount] = useState(0);
  // Un Animated.Value de opacidad por cada mensaje, para el fade-in.
  const opacities = useRef(FIVE_R.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    FIVE_R.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleCount(index + 1);
        Animated.timing(opacities[index], {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      }, index * MESSAGE_DELAY_MS);
      timers.push(timer);
    });

    const finishTimer = setTimeout(() => {
      onFinish();
    }, FIVE_R.length * MESSAGE_DELAY_MS + FINAL_PAUSE_MS);
    timers.push(finishTimer);

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Las 5R del Reciclaje</Text>
      <Text style={styles.subtitle}>Cargando información ecológica...</Text>

      <View style={styles.messagesContainer}>
        {FIVE_R.slice(0, visibleCount).map((item, index) => (
          <Animated.View
            key={item.id}
            style={[styles.messageRow, { opacity: opacities[index] }]}
          >
            <Text style={styles.messageIcon}>{item.icon}</Text>
            <View style={styles.messageTextWrapper}>
              <Text style={[styles.messageTitle, { color: item.color }]}>
                {item.title}
              </Text>
              <Text style={styles.messageInfo}>{item.shortInfo}</Text>
            </View>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8E9',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#558B2F',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 30,
  },
  messagesContainer: {
    flex: 1,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  messageIcon: {
    fontSize: 28,
    marginRight: 14,
  },
  messageTextWrapper: {
    flex: 1,
  },
  messageTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  messageInfo: {
    fontSize: 13,
    color: '#33691E',
  },
});

export default LoadingScreen;