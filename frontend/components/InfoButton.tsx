'use client';

import { Modal } from '@carbon/react';
import { PokemonsQuery } from '@/graphql/__generated__/types.generated';
import IconInfo from './icons/IconInfo';
import React, { useState } from 'react';

type Props = {
  pokemon: Exclude<PokemonsQuery['pokemons']['edges'][number], null>;
};

const InfoButton = ({ pokemon }: Props) => {
  const [open, setOpen] = useState(false);

  const specialAttackNames = pokemon.attacks?.special
    .filter((attack) => attack.name)
    .map((attack) => attack.name);

  const fastAttackNames = pokemon.attacks?.fast
    .filter((attack) => attack.name)
    .map((attack) => attack.name);

  const pokemonInfoText = `
	${pokemon.name}, the ${pokemon.classification}, is a ${pokemon.types?.join(', ')} Pokémon.
	It evolves into ${pokemon.evolutions[0]?.name} after gaining ${pokemon.evolutionRequirements
    ?.amount}
	${pokemon.evolutionRequirements?.name} candies. In battles, ${
    pokemon.name
  } showcases a diverse set of
	attacks. Its fast moves include ${fastAttackNames?.join(', ')}, and its special moves feature
	${specialAttackNames?.join(', ')}. Trainers should be cautious, as ${pokemon.name} is vulnerable to
	${pokemon.weaknesses?.join(', ')} types.
  `;

  return (
    <>
      <button className="pokemon-info-button" onClick={() => setOpen(true)}>
        <IconInfo />
      </button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        passiveModal
        modalHeading={`More information about "${pokemon.name}"`}
      >
        {pokemonInfoText}
      </Modal>
    </>
  );
};

export default InfoButton;
