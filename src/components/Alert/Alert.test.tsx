import { Alert } from "./Alert";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, test } from 'vitest';


describe('<Alert />', () => {
  // Usamos beforeEach para renderizar el componente antes de cada test
  beforeEach(() => {
    render(<Alert>Alerta de prueba</Alert>);
  });

  test('debería coincidir con el snapshot', () => {
    expect(screen).toMatchSnapshot();
  });

  test('debería renderizar el contenido pasado como children', () => {
    expect(screen.getByText('Alerta de prueba')).toBeDefined();
  });

  test('debería tener la clase CSS correcta', () => {
    const alertElement = screen.getByText('Alerta de prueba');
    expect(alertElement).toHaveProperty('className', 'alert');
  });
  
  test('debug', () => {
    render(<Alert>Alerta de prueba</Alert>);
    screen.debug(); 
  });
});