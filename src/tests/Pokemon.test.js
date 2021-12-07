import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import data from '../data';

describe('Testa o componente Pokemon', () => {
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

  test('É renderizado um card com as informações do Pokemon', () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite={ false } />);
    const weightValue = data[0].averageWeight.value;
    const weightMeasurementUnit = data[0].averageWeight.measurementUnit;
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonSprite = screen.getByAltText(`${data[0].name} sprite`);

    expect(pokemonName).toHaveTextContent(/pikachu/i);
    expect(pokemonType).toHaveTextContent(/electric/i);
    expect(pokemonWeight).toHaveTextContent(`${weightValue} ${weightMeasurementUnit}`);
    expect(pokemonSprite.src).toBe(imgSrc);
  });

  test('Testa o link de navegação para mais detalhes', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite={ false }
    />);

    const link = screen.getByRole('link', { name: /more details/i });
    expect(link.pathname).toBe(`/pokemons/${data[0].id}`);

    userEvent.click(link);

    expect(history.location.pathname).toBe(`/pokemons/${data[0].id}`);
  });

  test('Testa o ícone de estrela de pokemons favoritados', () => {
    renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite
    />);

    const imgUrl = 'http://localhost/star-icon.svg';

    const starImage = screen.getByAltText(`${data[0].name} is marked as favorite`);
    expect(starImage).toBeInTheDocument();
    expect(starImage.src).toBe(imgUrl);
  });
});
