import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router"
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts"
import { Pokemon } from "../../interfaces";

type Props = {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {
  const router = useRouter();
  //console.log(pokemon);
  
  return (
    <Layout>
      <h1>{pokemon.name}</h1>
    </Layout>
  )
}

export const getStaticPaths = (ctx: GetStaticPaths) => {
  const allPokemons = [...Array(151)]

  const result = allPokemons.map((item, index) => {
    return `${index+1}`
  })

  return {
    paths: result.map((id) => ({params: {id}})),
    fallback: false // false or 'blocking'
  };
}

type MyProps = {
  params: {
    id: string
  }
}

export const getStaticProps = async({params}: MyProps)  => {
  const {id} = params; 
  const { data } = await pokeApi.get<Pokemon>(`pokemon/${id}`);

  return {
    props: {
      pokemon: data
    }, // will be passed to the page component as props
  }
}

export default PokemonPage
