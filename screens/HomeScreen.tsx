import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import MovieList from '../components/MovieList';
import { Movie } from '../components/Movie';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import moviesData from '../donnees/PopularMovies_p1.json'; // ✅ Import au lieu de require

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const favoritesCount = useSelector(
    (state: RootState) => state.favorites.favorites.length,
  );

  useEffect(() => {
    setMovies(moviesData.results); // ✅ Plus besoin de `require`
  }, []);

  const handlePressMovie = (movie: Movie) => {
    navigation.navigate('Details', { movie });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Movies</Text>
      <Button
        title={`Mes favoris (${favoritesCount})`}
        onPress={() => navigation.navigate('Favorites')}
      />
      <MovieList movies={movies} onPressMovie={handlePressMovie} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;
