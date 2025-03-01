import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import phoneData from '../donnees/phone.json';
import { Phone } from '../components/Phone';
import ListeAnnonce from '../components/ListeAnnonce';
import { Button, TextInput, Menu, Divider } from 'react-native-paper'; // ✅ Utilisation de Paper

type PageAccueilNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const PageAccueil = () => {
  const navigation = useNavigation<PageAccueilNavigationProp>();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<Phone[]>(phoneData);
  const [menuVisible, setMenuVisible] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('default');

  useEffect(() => {
    let data = phoneData.filter((item) =>
      item.model.toLowerCase().includes(search.toLowerCase()),
    );

    // Appliquer le tri
    if (sortCriteria === 'priceAsc') {
      data.sort((a, b) => a.price - b.price);
    } else if (sortCriteria === 'priceDesc') {
      data.sort((a, b) => b.price - a.price);
    } else if (sortCriteria === 'releaseDate') {
      data.sort((a, b) => b.releaseDate - a.releaseDate);
    }

    setFilteredData(data);
  }, [search, sortCriteria]);

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

      {/* Bouton de tri */}
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            style={styles.sortButton}
          >
            Trier les annonces
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            setSortCriteria('default');
            setMenuVisible(false);
          }}
          title="Par défaut"
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            setSortCriteria('priceAsc');
            setMenuVisible(false);
          }}
          title="Prix croissant"
        />
        <Menu.Item
          onPress={() => {
            setSortCriteria('priceDesc');
            setMenuVisible(false);
          }}
          title="Prix décroissant"
        />
        <Menu.Item
          onPress={() => {
            setSortCriteria('releaseDate');
            setMenuVisible(false);
          }}
          title="Année de sortie"
        />
      </Menu>

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
  sortButton: { marginBottom: 10 },
  annonceCount: { marginBottom: 10, fontStyle: 'italic' },
});

export default PageAccueil;
