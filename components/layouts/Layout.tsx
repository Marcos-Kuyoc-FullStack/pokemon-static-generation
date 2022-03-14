import Head from "next/head"
import { ReactNode } from "react"
import { Navbar } from "../ui"

type Props = {
  children: ReactNode,
  title?: string
}

export const Layout = ({children, title}: Props) => {
  const myTitle = (title) ? title : 'Pokemon App';

  return (
    <>
      <Head>
        <title>{myTitle}</title>
        <meta name="author" content="Marcos Kuyoc" />
        <meta name="description" content={`Información sobre el pokémon ${title}`} />
        <meta name="keywords" content={`${title} pokemon, pokedex`} />
      </Head>
      <Navbar />
      <main style={{margin: '0px'}}>
        {children}
      </main>
    </>
  )
}
