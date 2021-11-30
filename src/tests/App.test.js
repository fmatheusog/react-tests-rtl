import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa o App.js', () => {
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

  test('Testa se o topo da aplicação contem os links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByText(/home/i);
    const aboutLink = screen.getByText(/about/i);
    const favoritesLink = screen.getByText(/favorite pokémons/i);
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });

  test('Testa se o usuário é direcionado a rota / ao clicar no botão Home', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const homeLink = screen.getByText(/home/i);

    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('Testa a rota /about ao clicar no botão About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByText(/about/i);

    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('Testa a rota /favorites ao clicar no link Pokémons Favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByText(/favorite pokémons/i);

    userEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Testa o redirecionamento para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/dkjsgjkla');

    const notFound = screen.getByText(/page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
