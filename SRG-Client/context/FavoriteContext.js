import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (recipe) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(recipe.name)) {
        return prevFavorites.filter((name) => name !== recipe.name);
      } else {
        return [...prevFavorites, recipe.name];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
