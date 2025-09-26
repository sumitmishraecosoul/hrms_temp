import React from 'react'
import LoginForm from '../Components/LoginForm'
import SplitText from '../Components/SplitText'
import SilkBackground from '../Components/SilkBackground'

const Login = () => {
  return (
    <>
    <div className='absolute inset-0'>
      <SilkBackground
      color="#fffcf2"
       />
    </div>
    <div className='flex relative justify-center items-center space-x-10 h-screen w-full overflow-hidden'>
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="text-center space-y-8 flex flex-col items-center">
            <SplitText
              text="Welcome to"
              tag="h1"
              className="text-7xl font-bold text-[#eb5e28] mb-4 drop-shadow-lg"
              delay={50}
              duration={1.0}
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
            />
             <SplitText
              text="HR  Portal"
              tag="h1"
              className="text-7xl font-bold text-[#fffcf2] mb-4 drop-shadow-lg"
              delay={100}
              duration={1.2}
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
            />
          </div>
        </div>
      <div className='relative z-10 flex justify-center items-center flex-1'>
        <LoginForm />
      </div>
    </div>
    </>
  )
}

export default Login