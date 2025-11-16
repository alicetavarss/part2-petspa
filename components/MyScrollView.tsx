import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function MyScrollView({ children }: any) {
  return <ScrollView contentContainerStyle={styles.scroll}>{children}</ScrollView>;
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
});
