const Error = () => {
  return (
    <div className='w-full h-screen flex flex-col gap-4 justify-center items-center px-4'>
      <p className='w-full max-w-80 text-center'>
        Something went wrong please go to auth page. Click
        <a className='mx-1 underline inline-block' href='/api/auth/signin'>
          here
        </a>
      </p>
    </div>
  )
}

export default Error
