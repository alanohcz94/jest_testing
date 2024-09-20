import Hero from '../components/Hero';
import RepositoriesTable from '../components/repositories/RepositoriesTable';
import useRepositories from '../hooks/useRepositories';

function HomeRoute() {
  const data = [{Javascript: useRepositories('stars:>10000 language:javascript')}, {TypeScript: useRepositories('stars:>10000 language:typescript')},{Rust: useRepositories('stars:>10000 language:rust')},{Go: useRepositories('stars:>10000 language:go')},{Python: useRepositories('stars:>10000 language:python')},{Java: useRepositories('stars:>10000 language:java')}];

  return (
    <div>
      <Hero />
      <div className="container mx-auto py-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.map(it => {
          return (
            <RepositoriesTable
              label={`Most Popular ${Object.keys(it)}`}
              repositories={it[Object.keys(it)].data}
            />
          )
        })}
      </div>
    </div>
  );
}

export default HomeRoute;
