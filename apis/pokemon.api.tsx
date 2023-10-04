import createApolloClient from "@/appollo-client";
import { gql } from "@apollo/client";

export async function getPokemons() {
    const client = createApolloClient();
    const { data } = await client.query({
        //TODO: implying for now we only have 151 pokemons
        query: gql`
        query pokemons{
            pokemons(first: 151) {
                id
                name
            }
        }
    `,
    });

    return data.pokemons
}

export async function getPokemon(id: string) {
    const client = createApolloClient();
    const { data } = await client.query({
        query: gql`
        query pokemon {
            pokemon(id: "${id}") {
                id
                number
                name
                weight {
                    minimum
                    maximum
                }
                height {
                    minimum
                    maximum
                }
                attacks {
                    fast {
                      name
                      type
                      damage
                    }
                    special {
                      name
                      type
                      damage
                    }
                }
                evolutionRequirements {
                    name
                    amount
                }
                evolutions {
                    id
                    name
                    image
                }
                classification
                types
                resistant
                weaknesses
                fleeRate
                maxCP
                maxHP
                image
            }
        }
    `,
    });
    return data.pokemon
}