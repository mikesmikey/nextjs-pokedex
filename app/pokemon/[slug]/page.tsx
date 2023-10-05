import { getPokemon, getPokemons } from "@/apis/pokemon.api";
import SkillCard from "@/components/SkillCard";
import Card from "@/components/Card";
import Element from "@/components/Element";
import Image from "next/image";
import Link from "next/link";
import EvoCard from "@/components/EvoCard";
import { TypeColor } from "@/constants/TypeColor";

export default async function Page({ params }: { params: { slug: string } }) {
    const pokemon: Pokemon = await getPokemon(decodeURIComponent(params.slug))

    return <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full md:w-fit p-4 md:p-0">
        <div className="flex flex-col items-center gap-4 w-full lg:min-w-[100px]">
            <div className="relative mb-8 w-fit md:w-full">
                <Card className="relative">
                    <div className="relative aspect-square w-48">
                        {pokemon.image ? <Image className="object-contain" src={pokemon.image} alt={pokemon.name.toLowerCase()} fill /> : null}
                    </div>
                    <p className="absolute right-3 top-2 font-light text-gray-600">#{pokemon.number}</p>
                </Card>
                <div className={`absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 
                shadow-lg bg-gray-100  rounded-sm py-2 px-4 min-w-[270px] max-w-[270px] 
                text-center bg-gradient-to-r ${pokemon.types? TypeColor[pokemon.types[0]] : ''}`}>
                    <h3 className="text-3xl font-light text-white py-2 px-4 uppercase">{pokemon.name}</h3>
                </div>
            </div>
            <Card className="w-full">
                <div className="flex justify-between items-center">
                    <h6 className="text-lg font-medium">MAX CP :</h6>
                    <h6 className="text-2xl text-primary">{pokemon.maxCP}</h6>
                </div>
            </Card>
            <Card className="w-full">
                <div className="flex justify-between items-center">
                    <h6 className="text-lg font-medium">FLEE RATE :</h6>
                    <h6 className="text-2xl text-primary">{pokemon.fleeRate}</h6>
                </div>
            </Card>
            <Card className="w-full" title="Evolution Requirements">
                {pokemon.evolutionRequirements ?
                    <div className="flex flex-col gap-0">
                        <p className="m-0">{pokemon.evolutionRequirements.name}</p>
                        <span className="text-xs font-light text-gray-500">x{pokemon.evolutionRequirements.amount}</span>
                    </div>
                    :
                    <p className="text-gray-300 font-light">none</p>
                }
            </Card>
            <Card className="w-full" title="Evolutions">
                {pokemon.evolutionRequirements ?
                    pokemon.evolutions?.map((evo) => <Link key={evo.id} href={`${evo.id}`}><EvoCard {...evo} /></Link>)
                    :
                    <p className="text-gray-300 font-light">cannot evole any further</p>
                }
            </Card>
        </div>
        <div className="flex flex-col gap-4 w-full md:min-w-[400px] lg:min-w-[600px]">
            <Card>
                <div className="w-full flex flex-col border-b-2 pb-2">
                    <h5 className="text-xl font-semibold">Classification</h5>
                    <h6 className="text-2xl">{pokemon.classification}</h6>
                </div>
                <div className="flex gap-6">
                    <div>
                        <h5 className="text-xl font-semibold">Weight</h5>
                        <p>{`min - ${pokemon.weight?.minimum}`}</p>
                        <p>{`max - ${pokemon.weight?.maximum}`}</p>
                    </div>
                    <div>
                        <h5 className="text-xl font-semibold">Height</h5>
                        <p>{`min - ${pokemon.height?.minimum}`}</p>
                        <p>{`max - ${pokemon.height?.maximum}`}</p>
                    </div>
                </div>
            </Card>
            <Card title="Types">
                <div className="w-fit">
                    <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
                        {pokemon.types?.map((type, index) => <Element key={`${type}-${index}`} type={type} />)}
                    </div>
                </div>
            </Card>
            <Card title="Resistant">
                <div className="w-fit">
                    <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
                        {pokemon.resistant?.map((type, index) => <Element key={`${type}-${index}`} type={type} />)}
                    </div>
                </div>
            </Card>
            <Card title="Fast Attack Skills">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {pokemon.attacks?.fast.map((skill: Skill, index) => {
                        if (!skill.name || !skill.type || !skill.damage)
                            return null
                        return <SkillCard key={`${skill.name}${index}`} name={skill.name} type={skill.type} damage={skill.damage} />
                    })
                    }
                </div>
            </Card>
            <Card title="Special Attack Skills">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {pokemon.attacks?.special.map((skill: Skill, index) => {
                        if (!skill.name || !skill.type || !skill.damage)
                            return null
                        return <SkillCard key={`${skill.name}${index}`} name={skill.name} type={skill.type} damage={skill.damage} />
                    })
                    }
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