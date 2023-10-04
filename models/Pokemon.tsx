interface Pokemon {
    id: string;
    number?: string;
    name: string;
    weight?: {
        minimum: string;
        maximum: string;
    };
    height?: {
        minimum: string;
        maximum: string;
    };
    classification?: string;
    types?: [
        string
    ];
    resistant?: [
        string
    ];
    attacks?: {
        fast: [Skill];
        special: [Skill]
    };
    weaknesses?: [
        string
    ];
    fleeRate?: number;
    maxCP?: number;
    evolutionRequirements?: EvolutionRequirements;
    evolutions?: [
        {
            id: string;
            name: string;
        }
    ]
    image?: string;
}