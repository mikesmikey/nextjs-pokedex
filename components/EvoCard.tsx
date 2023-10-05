import Image from 'next/image'
import React from 'react'

export default function EvoCard({ image, name }: Pokemon) {
    return (
        <div className='flex gap-2 p-2 rounded-md border-[1px] hover:border-primary hover:text-primary transition-colors'>
            <div className='relative w-6 aspect-square bg-gray-300'>
                {image? <Image src={image} alt='name' fill/> : null}
            </div>
            <p className=''>{name}</p>
        </div>
    )
}
