import React from 'react';
import SilkBackground from '../Components/SilkBackground';
import SelectBox from '../Components/SelectBox';

const PathSelect = () => {
    return (
      <>
    <div className='absolute inset-0'>
      <SilkBackground
      color="#fffcf2"
       />
    </div>
      <div className='bg-[#fffcf2] flex justify-center items-center p-8'>
        <h1 className='z-10 text-6xl font-bold text-[#fffcf2] mb-12 drop-shadow-lg'>
          Select your Organization
        </h1>
      </div>
        <div className='relative z-10 flex justify-center items-center'>
          <SelectBox />
        </div>
      </>
    )
}

export default PathSelect