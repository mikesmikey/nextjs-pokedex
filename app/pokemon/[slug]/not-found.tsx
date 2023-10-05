import Image from "next/image";

import SnorlaxImg from '@/assets/snorlax.png'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center text-center'>
      <div className="relative aspect-square w-72">
      <Image src={SnorlaxImg} alt="snorlax" fill/>
      </div>
      <h1 className='text-6xl text-white font-light'>404 Pokemon Not Found!</h1>
    </div>
  )
}