import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../features/favoritesSlice';
import { RootState } from '../store';

const MovieDetails: React.FC<{ route: any }> = ({ route }) => {
  const { movie } = route.params;
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.favorites.find((fav) => fav.id === movie.id),
  );

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
      <Text style={styles.vote}>Rating: {movie.vote_average}/10</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      {isFavorite ? (
        <Button
          title="Supprimer des favoris"
          onPress={() => dispatch(removeFavorite(movie.id))}
        />
      ) : (
        <Button
          title="Ajouter aux favoris"
          onPress={() => dispatch(addFavorite(movie))}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  poster: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  releaseDate: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  vote: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  overview: {
    fontSize: 14,
    color: '#555',
  },
});

export default MovieDetails;
