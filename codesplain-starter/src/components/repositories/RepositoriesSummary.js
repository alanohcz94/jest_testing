import { StarIcon } from '@primer/octicons-react';

function RepositoriesSummary({ repository }) {
  const { stargazers_count, open_issues, forks, language } = repository;

  // method 1
  // console.log(repository);

  // method 2 use debugger then open console until debugger is removed the code will always pause at debugger
  // debugger; 

  // method 3 use Dev tool Components click on content to see the data passed into the component

  // method 4 use Inspect "Network" tab and "Preview" tab the API call you want to see what was returned

  return (
    <div className="flex flex-row gap-4 text-gray-700">
      <div>
        <StarIcon aria-label="stars" size={16} /> {stargazers_count}
      </div>
      <div>{open_issues} issues need help</div>
      <div>{forks} Forks</div>
      <div>{language || ""}</div>
    </div>
  );
}

export default RepositoriesSummary;
