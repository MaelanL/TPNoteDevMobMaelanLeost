import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Phone } from './components/Phone';  

interface FavoritesState {
  favorites: Phone[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Phone>) => {
      if (!state.favorites.some((fav) => fav.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((fav) => fav.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
