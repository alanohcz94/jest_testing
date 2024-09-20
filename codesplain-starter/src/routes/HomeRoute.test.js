import {render, screen} from '@testing-library/react'
import { setupServer} from 'msw/node'
import { rest } from 'msw';
import { MemoryRouter } from 'react-router';
import HomeRoute from './HomeRoute';
import { createServer } from '../testFolder/server';

createServer([
    {
        path: '/api/repositories',
        res: (req) => {
            const language = req.url.searchParams.get('q').split('language:')[1];
            return {
                items: [
                    {id:1, full_name: `${language}_one`},
                    {id:2, full_name: `${language}_two`}
                ]
            }
        }
    }
])

describe('Testing HomeRoute Component', () => {
    test('render two links for each language', async () => { 
        render(
            <MemoryRouter>
                <HomeRoute />
            </MemoryRouter>
        )

        const languages = [
            'javascript',
            'typescript',
            'rust',
            'go',
            'python',
            'java'
        ]

        for (let l of languages) {
            const links = await screen.findAllByRole('link', {name: new RegExp(`${l}_`)});

            expect(links).toHaveLength(2);
            expect(links[0]).toHaveTextContent(`${l}_one`)
            expect(links[1]).toHaveTextContent(`${l}_two`)
            expect(links[0]).toHaveAttribute('href', `/repositories/${l}_one`)
            expect(links[1]).toHaveAttribute('href', `/repositories/${l}_two`)
        }
     })
    
    
    
}) 
