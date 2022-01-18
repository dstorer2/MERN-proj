import { render, screen } from '@testing-library/react';
import App from './App';


// test('renders login reg page', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Register/i);
//   expect(linkElement).toBeInTheDocument();
// });


describe("loading the app", () => {
  beforeEach(() => {
    render(<App />);
  })

  test('includes the login and registration headers', () => {
    expect(screen.getByRole('heading', { name: "Register" })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: "Login" })).toBeInTheDocument();
  });
});