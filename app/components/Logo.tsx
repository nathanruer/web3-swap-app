'use client';

import { useRouter } from "next/navigation";
import { GiSpaceship } from "react-icons/gi"

const Logo = () => {
  const router = useRouter();

  return ( 
    <div className="flex gap-1 items-center cursor-pointer hover:opacity-80
    hover:scale-110 transition" 
    onClick={() => router.push('/')}>
      <GiSpaceship color="white" size={25} />
      <p className="hidden sm:block text-white font-semibold">NATHAN</p>
    </div>
   );
}
 
export default Logo;
