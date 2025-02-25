import React, { createContext, useState, useContext, useEffect } from 'react';

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

  const isFavorite = (recipeName) => favorites.includes(recipeName);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('https://rjvn06q4-7002.inc1.devtunnels.ms/favorites');
        if (response.ok) {
          const data = await response.json();
          setFavorites(data.map(recipe => recipe.name));
        } else {
          console.error('Failed to fetch favorites:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
