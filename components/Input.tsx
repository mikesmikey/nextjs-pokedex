"use client"

import React, { useEffect, useState, useCallback } from 'react'
import lodash from 'lodash'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

interface InputProps extends React.ComponentPropsWithoutRef<"form"> {
    pokemons: Pokemon[]
}
export default function Input({ pokemons }: InputProps) {
    const [inputText, setInputText] = useState('')
    const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([])
    const router = useRouter()
    const pathName = usePathname()
    const regex = new RegExp(`^/pokemon`)
    const isSubPath = pathName.match(regex)

    const inputDebonce = useCallback(lodash.debounce((value: string) => {
        //TODO: implement suggest pokemons
        filterPokemons(value)
    }, 300), [])

    const filterPokemons = useCallback((inputValue: string) => {
        //TODO: implement suggest pokemons
        const regex = new RegExp(`^${inputValue}`, "i");
        setFilteredPokemons(pokemons.filter((poke) => poke.name.match(regex)))
    }, [])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const found = pokemons.filter((poke) => poke.name.toLowerCase() === inputText.toLowerCase())[0]
        if (found) {
            isSubPath ? router.push(`${found.id}`) : router.push(`pokemon/${found.id}'`)
        }
        //TODO: implement not found text
        console.log('not found');

    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value)
        inputDebonce(e.target.value.trim())
    }

    return (
        <form className='relative' onSubmit={handleSubmit}>
            <input type="text" value={inputText} onChange={handleInputChange} />
            <div className='absolute bottom-0 translate-y-full left-0 flex flex-col bg-white gap-2 max-h-[200px] overflow-y-scroll'>
                {filteredPokemons.map((poke) => <Link key={poke.id} href={isSubPath ? `${poke.id}` : `pokemon/${poke.id}`}>{poke.name}</Link>)}
            </div>
            <input type="submit" hidden />
        </form>
    )
}
