import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente About', () => {
  test('A página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const about = screen.getByText(/about pokédex/i);
    expect(about).toBeInTheDocument();
  });

  test('A página contém um heading h2 com o texto "About Pokédex"', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragraphs = screen.getAllByText(/pokémons/i);
    expect(paragraphs.length).toBe(2);
  });

  test('A página contém uma imagem com o link correspondente', () => {
    render(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img');
    expect(image.src).toBe(url);
  });
});
