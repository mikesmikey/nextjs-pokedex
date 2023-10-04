import { getPokemons } from "@/apis/pokemon.api"
import Input from "@/components/Input"
import Image from "next/image"

import LogoImg from '@/assets/logo.png'

export default async function Home() {
  const pokemons = await getPokemons()
  return (
    <main className="h-screen flex flex-col items-center justify-center gap-6 text-white">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-9xl font-thin">Pokédex</h1>
        <h4 className="text-2xl font-light">A Database for 1st Generation Pokemons</h4>
      </div>
      <Input className="max-w-[500px] w-full" pokemons={pokemons} />
    </main>
  )
}