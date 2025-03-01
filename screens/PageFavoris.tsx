import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, removeFavorite } from '../store';
import { Phone } from '../components/Phone';
import { Card, Button, TextInput } from 'react-native-paper';
import Filtres from '../components/Filtres';

const PageFavoris = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const favorites: Phone[] = useSelector((state: RootState) => state.favorites.favorites);

  // États pour la recherche et les filtres
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<Phone[]>(favorites);
  const [showFilters, setShowFilters] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('default');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [dateMin, setDateMin] = useState('');
  const [dateMax, setDateMax] = useState('');

  useEffect(() => {
    let data = favorites.filter((item) =>
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
  }, [search, sortCriteria, priceMin, priceMax, dateMin, dateMax, favorites]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header}>Mes Favoris</Text>

        <TextInput
          label="Rechercher un modèle..."
          value={search}
          onChangeText={setSearch}
          mode="outlined"
          style={styles.input}
        />

        <Button mode="outlined" onPress={() => setShowFilters(!showFilters)} style={styles.toggleButton}>
          {showFilters ? 'Masquer les filtres' : 'Filtres & Tri'}
        </Button>

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

        {filteredData.length === 0 ? (
          <Text style={styles.emptyText}>Aucun favori trouvé.</Text>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card style={styles.card} onPress={() => navigation.navigate('Details', { phone: item })}>
                <Card.Content>
                  <Text style={styles.model}>{item.model}</Text>
                  <Text style={styles.info}>{item.releaseDate} - {item.price} €</Text>
                  <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button mode="contained" onPress={() => dispatch(removeFavorite(item.id))} color="red">
                    Supprimer
                  </Button>
                </Card.Actions>
              </Card>
            )}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: 'white', flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  emptyText: { fontSize: 16, textAlign: 'center', color: '#777' },
  annonceCount: { fontSize: 16, marginBottom: 16 },
  input: { marginBottom: 16 },
  toggleButton: { marginBottom: 16 },
  card: { marginBottom: 10, padding: 10, borderRadius: 5, elevation: 3, backgroundColor: 'white' },
  model: { fontSize: 18, fontWeight: 'bold' },
  info: { fontSize: 14, fontStyle: 'italic', color: '#666' },
  description: { fontSize: 14, color: '#444' },
});

export default PageFavoris;
