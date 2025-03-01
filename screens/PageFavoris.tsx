import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, removeFavorite } from '../store';
import { Phone } from '../components/Phone';
import { Card, Button } from 'react-native-paper'; // ✅ Ajout de Paper

const PageFavoris = ({ navigation }: any) => {
  const favorites: Phone[] = useSelector(
    (state: RootState) => state.favorites.favorites,
  );
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mes Favoris</Text>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Vous n'avez pas de favoris.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id} // ✅ Correction ici (id est string)
          renderItem={({ item }) => (
            <Card
              style={styles.card}
              onPress={() => navigation.navigate('Details', { phone: item })}
            >
              <Card.Content>
                <Text style={styles.model}>{item.model}</Text>
                <Text style={styles.info}>
                  {item.releaseDate} - {item.price} €
                </Text>
                <Text style={styles.description} numberOfLines={3}>
                  {item.description}
                </Text>
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="contained"
                  onPress={() => dispatch(removeFavorite(item.id))}
                  color="red"
                >
                  Supprimer
                </Button>
              </Card.Actions>
            </Card>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: 'white', flex: 1 },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  emptyText: { fontSize: 16, textAlign: 'center', color: '#777' },
  card: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: 'white',
  },
  model: { fontSize: 18, fontWeight: 'bold' },
  info: { fontSize: 14, fontStyle: 'italic', color: '#666' },
  description: { fontSize: 14, color: '#444' },
});

export default PageFavoris;
