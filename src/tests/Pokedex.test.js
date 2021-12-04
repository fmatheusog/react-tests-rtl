import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import data from '../data';
import Pokedex from '../components/Pokedex';

describe('Testa o componente Pokedex', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return { ...render(
      <Router history={ history }>
        {component}
      </Router>,
    ),
    history,
    };
  };

  beforeEach(() => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ { 25: false,
        4: false,
        10: false,
        23: false,
        65: false,
        151: false,
        78: false,
        143: false,
        148: false } }
    />);
  });

  test('Contém heading h2 com texto "encountered pokemons"', () => {
    const heading = screen.getByRole('heading', { level: 2,
      name: /encountered pokémons/i });

    expect(heading).toBeInTheDocument();
  });

  test('É exibido o próximo pokemon quando o botão é clicado', () => {
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(button);
    const pokemonName = screen.getByText(/charmander/i);
    expect(pokemonName).toBeInTheDocument();

    const EIGHT = 8;
    for (let i = 1; i <= EIGHT; i += 1) {
      userEvent.click(button);
    }

    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  test('É mostrado apenas um pokemon por vez', () => {
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons.length).toBe(1);
  });

  test('Possui os botões de filtro', () => {
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const SEVEN = 7;
    expect(filterButtons.length).toBe(SEVEN);

    const normal = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normal);

    const snorlax = screen.getByText(/snorlax/i);
    expect(snorlax).toBeInTheDocument();

    const all = screen.getByRole('button', { name: /all/i });
    expect(all).toBeInTheDocument();
  });

  test('Possui botão pra resetar o filtro', () => {
    const normal = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normal);

    const all = screen.getByRole('button', { name: /all/i });
    expect(all).toBeInTheDocument();

    userEvent.click(all);

    const button = screen.getByRole('button', { name: /próximo pokémon/i });

    const THREE = 3;
    for (let i = 1; i <= THREE; i += 1) {
      userEvent.click(button);
    }

    const ekans = screen.getByText(/ekans/i);
    expect(ekans).toBeInTheDocument();
  });
});
