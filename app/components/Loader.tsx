'use client';

import { HashLoader } from "react-spinners";

const Loader = () => {
  return ( 
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <HashLoader 
        size={150}
        color="#6528c6"
      />
    </div>
   );
}
 
export default Loader;