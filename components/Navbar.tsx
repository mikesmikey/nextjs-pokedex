import Link from 'next/link'
import React from 'react'

import Input from './Input'
import { getPokemons } from '@/apis/pokemon.api'

export default async function Navbar() {
    const pokemons = await getPokemons()
    return (
        <nav className='w-full flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center p-4 backdrop-blur-lg bg-white/30 shadow-md mb-0 md:mb-12 sticky top-0 z-50'>
            <Link href={`/`}>
                <h1 className='text-3xl font-thin text-white'>Pokédex</h1>
            </Link>
            <Input className='w-full sm:max-w-[300px] md:max-w-[400px]' pokemons={pokemons} />
        </nav>
    )
}
