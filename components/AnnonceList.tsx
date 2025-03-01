import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Phone } from './Phone';

interface AnnonceListProps {
  data: Phone[];
  onSelect: (phone: Phone) => void;
}

const AnnonceList: React.FC<AnnonceListProps> = ({ data, onSelect }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => onSelect(item)}>
          <Text style={styles.model}>{item.model}</Text>
          <Text style={styles.info}>{item.releaseDate} - {item.price} €</Text>
          <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#f8f8f8', padding: 10, borderRadius: 5, marginBottom: 10 },
  model: { fontSize: 16, fontWeight: 'bold' },
  info: { fontSize: 14, fontStyle: 'italic', color: '#666' },
  description: { fontSize: 14, color: '#444' },
});

export default AnnonceList;
