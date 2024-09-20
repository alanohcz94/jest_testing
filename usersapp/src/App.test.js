import { render, screen, within } from "@testing-library/react";
import App from "./App";
import React from "react";
import userEvent from "@testing-library/user-event";

describe('Testing App component', () => {
    test('Testing App component with UserList and UserForm', async () => {
        render(<App />);

        const nameInput = screen.getByRole('textbox', {name: /name/i});
        const emailInput = screen.getByRole('textbox', {name: /email/i});

        const button = screen.getByRole('button');

        await userEvent.type(nameInput, 'sam');
        await userEvent.type(emailInput, 'sam@mail.com');
        await userEvent.click(button);

        const name = screen.getByRole('cell', {name: 'sam'})
        const email = screen.getByRole('cell', {name: 'sam@mail.com'})

        expect(name).toBeInTheDocument()
        expect(email).toBeInTheDocument()
    })
})