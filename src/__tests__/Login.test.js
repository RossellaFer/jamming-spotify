import Login from "../components/Login";
import { render, screen } from "@testing-library/react";

describe("Login", () => {

    it('renders login button', async () => {
        render(<Login />);

        const loginButton = screen.getByText('LOGIN');
        expect(loginButton).toBeInTheDocument();
      });


    it('renders the Spotify logo', () => {
        render(<Login url="https://example.com" />);
        const spotifyLogo = screen.getByAltText('logo');
        expect(spotifyLogo).toBeInTheDocument();
      });

});