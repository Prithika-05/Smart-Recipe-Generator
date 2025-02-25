import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useFavorites } from '../context/FavoriteContext.js';

const HeartIcon = ({ recipe }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isFavoriteLocal, setIsFavoriteLocal] = useState(isFavorite(recipe.name));

  useEffect(() => {
    setIsFavoriteLocal(isFavorite(recipe.name));
  }, [recipe.name, isFavorite]);

  const handleToggleFavorite = async () => {
    toggleFavorite(recipe);
    try {
      const url = isFavoriteLocal
        ? `https://rjvn06q4-7002.inc1.devtunnels.ms/favorite/${encodeURIComponent(recipe.name)}`
        : 'https://rjvn06q4-7002.inc1.devtunnels.ms/favorite';

      const response = await fetch(url, {
        method: isFavoriteLocal ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: isFavoriteLocal ? null : JSON.stringify(recipe),
      });

      if (response.ok) {
        console.log(isFavoriteLocal ? 'Recipe removed from favorites!' : 'Recipe added to favorites!');
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
        name={isFavoriteLocal ? 'heart' : 'heart-outline'}
        size={28}
        color={isFavoriteLocal ? '#eb1313' : '#fff'}
      />
    </TouchableOpacity>
  );
};

export default HeartIcon;
