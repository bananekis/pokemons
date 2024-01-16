'use client';

import {
  Column,
  ContentSwitcher as ContentSwitch,
  Dropdown,
  Grid,
  IconSwitch,
  InlineLoading,
  OnChangeData,
  Search,
  Switch,
} from '@carbon/react';
import {
  PokemonsQuery,
  usePokemonTypesSuspenseQuery,
  usePokemonsLazyQuery,
} from '@/graphql/__generated__/types.generated';
import { TableOfContents, Workspace } from '@carbon/icons-react';
import CardPokemon from './CardPokemon';
import React, { useEffect, useState } from 'react';

enum ContentSwitchEnum {
  GRID = 'GRID',
  LIST = 'LIST',
}

type Pokemon = Exclude<PokemonsQuery['pokemons']['edges'][number], null>;
type ContentSwitchType = keyof typeof ContentSwitchEnum;

const ContentSwitcher = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<string | null>('');
  const [searchValue, setSearchValue] = useState<string | undefined>('');
  const [contentSwitchType, setContentSwitchType] = useState<ContentSwitchType>('GRID');
  const { data: pokemonTypesData } = usePokemonTypesSuspenseQuery();
  const [searchPokemons, { data: pokemonData, loading }] = usePokemonsLazyQuery({
    variables: { query: { limit: 10 } },
  });

  const isContentList = contentSwitchType === ContentSwitchEnum.LIST;

  useEffect(() => {
    searchPokemons();
  }, []);

  const handleSearch = (e: { target: HTMLInputElement; type: 'change' }) => {
    setSelectedItem(null);
    setSearchValue(e.target.value);
    setTimeout(() => {
      searchPokemons({
        variables: { query: { search: e.target.value, limit: 10 } },
      });
    }, 300);
  };

  const handleType = (e: OnChangeData<string | null>) => {
    const selectedItem = e.selectedItem;
    setSelectedItem(selectedItem);
    setSearchValue('');

    searchPokemons({
      variables: { query: { filter: { type: selectedItem }, limit: 10 } },
    });
  };

  const renderPokemons = (filterFn: (pokemon: Pokemon) => boolean, isContentList: boolean) => {
    const renderPokemonCard = (pokemon: Pokemon) => (
      <CardPokemon key={pokemon.id} pokemon={pokemon} className="card-container" />
    );

    return isContentList ? (
      <Grid narrow>
        <Column className="card-wrapper" span={16}>
          {pokemonData?.pokemons.edges.filter(filterFn).map(renderPokemonCard)}
        </Column>
      </Grid>
    ) : (
      <Grid narrow>
        {pokemonData?.pokemons.edges.filter(filterFn).map((pokemon: Pokemon) => (
          <Column sm={4} key={pokemon.id}>
            {renderPokemonCard(pokemon)}
          </Column>
        ))}
      </Grid>
    );
  };

  return (
    <>
      <ContentSwitch
        selectedIndex={0}
        onChange={(params) => setActiveIndex(params.index!)}
        size="md"
      >
        <Switch name="all" text="All" />
        <Switch name="favorites" text="Favorites" />
      </ContentSwitch>
      <div className="content-wrapper__features">
        <Search labelText={'labelText'} onChange={(e) => handleSearch(e)} value={searchValue} />
        <Dropdown
          id="default"
          label={'Select a type'}
          titleText={'titleText'}
          items={pokemonTypesData.pokemonTypes}
          onChange={(e) => handleType(e)}
          selectedItem={selectedItem}
        />
        <div>
          <ContentSwitch
            selectedIndex={0}
            onChange={(params) => setContentSwitchType(params.name as ContentSwitchType)}
            size="md"
          >
            <IconSwitch name={ContentSwitchEnum.GRID} text="Grid">
              <Workspace />
            </IconSwitch>
            <IconSwitch name={ContentSwitchEnum.LIST} text="List">
              <TableOfContents />
            </IconSwitch>
          </ContentSwitch>
        </div>
      </div>
      {loading && <InlineLoading description="Loading content..." />}
      {/* Render content based on the selected index */}
      <div className="content-wrapper__pokemon">
        {activeIndex === 0 && renderPokemons(() => true, isContentList)}
        {activeIndex === 1 &&
          renderPokemons((pokemon: Pokemon) => pokemon.isFavorite, isContentList)}
      </div>
    </>
  );
};

export default ContentSwitcher;
