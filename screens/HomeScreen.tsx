import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import phoneData from '../donnees/phone.json';
import { Phone } from '../components/Phone';
import AnnonceList from '../components/AnnonceList';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<Phone[]>(phoneData);

  useEffect(() => {
    setFilteredData(
      phoneData.filter((item) =>
        item.model.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liste des annonces</Text>
      <TouchableOpacity style={styles.favoritesButton} onPress={() => navigation.navigate('Favorites')}>
        <Text style={styles.favoritesText}>Mes favoris</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Rechercher un modèle..."
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.annonceCount}>Nombre d'annonces : {filteredData.length}</Text>

      <AnnonceList data={filteredData} onSelect={(phone) => navigation.navigate('Details', { phone })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: 'white', flex: 1 },
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  favoritesButton: { backgroundColor: 'green', padding: 10, borderRadius: 5, alignSelf: 'center' },
  favoritesText: { color: 'white', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 5, marginBottom: 10 },
  annonceCount: { marginBottom: 10, fontStyle: 'italic' },
});

export default HomeScreen;
