import { render, screen } from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';
import react from 'react';

describe('Testing RepositoriesSummary Component', () => {
    it('Display information about the repository', () => {
        const repo = {
            language: 'Python',
            stargazers_count: 5,
            forks: 30,
            open_issues: 2
        };
        render(<RepositoriesSummary repository={repo}/>);

        for(let key in repo) {
            const value = repo[key]
            const element = screen.getByText(new RegExp(value));

            expect(element).toBeInTheDocument();
        }

    })
})