import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";
import React from "react";

function renderComponent() {
    const usersMock = [
        {name: 'jane', email: 'jane@jane.com'},
        {name: 'alan', email: 'alan@jane.com'},
    ];
    render(<UserList users={usersMock}/>);

    return {usersMock};
}

describe("Testing UserList component",() => {
    test('render 1 row per user', () => { 
        // mock props users
        const usersMock = [
            {name: 'jane', email: 'jane@jane.com'},
            {name: 'alan', email: 'alan@jane.com'},
        ]
        // render component
        const {container} = render(<UserList users={usersMock}/>); // method 1
        // const {usersMock} = renderComponent() // method 2
        
        // Find the rows
        // eslint-disable-next-line
        const rows = container.querySelectorAll('tbody tr'); //method 1
        // const rows = within(screen.getByTestId('users')).getAllByRole('row'); // method 2 add data-testid to html tag

        // Assert the rows
        expect(rows).toHaveLength(2);
     })
    
    test('render the email and name of each user', () => {
        const {usersMock} = renderComponent() // method 2

        // screen.logTestingPlaygroundURL(); // This logs out what to select and how can you select you elements to perform the testing
        usersMock.forEach((u) => {
            const name = screen.getByRole('cell', {name: u.name})
            const email = screen.getByRole('cell', {name: u.email})

            expect(name).toBeInTheDocument()
            expect(email).toBeInTheDocument()
        })
    })
});