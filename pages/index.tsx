import type { GetStaticProps, NextPage } from 'next'
import { pokeApi } from '../api'
import { Layout } from '../components/layouts'
import { PokemonList } from '../components/pokemon'
import { PokemonListResponse, SmallPokemon } from '../interfaces'

interface Props {
  pokemons: SmallPokemon[]
}

const Home: NextPage<Props> = ({pokemons}) => {
  return (
    <Layout title='Listado de Pokémon'>
      <PokemonList pokemons={pokemons} />
    </Layout>
  )
}

// Solo se ejecuta del lado del servidor
// solo se ejecuta una sola vez en tiempo de compilacion para generar datos estaticos.
export const getStaticProps = async(context: GetStaticProps)  => {
  const { data } = await pokeApi.get<PokemonListResponse>('pokemon?limit=151');
  const pokemons: SmallPokemon[] = [];

  data.results.map((item, index) => {
    const id = index + 1;
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    const pokemon: SmallPokemon  = {
      id,
      name: item.name,
      url:  item.url,
      img
    }
    pokemons.push(pokemon)
  })

  return {
    props: {pokemons}, // will be passed to the page component as props
  }
}


export default Home
