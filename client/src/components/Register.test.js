import { render, screen } from '@testing-library/react';
import React from "react";
import "@testing-library/jest-dom";
import Register from './Register';
import faker from "faker";

// test('renders login reg page', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Register/i);
//   expect(linkElement).toBeInTheDocument();
// });

const getFakeUser = () => {
    return user = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        passWord: "asdf"
    }

}


describe("RegisterForm", () => {
    it("renders the basic fields", () => {
        render(<Register />);
        expect(screen.getByRole("heading", { name: "Register" })).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /firstName/i })).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /lastName/i })).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /password/i })).toBeInTheDocument();
        // expect(screen.getByRole("textbox", { name: /confPass/i })).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /address/i })).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /city/i })).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /state/i })).toBeInTheDocument();
        expect(screen.getByRole("spinbutton", { name: /zip_code/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { type: /submit/i })).toBeInTheDocument();
        // expect(screen.getByRole("textbox", { name: /description/i })).toBeInTheDocument();
        // expect(screen.getByRole("spinbutton", { name: /servings/i })).toBeInTheDocument();
        // expect(screen.getByRole("button", { name: /add ingredient/i })).toBeInTheDocument();
        // expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    });
    it("accepts valid inputs", () => {
        render(<Register />);


    })

});