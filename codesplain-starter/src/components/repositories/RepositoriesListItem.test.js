import { render, screen} from '@testing-library/react'
import RepositoriesListItem from './RepositoriesListItem';
import {MemoryRouter} from 'react-router-dom';

function renderComponent() {
    const repo = {
        full_name: "facebook/react", 
        language: "JavaScript", 
        description: "a js library", 
        owner: {login:"facebook"}, 
        name: "react", 
        html_url: 'https://github.com/facebook/react'
    }
    render(
    <MemoryRouter>
        <RepositoriesListItem repository={repo}/>
    </MemoryRouter>
    )

    return {repo}
}

describe('Testing RepositoriesListItem Component', ()=> {
    it('shows a link to the github homepage for this repository', async () => {
        const {repo} = renderComponent();

        const img = await screen.findByRole('img', {name: repo.language})

        expect(img).toBeInTheDocument();
    })

    it('check if title has the correct href assigned to it', async () => {
        const {repo} = renderComponent();

        const link = await screen.findByRole('link', {name: new RegExp(repo.owner.login)})
        expect(link).toHaveAttribute('href',`/repositories/${repo.full_name}`);
    })

    it('check if icon for title is correct', async () => {
        const {repo} = renderComponent();

        const icon = await screen.findByRole('img', {name: repo.language});
        expect(icon).toHaveClass('js-icon');
    })
})