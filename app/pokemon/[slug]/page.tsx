import { getPokemon, getPokemons } from "@/apis/pokemon.api";
import SkillCard from "@/components/SkillCard";
import Card from "@/components/Card";
import Element from "@/components/Element";
import Image from "next/image";
import Link from "next/link";
import EvoCard from "@/components/EvoCard";

export default async function Page({ params }: { params: { slug: string } }) {
    const pokemon: Pokemon = await getPokemon(decodeURIComponent(params.slug))
    return <div className="flex gap-10">
        <div className="flex flex-col gap-4 min-w-[100px]">
            <div className="relative mb-8">
                <Card className="relative">
                    <div className="relative aspect-square w-48">
                        {pokemon.image ? <Image className="object-contain" src={pokemon.image} alt={pokemon.name.toLowerCase()} fill /> : null}
                    </div>
                    <p className="absolute right-2 top-2">#{pokemon.number}</p>
                </Card>
                <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 
                shadow-lg bg-gray-100  rounded-lg py-2 px-4 min-w-[270px] max-w-[270px] 
                text-center">
                    <h3 className="text-3xl font-semibold text-black py-2 px-4 uppercase">{pokemon.name}</h3>
                </div>
            </div>
            <Card>
                <h6 className="font-semibold">MAX CP: {pokemon.maxCP}</h6>
            </Card>
            <Card>
                <h6 className="font-semibold">FLEE RATE: {pokemon.fleeRate}</h6>
            </Card>
            <Card title="Evolution Requirements">
                {pokemon.evolutionRequirements ?
                    <div className="flex flex-col gap-0">
                        <p className="m-0">{pokemon.evolutionRequirements.name}</p>
                        <span className="text-xs font-light text-gray-500">x{pokemon.evolutionRequirements.amount}</span>
                    </div>
                    :
                    <p className="text-gray-300 font-light">cannot evole any further</p>
                }
            </Card>
            <Card className="" title="Evolutions">
                {pokemon.evolutionRequirements ?
                    pokemon.evolutions?.map((evo) => <Link key={evo.id} href={`${evo.id}`}><EvoCard {...evo} /></Link>)
                    :
                    <p className="text-gray-300 font-light">cannot evole any further</p>
                }
            </Card>
        </div>
        <div className="flex flex-col gap-4 min-w-[600px]">
            <Card>
                <div className="flex flex-col">
                    <h5 className="text-lg font-semibold">Classification</h5>
                    <h6 className="text-xl">{pokemon.classification}</h6>
                </div>
                <div className="flex gap-6">
                    <div>
                        <h5 className="text-lg font-semibold">Weight</h5>
                        <p>{`min - ${pokemon.weight?.minimum}`}</p>
                        <p>{`max - ${pokemon.weight?.maximum}`}</p>
                    </div>
                    <div>
                        <h5 className="text-lg font-semibold">Height</h5>
                        <p>{`min - ${pokemon.height?.minimum}`}</p>
                        <p>{`max - ${pokemon.height?.maximum}`}</p>
                    </div>
                </div>
            </Card>
            <Card title="Types">
                <div className="w-fit">
                    <div className="grid grid-cols-6 gap-4">
                        {pokemon.types?.map((type, index) => <Element key={`${type}-${index}`} type={type} />)}
                    </div>
                </div>
            </Card>
            <Card title="Resistant">
                <div className="w-fit">
                    <div className="grid grid-cols-6 gap-4">
                        {pokemon.resistant?.map((type, index) => <Element key={`${type}-${index}`} type={type} />)}
                    </div>
                </div>
            </Card>
            <Card title="Fast Attack Skills">
                <div className="grid grid-cols-3 gap-4">
                    {pokemon.attacks?.fast.map((skill: Skill, index) =>
                        <SkillCard key={`${skill.name}${index}`} name={skill.name} type={skill.type} damage={skill.damage} />)}
                </div>
            </Card>
            <Card title="Special Attack Skills">
                <div className="grid grid-cols-3 gap-4">
                    {pokemon.attacks?.special.map((skill: Skill, index) =>
                        <SkillCard key={`${skill.name}${index}`} name={skill.name} type={skill.type} damage={skill.damage} />)}
                </div>
            </Card>
        </div>
    </div>
}

export async function generateStaticParams() {
    //TODO: change an any type to pokemon interface
    const pokemons = await getPokemons()
    return pokemons.map((pokemon: any) => ({
        slug: pokemon.id,
    }))
}