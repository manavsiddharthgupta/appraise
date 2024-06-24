import GoogleSignInBtn from '@/components/google-signin'

const SignIn = () => {
  return (
    <div className='w-full h-screen flex'>
      <div className='md:w-1/2 w-full flex justify-center items-center'>
        <div className='flex flex-col items-center'>
          <div className='py-3'>
            <h1 className='text-3xl px-2 font-bold text-center'>
              Welcome to AppRaise
            </h1>
            <p className='text-sm mt-4 text-black/60 dark:text-white/60 text-center max-w-96 px-2 mx-auto'>
              For the entrepreneurs, startup enthusiasts & developers. Build
              what users really want.
            </p>
          </div>
          <GoogleSignInBtn />
        </div>
      </div>
      <div className='md:block w-1/2 dark:bg-white bg-black hidden'>
        <div className='w-full h-full flex justify-center items-center'>
          <h1 className='dark:text-black text-white font-bold text-4xl'>
            ₐₚₚᵣₐᵢₛₑ
          </h1>
        </div>
      </div>
    </div>
  )
}

export default SignIn
