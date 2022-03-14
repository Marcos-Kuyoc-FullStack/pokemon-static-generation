import { Grid } from "@nextui-org/react"
import { SmallPokemon } from "../../interfaces"
import PokemonCard from "./PokemonCard"

type Props = {
  pokemons: SmallPokemon[]
}

const PokemonList = ({pokemons}: Props) => {
  return (
    <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map((pokemon: SmallPokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        }
      </Grid.Container>
  )
}

export default PokemonList
