/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Page from './page'
import { JSX } from 'react'

import { getPokemon } from '@/apis/pokemon.api'
jest.mock('@/apis/pokemon.api', () => ({ getPokemon: jest.fn() }))
const mockedGetPokemon = getPokemon as jest.Mock<Promise<Pokemon>>

async function resolvedComponent(Component: { ({ params }: { params: { slug: string } }): Promise<JSX.Element>; (arg0: any): any },
    props: { params: { slug: string } }, mockData: {}) {
    mockedGetPokemon.mockImplementation(() => Promise.resolve(mockData as Pokemon))
    const ComponentResolved = await Component(props)
    return () => ComponentResolved
}

it('Render Charmander with fire type', async () => {
    const ComponentResolved = await resolvedComponent(Page, { params: { slug: 'not important' } }, {
        "types": [
            "Fire"
        ]
    })
    render(<ComponentResolved />)
    const elem = await screen.findByText("Fire")
    console.log(elem);
})

it('Render Bulbasaur with grass type', async () => {
    const ComponentResolved = await resolvedComponent(Page, { params: { slug: 'not important' } }, {
        "types": [
            "Grass"
        ]
    })
    render(<ComponentResolved />)
    const elem = await screen.findByText("Grass")
    console.log(elem);
})

it('Render Squirtle with water type', async () => {
    const ComponentResolved = await resolvedComponent(Page, { params: { slug: 'not important' } }, {
        "types": [
            "Water"
        ]
    })
    render(<ComponentResolved />)
    const elem = await screen.findByText("Water")
    console.log(elem);
})