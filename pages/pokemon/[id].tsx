import { GetStaticPaths,  NextPage } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts"
import { Pokemon } from "../../interfaces";
import { localFavorites } from "../../utils";
import { useState } from "react";
import confetti from 'canvas-confetti'
import { getPokemonInfo } from "../../utils/getPokemonInfo";

type Props = {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {
  const [isInFavorites, setIsInfavorites] = useState(localFavorites.exisInFavorites(pokemon.id))

  const onToggleFavorites = () => {
    localFavorites.toggleFavorites(pokemon.id)
    setIsInfavorites(!isInFavorites) 

    if (isInFavorites) return

    confetti({
      zIndex: 100,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin:{
        x: 1,
        y: 0,
      }
    });
  }
  
  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{marginTop: '5px'}} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{padding: '30px'}}>
            <Card.Body>
              <Card.Image src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png'} alt={pokemon.name} width="100%" height={200} />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between'}}>
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button color="gradient" ghost={!isInFavorites} onClick={onToggleFavorites}>
                  <Text>{(isInFavorites) ? 'En Favoritos' : 'Guardar en Favoritos'}</Text>
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100} />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
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
  const pokemon = await getPokemonInfo(id);
  return {
    props: {
      pokemon
    },
  }
}

export default PokemonPage
