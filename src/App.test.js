import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { debug } = render(<App />);
  debug();
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});