'use client';

import {
  PokemonByIdDocument,
  useFavoritePokemonMutation,
  useUnFavoritePokemonMutation,
} from '@/graphql/__generated__/types.generated';
import IconHeart from './icons/IconHeart';
import React from 'react';
import toast from 'react-hot-toast';

type Props = {
  pokemonId: string;
  isFavorite: boolean;
};

const WishlistButton = ({ pokemonId, isFavorite }: Props) => {
  const [favoritePokemon, { loading: favLoading }] = useFavoritePokemonMutation();
  const [unFavoritePokemon, { loading: unFavLoading }] = useUnFavoritePokemonMutation();

  const handleFavoriteClick = async () => {
    if (isFavorite) {
      await unFavoritePokemon({
        variables: { unFavoritePokemonId: pokemonId },
        refetchQueries: [{ query: PokemonByIdDocument, variables: { pokemonByIdId: pokemonId } }],
        onCompleted: () => {
          return toast.success('Removed from favorites!');
        },
        onError: (error) => toast.error(error.message || 'An error occurred'),
      });
    } else {
      await favoritePokemon({
        variables: { favoritePokemonId: pokemonId },
        refetchQueries: [{ query: PokemonByIdDocument, variables: { pokemonByIdId: pokemonId } }],
        onCompleted: () => {
          return toast.success('Added to favorites!');
        },
        onError: (error) => toast.error(error.message || 'An error occurred'),
      });
    }
  };

  return (
    <button
      className="pokemon-info-button"
      onClick={handleFavoriteClick}
      disabled={favLoading || unFavLoading}
    >
      <IconHeart className={isFavorite ? 'fill-heart' : undefined} />
    </button>
  );
};

export default WishlistButton;
