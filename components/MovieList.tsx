import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Movie } from './Movie';

interface MovieListProps {
  movies: Movie[];
  onPressMovie: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onPressMovie }) => {
  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPressMovie(item)}>
          <View style={styles.movieContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.poster}
            />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.overview} numberOfLines={3}>
                {item.overview}
              </Text>
              <Text style={styles.releaseDate}>
                Release Date: {item.release_date}
              </Text>
              <Text style={styles.vote}>Rating: {item.vote_average}/10</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  overview: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  releaseDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  vote: {
    fontSize: 12,
    color: '#888',
  },
});

export default MovieList;
