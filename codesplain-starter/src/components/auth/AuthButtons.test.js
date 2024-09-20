import { render, screen } from '@testing-library/react'
import AuthButtons from './AuthButtons'
import { MemoryRouter } from 'react-router'
import { createServer } from '../../testFolder/server'
import {SWRConfig} from 'swr';

async function renderComponent() {
    // SWR have a global cache for the component, this statement is to used to clear cache
    render(
        <SWRConfig value={{provider: () => new Map()}}>
            <MemoryRouter>
                <AuthButtons />
            </MemoryRouter>
        </SWRConfig>
    );

    await screen.findAllByRole('link');
}

describe('when user is not sign in', () => {
    createServer([
        {
            path: '/api/user',
            res: (req) => {
                return {
                    user: null
                }
            }
        }
    ])

    // GET '/api/user' --> { user: null }
    it('sign in and sign up are visible', async () => {
        await renderComponent()
        
        const signInButton = screen.getByRole('link', {name: /sign in/i})
        const signUpButton = screen.getByRole('link', {name: /sign up/i})

        expect(signInButton).toBeInTheDocument()
        expect(signUpButton).toBeInTheDocument()
        expect(signInButton).toHaveAttribute('href', '/signin')
        expect(signUpButton).toHaveAttribute('href', '/signup')
    })

    it('sign out is not visible', async () => {
        await renderComponent()

        const signOutButton = screen.queryByRole('link', {name: /sign out/i})

        expect(signOutButton).not.toBeInTheDocument()
    })
})

describe('when user is signed in', () => {
    createServer([
        {
            path: '/api/user',
            res: () => {
                return { user: {id: 3, email: 'asdf@asdf.com'} }
            }
        }
    ])

    // GET '/api/user' --> {user : { id: 3, email: 'somethingemail.com'}}
    it('sign in and sign up are not visible', async () => {
        await renderComponent()

        const signInButton = screen.queryByRole('link', {name: /sign in/i})
        const signUpButton = screen.queryByRole('link', {name: /sign up/i})

        expect(signInButton).not.toBeInTheDocument()
        expect(signUpButton).not.toBeInTheDocument()
    })

    it('sign out is visible', async () => {
        await renderComponent()

        const signOutButton = screen.getByRole('link', {name: /sign out/i})

        expect(signOutButton).toBeInTheDocument();
        expect(signOutButton).toHaveAttribute('href', '/signout')
    })
})