"use client"

import React, { useEffect, useState, useCallback } from 'react'
import lodash from 'lodash'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Pokeball from '@/assets/Pokeball.svg'
import Image from 'next/image'

interface InputProps extends React.ComponentPropsWithoutRef<"form"> {
    pokemons: Pokemon[]
}
export default function Input({ pokemons }: InputProps) {
    const [inputText, setInputText] = useState<string>('')
    const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([])
    const router = useRouter()
    const pathName = usePathname()
    const regex = new RegExp(`^/pokemon`)
    const isSubPath = pathName.match(regex)
    const [inputFocus, setInputFocus] = useState<boolean>(false)

    const handleInputFocus = useCallback((e: React.FocusEvent<HTMLInputElement, Element>, value: boolean) => {
        e.preventDefault()
        setInputFocus(value)
    }, [])

    const inputDebonce = useCallback(lodash.debounce((value: string) => {
        filterPokemons(value)
    }, 300), [])

    const filterPokemons = useCallback((inputValue: string) => {
        const regex = new RegExp(`^${inputValue}`, "i");
        setFilteredPokemons(pokemons.filter((poke) => poke.name.match(regex)))
    }, [])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const found = pokemons.filter((poke) => poke.name.toLowerCase() === inputText.toLowerCase())[0]
        if (found) {
            isSubPath ? router.push(`${found.id}`) : router.push(`pokemon/${found.id}`)
        }
        //TODO: implement not found text
        console.log('not found');
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value)
        inputDebonce(e.target.value.trim())
    }

    function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, pokemon: Pokemon) {
        setInputText(pokemon.name)
        isSubPath ? router.push(`${pokemon.id}`) : router.push(`pokemon/${pokemon.id}'`)
    }

    return (
        <form className='relative flex gap-2 p-2 rounded-xl text-black bg-white/50 focus-within:bg-white max-w-[500px] w-full shadow-md focus-within:scale-105 transition-all' onSubmit={handleSubmit}>
            <input className='appearance-none text-xl font-light focus:outline-none w-full bg-transparent'
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder='eg. charmander, bulbasaur, squirtle'
                onFocus={(e) => handleInputFocus(e, true)}
                onBlur={(e) => handleInputFocus(e, false)}
            />
            <div className={`${inputFocus ? "flex" : "hidden"} absolute -bottom-2 rounded-md translate-y-full left-0 flex-col bg-white/50 gap-2 max-h-[200px] overflow-y-scroll w-full`}>
                {filteredPokemons.map((poke) =>
                    <a
                        className='py-2 px-4 hover:bg-white font-light transition-all cursor-pointer'
                        key={poke.id} onMouseDown={(e) => handleLinkClick(e, poke)}>
                        {poke.name}
                    </a>
                )}
            </div>
            <button type='submit'><Image className='w-8 h-8 opacity-50 hover:opacity-100 transition-all' src={Pokeball} alt='pokeball' /></button>
            <input type="submit" hidden />
        </form>
    )
}
