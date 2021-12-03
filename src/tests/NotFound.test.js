import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  test('Testa se a página contém um heading com o texto correspondente', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', { level: 2,
      name: /page requested not found/i });
    expect(heading).toBeInTheDocument();
  });

  test('Testa se a página contém uma imagem com o src correspondente', () => {
    render(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const alt = /pikachu crying because the page requested was not found/i;

    const image = screen.getByAltText(alt);
    expect(image.src).toBe(url);
  });
});
