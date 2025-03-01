import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import phoneData from '../donnees/phone.json';
import { Phone } from '../components/Phone';
import ListeAnnonce from '../components/ListeAnnonce';
import { Button, TextInput } from 'react-native-paper'; // ✅ Utilisation de Paper

type PageAccueilNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const PageAccueil = () => {
  const navigation = useNavigation<PageAccueilNavigationProp>();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<Phone[]>(phoneData);

  useEffect(() => {
    setFilteredData(
      phoneData.filter((item) =>
        item.model.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liste des annonces</Text>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Favorites')}
        style={styles.favoritesButton}
      >
        Mes favoris
      </Button>

      <TextInput
        label="Rechercher un modèle..."
        value={search}
        onChangeText={setSearch}
        mode="outlined"
        style={styles.input}
      />

      <Text style={styles.annonceCount}>
        Nombre d'annonces : {filteredData.length}
      </Text>

      <ListeAnnonce
        data={filteredData}
        onSelect={(phone) => navigation.navigate('Details', { phone })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: 'white', flex: 1 },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  favoritesButton: { marginVertical: 10 },
  input: { marginBottom: 10 },
  annonceCount: { marginBottom: 10, fontStyle: 'italic' },
});

export default PageAccueil;
