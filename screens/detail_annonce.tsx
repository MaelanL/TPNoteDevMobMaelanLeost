import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, addFavorite, removeFavorite } from '../store';
import { RootStackParamList } from '../App';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const PhoneDetails = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const phone = route.params?.phone;

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const isFavorite = favorites.some((fav) => fav.id === phone?.id);

  if (!phone) {
    return <Text style={styles.error}>Aucune annonce trouvée.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{phone.model}</Text>

      <Text style={styles.sectionTitle}>Information :</Text>
      <Text style={styles.info}>Prix : {phone.price} €</Text>
      <Text style={styles.info}>Système d'exploitation : {phone.os}</Text>
      <Text style={styles.info}>Marque : {phone.constructor}</Text>
      <Text style={styles.info}>Année de sortie : {phone.releaseDate}</Text>

      <Text style={styles.sectionTitle}>Vendeur :</Text>
      <View style={styles.sellerContainer}>
        <Image source={{ uri: phone.salerAvatar }} style={styles.sellerImage} />
        <View>
          <Text style={styles.sellerName}>{phone.saler}</Text>
          <Text style={styles.info}>Pays : {phone.salerCountry}  Ville : {phone.salerCity}</Text>
          <Text style={styles.info}>Tel. {phone.phone}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Description :</Text>
      <Text style={styles.description}>{phone.description}</Text>

      <Button
        title={isFavorite ? "Supprimer des favoris" : "Ajouter aux favoris"}
        color="green"
        onPress={() => isFavorite ? dispatch(removeFavorite(phone.id)) : dispatch(addFavorite(phone))}
      />
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
  sellerContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  sellerImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  sellerName: { fontSize: 16, fontWeight: 'bold' },
});

export default PhoneDetails;
