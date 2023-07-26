import React from 'react'
import Header from './Header'
import SupportCard from './SupportCard'
import { S1 ,S2,S3} from "../assets/img/index";

const Support = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-white">
    <Header />
    <h3 className='underline text-3xl font-medium text-green-700'>Support</h3>
    <div className='flex flex-row p-5 '>
        <SupportCard image={S1} content="User Guide" description=" Get step-By-Step"/>
        <SupportCard image={S2} content="Common Issues" description="Frequently asked Question and answers"/>
        <SupportCard image={S3} content="Contact Us" description=""/>
    </div>
    </div>
  )
}

export default Support