import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useFavorites } from '../context/FavoriteContext.js';

const HeartIcon = ({ recipe }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.includes(recipe.name));
  }, [favorites, recipe.name]);

  const handleToggleFavorite = async () => {
    toggleFavorite(recipe);
    try {
      const url = isFavorite
        ? `https://rjvn06q4-7002.inc1.devtunnels.ms/favorite/${encodeURIComponent(recipe.name)}`
        : 'https://rjvn06q4-7002.inc1.devtunnels.ms/favorite';

      const response = await fetch(url, {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: isFavorite ? null : JSON.stringify(recipe),
      });

      if (response.ok) {
        console.log(isFavorite ? 'Recipe removed from favorites!' : 'Recipe added to favorites!');
      } else {
        console.error('Failed to update favorites:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleToggleFavorite} activeOpacity={0.7}>
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={28}
        color={isFavorite ? '#eb1313' : '#fff'}
      />
    </TouchableOpacity>
  );
};

export default HeartIcon;
