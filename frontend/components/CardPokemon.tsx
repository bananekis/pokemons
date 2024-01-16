'use client';

import { PokemonEvolutionsFragment, PokemonsQuery } from '@/graphql/__generated__/types.generated';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InfoButton from './InfoButton';
import React from 'react';
import WishlistButton from './WishlistButton';

enum PokemonEvolutionProps {
  MAX_COUNT = 6, // length of PokemonEvolutionsFragment
}

type CardPokemon = {
  pokemon: Exclude<PokemonsQuery['pokemons']['edges'][number], null>;
  className?: string;
};

type CardEvolution = {
  pokemon: PokemonEvolutionsFragment;
  className?: string;
};

type Props = CardPokemon | CardEvolution;

const CardPokemon = (props: Props) => {
  const router = useRouter();

  const isEvolutionCard = Object.keys(props.pokemon).length === PokemonEvolutionProps.MAX_COUNT;

  const Card = ({
    pokemon,
    pokemonTypes,
    infoModal,
    className = 'card-container',
  }: Props & { pokemonTypes?: React.JSX.Element; infoModal?: React.JSX.Element }) => {
    return (
      <div className={className}>
        <div
          className="card-container__image-wrapper"
          onClick={() => router.push(`/${pokemon.id}`)}
        >
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill
            sizes="100%"
            className="card-container__image-wrapper__image"
          />
        </div>
        <div className="card-container__pokemon-info">
          <div>
            <h5 className="cursor-pointer" onClick={() => router.push(`/${pokemon.id}`)}>
              {pokemon.name}
            </h5>
            {pokemonTypes}
          </div>
          <div className="pokemon-info-button-wrapper">
            <WishlistButton pokemonId={pokemon.id} isFavorite={pokemon.isFavorite} />
            {infoModal}
          </div>
        </div>
      </div>
    );
  };

  if (isEvolutionCard) {
    // Handle evolution props
    const { pokemon } = props;
    return <Card pokemon={{ ...(pokemon as CardEvolution['pokemon']) }} />;
  } else {
    // Handle pokemon props
    const { pokemon } = props;
    return (
      <Card
        pokemon={{ ...(pokemon as CardPokemon['pokemon']) }}
        //@ts-ignore cannot be recognized from type Props as TS doesn't automatically infer from conditional types
        pokemonTypes={<p className="font-small">{pokemon.types?.join(', ')}</p>}
        infoModal={<InfoButton pokemon={pokemon as CardPokemon['pokemon']} />}
      />
    );
  }
};

export default CardPokemon;
