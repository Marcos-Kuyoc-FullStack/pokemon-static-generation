import Head from "next/head"
import { ReactNode } from "react"

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
      {/* Navbar */}
      <main>
        {children}
      </main>
      <nav>

      </nav>
    </>
  )
}
