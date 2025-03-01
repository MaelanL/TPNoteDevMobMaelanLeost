import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import phoneData from '../donnees/phone.json';
import { Phone } from '../components/Phone';
import ListeAnnonce from '../components/ListeAnnonce';
import { Button, TextInput } from 'react-native-paper';
import Filtres from '../components/Filtres';

type PageAccueilNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const PageAccueil = () => {
  const navigation = useNavigation<PageAccueilNavigationProp>();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<Phone[]>(phoneData);
  const [showFilters, setShowFilters] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('default');

  // États pour les filtres Prix et Année
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [dateMin, setDateMin] = useState('');
  const [dateMax, setDateMax] = useState('');

  useEffect(() => {
    let data = phoneData.filter((item) =>
      item.model.toLowerCase().includes(search.toLowerCase()),
    );

    // Appliquer le filtre sur le prix
    const minPrice = priceMin ? parseFloat(priceMin) : 0;
    const maxPrice = priceMax ? parseFloat(priceMax) : Infinity;
    data = data.filter((item) => item.price >= minPrice && item.price <= maxPrice);

    // Appliquer le filtre sur la date
    const minDate = dateMin ? parseInt(dateMin, 10) : 0;
    const maxDate = dateMax ? parseInt(dateMax, 10) : Infinity;
    data = data.filter((item) => item.releaseDate >= minDate && item.releaseDate <= maxDate);

    // Appliquer le tri
    if (sortCriteria === 'priceAsc') {
      data.sort((a, b) => a.price - b.price);
    } else if (sortCriteria === 'priceDesc') {
      data.sort((a, b) => b.price - a.price);
    } else if (sortCriteria === 'releaseDate') {
      data.sort((a, b) => b.releaseDate - a.releaseDate);
    }

    setFilteredData(data);
  }, [search, sortCriteria, priceMin, priceMax, dateMin, dateMax]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header}>Liste des annonces</Text>

        <Button mode="contained" onPress={() => navigation.navigate('Favorites')} style={styles.favoritesButton}>
          Mes favoris
        </Button>

        <TextInput label="Rechercher un modèle..." value={search} onChangeText={setSearch} mode="outlined" style={styles.input} />

        {/* Bouton pour afficher les filtres et tri */}
        <Button mode="outlined" onPress={() => setShowFilters(!showFilters)} style={styles.toggleButton}>
          {showFilters ? 'Masquer les filtres' : 'Filtres & Tri'}
        </Button>

        {/* Affichage du composant Filtres */}
        {showFilters && (
          <Filtres
            sortCriteria={sortCriteria}
            setSortCriteria={setSortCriteria}
            priceMin={priceMin}
            setPriceMin={setPriceMin}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            dateMin={dateMin}
            setDateMin={setDateMin}
            dateMax={dateMax}
            setDateMax={setDateMax}
          />
        )}

        <Text style={styles.annonceCount}>Nombre d'annonces : {filteredData.length}</Text>

        <ListeAnnonce data={filteredData} onSelect={(phone) => navigation.navigate('Details', { phone })} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  favoritesButton: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  toggleButton: {
    marginBottom: 16,
  },
  annonceCount: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default PageAccueil;
