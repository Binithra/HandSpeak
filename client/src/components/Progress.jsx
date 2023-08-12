import React from 'react'
import Header from './Header'
import Uncomp from './Uncomp'

import { Prog} from "../assets/img/index";

const Progress = () => {

const quiz = <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScsuynfDfMof1mqGweKLyCRz_wkZwJAydqsTMGDx5qwf5KWsQ/viewform?embedded=true" width="700" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-white">
        <Header />
        <div className='text-2xl font-semibold '>
            My Progress
        </div>
        <div className='p-3'>
            <p className='text-green-600 font-semibold'> 20% Completed</p>
        </div>
  
        <progress className="progress progress-primary bg-slate-300 shadow-lg w-80 h-10" value="40" max="100"></progress>

        

    
        
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