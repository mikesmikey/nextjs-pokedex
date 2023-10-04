import React from 'react'

export default function Element({ type }: { type: string }) {
    return (
        <div className="aspect-square w-20 bg-green-300 flex items-center justify-center rounded-full">{type}</div>
    )
}
