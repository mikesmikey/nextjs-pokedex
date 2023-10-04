import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import LogoImg from '@/assets/logo.png'
import Input from './Input'
import { getPokemons } from '@/apis/pokemon.api'

export default async function Navbar() {
    const pokemons = await getPokemons()
    return (
        <nav className='w-full flex justify-between items-center p-4 bg-black mb-12 sticky top-0 z-50'>
            <Link href={`/`}>
                <div className='relative h-8 w-40'>
                    <Image src={LogoImg} alt='logo' fill/>
                </div>
            </Link>
            <Input pokemons={pokemons} />
        </nav>
    )
}
