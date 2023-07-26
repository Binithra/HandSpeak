import React from 'react'
import Header from './Header'
import Uncomp from './Uncomp'

import { Prog} from "../assets/img/index";
import { Progress as Progressbar } from 'flowbite-react';

const Progress = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-white">
        <Header />
        <div className='text-2xl font-semibold '>
            My Progress
        </div>
        <div className='p-3'>
            <p className='text-green-600 font-semibold'> 20% Completed</p>
        </div>
  
        <div class=" bg-gray-200 rounded-full h-12 dark:bg-gray-700 m-3 w-96">
         <div class="bg-purple-600 h-12 rounded-full dark:bg-purple-500 w-32" ></div>
        </div>

        {/* <Progressbar 
        color="Purple"
        progress={45}
        size="xl" /> */}
    
        
        <div className='flex flex-row m-8 gap-10 items-center justify-center '>
            <div>
            <p className='text-green-600 font-semibold'>
                What you have to Completed ?
            </p>
            
            <div>
                <Uncomp type='Sinhala Letters' />
                <Uncomp type='Greetings' />
            </div>
            </div>
        
        <div className='flex flex-col items-start place-items-start '> 
        <img
          src={Prog}
          alt="Logo"
          className=""
          referrerPolicy="no-referrer"
        />
        </div>
        </div>

    </div>
  )
}

export default Progress