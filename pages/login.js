'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useCallback } from "react";
import Particles from "react-particles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

export default function Login() {
  const [currentImage, setCurrentImage] = useState('/images/SUIS-Logo.png');
  const alternateImage = '/images/RPS-Logo.png';
  const [isImageFading, setIsImageFading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsImageFading(true); // Trigger the fade-out effect
      setTimeout(() => {
        setCurrentImage(currentImage === '/images/SUIS-Logo.png' ? alternateImage : '/images/SUIS-Logo.png');
        setIsImageFading(false); // Trigger the fade-in effect
      },300); // Adjust the timing to match your transition duration
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentImage, alternateImage]);

  

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadSlim(engine);
}, []);

const particlesLoaded = useCallback(async container => {
    console.log(container);
}, []);
  return (
    <div className="flex flex-wrap justify-around items-center bg-gradient-to-b from-black via-login-primary to-black h-screen w-screen -ml-8">
      <div className='flex flex-col items-center z-10'>

      <div className="w-96 h-fit bg-black bg-opacity-70 shadow-2xl p-6 rounded-2xl text-white z-10">
        
        <div className='flex justify-center '> 
        <Image
        className={`transition-opacity ${isImageFading ? 'opacity-0 ' : 'opacity-100'}`}
        src={currentImage}
        width={200}
        height={200}
        alt="SUIS Logo & RPS Logo"/>
        </div>
        
        <form>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="username">
              Username
            </label>
            <input
              className="w-full py-2 px-3 rounded text-center bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full py-2 px-3 rounded text-center bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
              type={showPassword? "text":"password"}
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <div className='flex gap-2 -mt-2'>
            <input type='checkbox' onClick={()=> setShowPassword(!showPassword)}></input>
            <label>Show Password</label>
          </div>
          <div className="flex flex-col gap-5 text-center mt-4">
            <Link href="/dashboard">       
            <button
              className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-md shadow-gray-600"
              type="button"
            >
              Login
            </button>
            </Link>
            <span className='-mb-5'>v0.0.2</span>
          </div>
        </form>
      </div>
      </div>
      <div className='z-0'>
      <Particles
            id="tsparticles"
            style={{zIndex:'-1', position:'fixed', width:'100%'}}
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                    image:"url('/images/intro-logos.png')",
                    position:"90% 50%",
                    repeat:"no-repeat",
                    size:"40%",
                    opacity:"1"
                },
                fpsLimit: 120,
                interactivity: {
                    events: {

                        onHover: {
                            enable: true,
                            mode: "grab",
                        },
                        resize: true,
                    },
                    modes: {
                    
                        grab:{
                          distance: 150,
                          links: {
                           opacity: 1
                          }
                        }
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.3,
                        width: 1,
                        
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 0.5,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 1500,
                        },
                        value: 100,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    // shape: {
                    //     type: "image",
                    //     image: [
                    //       {
                    //       src: "/images/worker.png", 
              
                    //     }, {
                    //       src: "/images/programming.png", 
                     
                    //     },{
                    //       src: "/images/server.png", 
                   
                    //     },{
                    //       src: "/images/people.png", 
              
                    //     },]
                    // },
                    size: {
                        value: 2,
                    },
                },
                detectRetina: true,
            }}
        />
      </div>
    
    </div>
  )
}
