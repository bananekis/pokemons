'use client';

import { Column, Grid } from '@carbon/react';
import { usePokemonByIdSuspenseQuery } from '@/graphql/__generated__/types.generated';
import CardPokemon from '@/components/CardPokemon';
import IconVolume from '@/components/icons/IconVolume';
import Image from 'next/image';
import InfoButton from '@/components/InfoButton';
import WishlistButton from '@/components/WishlistButton';

export default function Page({ params }: { params: { name: string } }) {
  const { data } = usePokemonByIdSuspenseQuery({ variables: { pokemonByIdId: params.name } });

  const audio = new Audio(data.pokemonById?.sound);

  if (!data.pokemonById) return null;

  return (
    <div className="card-container">
      <div className="content-wrapper__pokemon">
        <div className="card-container__image-wrapper">
          <Image
            src={data.pokemonById.image}
            alt={data.pokemonById.name}
            fill
            sizes="100%"
            className="card-container__image-wrapper__image cursor-default"
            style={{ objectFit: 'contain' }}
          />
          <IconVolume
            className="card-container__image-wrapper--icon"
            onClick={() => audio.play()}
          />
        </div>
      </div>
      <div className="pokemon-detail-stats">
        <div className="pokemon-detail-stats__first-row-wrapper">
          <div className="pokemon-detail-stats__first-row">
            <div>
              <h3>{data.pokemonById.name}</h3>
              <p className="font-small">{data.pokemonById.types.join(', ')}</p>
            </div>
            <div className="pokemon-info-button-wrapper">
              <WishlistButton
                pokemonId={data.pokemonById.id}
                isFavorite={data.pokemonById.isFavorite}
              />
              <InfoButton pokemon={data.pokemonById} />
            </div>
          </div>
          <div className="pokemon-detail-stats__wrapper">
            <div className="pokemon-detail-stats__wrapper-hr">
              <hr className="cp-hr" />
            </div>
            <h5>CP: {data.pokemonById.maxCP}</h5>
          </div>
          <div className="pokemon-detail-stats__wrapper">
            <div className="pokemon-detail-stats__wrapper-hr">
              <hr className="hp-hr" />
            </div>
            <h5>HP: {data.pokemonById.maxHP}</h5>
          </div>
        </div>
        <div className="pokemon-detail-stats__second-row-wrapper">
          <div className="pokemon-detail-stats__second-row--weight">
            <h5>Weight</h5>
            <p>
              {data.pokemonById.weight.minimum} - {data.pokemonById.weight.maximum}
            </p>
          </div>
          <div className="pokemon-detail-stats__second-row--height">
            <h5>Height</h5>
            <p>
              {data.pokemonById.height.minimum} - {data.pokemonById.height.maximum}
            </p>
          </div>
        </div>
      </div>
      {data.pokemonById.evolutions.length > 0 && (
        <div className="pokemon-detail-evolutions">
          <h4>Evolutions</h4>
          <Grid narrow>
            {data.pokemonById.evolutions.map((evolution) => (
              <Column sm={4} key={evolution.id}>
                <CardPokemon pokemon={{ ...evolution }} />
              </Column>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
}
