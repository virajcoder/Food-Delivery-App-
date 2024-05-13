const currYear = new Date().getFullYear();

function Footer() {
  return (
    <>
      <div className="div bg-zinc-100 py-3 mt-20">
        <div className="top max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="first flex flex-col sm:flex-row justify-between items-center">
            <div className="left text-lg text-slate-700 px-6 py-3 font-bold leading-[2rem] ">
              For better experience, download the Swiggy app now
            </div>
            <div className="right flex space-x-4">
              <img className='w-[150px] h-[45px]' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png" alt="" />
              <img className='w-[150px] h-[45px]' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="div bg-black text-white pb-10 pt-10">
        <div className="bottom max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="second grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="first">
              <p className='text-lg'>Swiggy</p>
              <p className='text-gray-400'>Copyright &copy; {currYear}</p>
              <p className='text-gray-400'>Made with 💗 by <strong>Viraj Singh</strong></p>
            </div>
            <div className="second">
              <p className='text-lg pb-2'>Company</p>
              <p className='text-gray-400 pb-2'>About</p>
              <p className='text-gray-400 pb-2'>Careers</p>
              <p className='text-gray-400 pb-2'>Team</p>
              <p className='text-gray-400 pb-2'>Swiggy One</p>
              <p className='text-gray-400 pb-2'>Swiggy Instamart</p>
              <p className='text-gray-400 pb-2'>Swiggy Genie</p>
            </div>
            <div className="third">
              <p className='text-lg pb-2'>Contact Us</p>
              <p className='text-gray-400 pb-2'>Help & Support </p>
              <p className='text-gray-400 pb-2'>Partner with us</p>
              <p className='text-gray-400 pb-2'>Ride with us </p>
              <p className='text-lg pb-2'>Legal </p>
              <p className='text-gray-400 pb-2'>Terms & Conditions</p>
              <p className='text-gray-400 pb-2'>Cookie Policy</p>
              <p className='text-gray-400 pb-2'>Privacy Policy</p>
            </div>
            <div className="forth">
              <p className='text-lg pb-2'>We Deliver to:</p>
              <p className='text-gray-400 pb-2'>Bangalore</p>
              <p className='text-gray-400 pb-2'>Gurgaon</p>
              <p className='text-gray-400 pb-2'>Hyderabad</p>
              <p className='text-gray-400 pb-2'>Delhi</p>
              <p className='text-gray-400 pb-2'>Mumbai</p>
              <p className='text-gray-400 pb-2'>Pune</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;