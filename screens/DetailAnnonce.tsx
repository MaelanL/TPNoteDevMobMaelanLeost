import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, addFavorite, removeFavorite } from '../store';
import { RootStackParamList } from '../App';
import { Card, Button, Avatar } from 'react-native-paper'; // ✅ Ajout de Paper

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const DetailAnnonce = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const phone = route.params?.phone;

  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );
  const isFavorite = favorites.some((fav) => fav.id === phone?.id);

  if (!phone) {
    return <Text style={styles.error}>Aucune annonce trouvée.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{phone.model}</Text>

      <Text style={styles.sectionTitle}>Vendeur :</Text>
      <Card style={styles.card}>
        <Card.Title
          title={phone.saler}
          subtitle={`${phone.salerCity}, ${phone.salerCountry}`}
          left={(props) => <Avatar.Image {...props} source={{ uri: phone.salerAvatar }} />}
        />
      </Card>

      <Text style={styles.sectionTitle}>Information :</Text>
      <Text style={styles.info}>Prix : {phone.price} €</Text>
      <Text style={styles.info}>Système d'exploitation : {phone.os}</Text>
      <Text style={styles.info}>Marque : {phone.constructor}</Text>
      <Text style={styles.info}>Année de sortie : {phone.releaseDate}</Text>

      <Text style={styles.sectionTitle}>Description :</Text>
      <Text style={styles.description}>{phone.description}</Text>

      <Button
        mode="contained"
        onPress={() =>
          isFavorite
            ? dispatch(removeFavorite(phone.id))
            : dispatch(addFavorite(phone))
        }
        style={styles.button}
      >
        {isFavorite ? 'Supprimer des favoris' : 'Ajouter aux favoris'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: 'white', flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  info: { fontSize: 16, marginVertical: 2 },
  description: { fontSize: 14, marginTop: 10, color: '#444' },
  error: { fontSize: 18, color: 'red', textAlign: 'center' },
  card: { marginBottom: 10 },
  button: { marginTop: 10 },
});

export default DetailAnnonce;
