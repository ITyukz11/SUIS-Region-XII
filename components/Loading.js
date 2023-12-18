// components/Loading.js
import React from 'react';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-transparent z-30">
      {/* <div className="animate-spin rounded-full h-16 w-16 mt-20 border-t-4 border-b-4 border-black z-auto">  
   
    </div> */}
         <img className="rounded-2xl h-32 w-32 border-t-4 border-b-4 border-black z-auto" src='/images/cat-typing.gif'/> 
    </div>
  );
};

export default Loading;
