import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders 3 list', () => {
  render(<App />);
  const listitems = screen.getAllByRole('listitem');
  expect(listitems).toHaveLength(3);
});

test('renders title', () => {
  render(<App />);
  const title = screen.getByTestId('mytestid');
  expect(title).toBeInTheDocument();
});
test('renders a + b', () => {
  render(<App />);
  const add = screen.getByTitle('sum');
  expect(add.textContent).toEqual('6');
});

