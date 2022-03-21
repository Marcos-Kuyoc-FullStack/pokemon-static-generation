import { Grid, Card , Row, Text} from '@nextui-org/react'
import { useRouter } from 'next/router';
import { SmallPokemon } from "../../interfaces"

type Props = {
  pokemon: SmallPokemon
}

const PokemonCard = ({ pokemon }: Props) => {
  const {id, img, name} = pokemon;
  const router = useRouter();

  const onClick = () => {
    //router.push(`/pokemon/${pokemon.id}`)
    router.push(`/name/${pokemon.name}`)
  }

  return (
    <Grid key={id} xs={6} sm={2} xl={1}>
      <Card hoverable clickable onClick={onClick}>
        <Card.Body css={{ p:1 }}>
          <Card.Image src={img} width='100%' height={140} />
        </Card.Body>
        <Card.Footer>
          <Row justify='space-between'>
            <Text transform='capitalize'>{name}</Text>
            <Text>#{id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default PokemonCard;

