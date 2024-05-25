const ShimmerMenu = () => {
  return (
      <div className='flex gap-5 flex-col flex-wrap w-full justify-center items-center mt-4 mb-8'>
          {Array(3).fill("").map((_, index) =>
              <div key={index} className=' h-40 w-[55%] bg-slate-200 shadow-2xl rounded-xl mt-5 gap-5' >
                  <div className='h-1/2 bg-slate-300 m-4'></div>
                  <h1 className='bg-slate-300 h-2 w-36 m-4'></h1>
                  <h1 className='bg-slate-300 h-2 w-44 m-4'></h1>
                  <h1 className='bg-slate-300 h-2  m-4'></h1>
              </div>)}

      </div>)


}

export default ShimmerMenu;