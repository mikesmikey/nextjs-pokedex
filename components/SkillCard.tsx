import React from 'react'
import Card from './Card'

export default function SkillCard({ name, type, damage }: Skill) {
  return (
    <Card className='shadow-md w-40 flex flex-col gap-2 justify-center items-center'>
      <div className='flex flex-col gap-0 justify-center items-center'>
        <span className='text-xs'>{type}</span>
        <h4 className='text-base font-semibold'>{name}</h4>
      </div>
      <div className='flex flex-col gap-2 justify-center items-center'>
        <h2 className='text-3xl font-bold'>{damage}</h2>
        <span className='text-xs'>DAMAGE</span>
      </div>
    </Card>
  )
}
