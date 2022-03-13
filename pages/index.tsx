import { Button } from '@nextui-org/react'
import type { NextPage } from 'next'
import { Layout } from '../components/layouts'

const Home: NextPage = () => {
  return (
    <Layout title='Listado de Pokémon'>
      <Button>
        Hola mundo
      </Button>
    </Layout>
  )
}

export default Home
