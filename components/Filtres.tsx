import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  TextInput,
  RadioButton,
  Divider,
  Button,
  Card,
} from 'react-native-paper';

interface FiltresProps {
  sortCriteria: string;
  setSortCriteria: (value: string) => void;
  priceMin: string;
  setPriceMin: (value: string) => void;
  priceMax: string;
  setPriceMax: (value: string) => void;
  dateMin: string;
  setDateMin: (value: string) => void;
  dateMax: string;
  setDateMax: (value: string) => void;
}

const Filtres: React.FC<FiltresProps> = ({
  sortCriteria,
  setSortCriteria,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  dateMin,
  setDateMin,
  dateMax,
  setDateMax,
}) => {
  return (
    <Card style={styles.filtersContainer}>
      <Card.Content>
        <Text style={styles.sectionTitle}>Trier les annonces</Text>
        <RadioButton.Group onValueChange={setSortCriteria} value={sortCriteria}>
          <View style={styles.radioContainer}>
            <View style={styles.radioRow}>
              <RadioButton value="default" />
              <Text>Par défaut</Text>
            </View>
            <View style={styles.radioRow}>
              <RadioButton value="priceAsc" />
              <Text>Prix croissant</Text>
            </View>
            <View style={styles.radioRow}>
              <RadioButton value="priceDesc" />
              <Text>Prix décroissant</Text>
            </View>
            <View style={styles.radioRow}>
              <RadioButton value="releaseDate" />
              <Text>Année de sortie</Text>
            </View>
          </View>
        </RadioButton.Group>

        <Divider style={styles.divider} />

        <Text style={styles.sectionTitle}>Filtrer par prix</Text>
        <View style={styles.row}>
          <TextInput
            label="Prix min"
            keyboardType="numeric"
            value={priceMin}
            onChangeText={setPriceMin}
            mode="outlined"
            style={styles.smallInput}
          />
          <TextInput
            label="Prix max"
            keyboardType="numeric"
            value={priceMax}
            onChangeText={setPriceMax}
            mode="outlined"
            style={styles.smallInput}
          />
        </View>

        <Divider style={styles.divider} />

        <Text style={styles.sectionTitle}>Filtrer par année</Text>
        <View style={styles.row}>
          <TextInput
            label="Année min"
            keyboardType="numeric"
            value={dateMin}
            onChangeText={setDateMin}
            mode="outlined"
            style={styles.smallInput}
          />
          <TextInput
            label="Année max"
            keyboardType="numeric"
            value={dateMax}
            onChangeText={setDateMax}
            mode="outlined"
            style={styles.smallInput}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  radioContainer: {
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  smallInput: { width: 100, marginHorizontal: 5 },
  divider: { marginVertical: 10 },
});

export default Filtres;
