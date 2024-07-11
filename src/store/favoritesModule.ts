interface Favorite {
  id: number;
  city: string;
}

interface State {
  favorites: Favorite[];
}

export const favoritesModule = {
  state: (): State => ({
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  }),
  mutations: {
    addFavorite(state: State, favorite: Favorite) {
      state.favorites.push({ ...favorite });
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    deleteFavorite(state: State, favoriteId: number) {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.id !== favoriteId
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  getters: {
    getFavorites: (state: State) => state.favorites,
  },
};
