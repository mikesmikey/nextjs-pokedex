import { getPokemons } from "@/apis/pokemon.api"
import Input from "@/components/Input"
import Image from "next/image"

import LogoImg from '@/assets/logo.png'

export default async function Home() {
  const pokemons = await getPokemons()
  return (
    <main className="h-screen flex flex-col items-center justify-center gap-6">
      <Image src={LogoImg} alt="logo"/>
      <Input pokemons={pokemons} />
    </main>
  )
}