// import { Component } from 'react';
// import User from "./User"
// import UserClass from './UserClass';
// import UserContext from '../../src/utils/UserContext';
// import withAuth from '../components/Auth'
// **************** function componant ***************
// const About = () => {
//     return (  
//         <div>
//             {/* <h1>About</h1> */}
//             {/* <h2>my name is Viraj singh and this is me about us page.</h2> */}
//           <User name={'Viraj Singh '} location={'Ayodhya'}/>
//         </div>
//     )
// }
// ****************END*********************

// **************** class based componant ***************
// class About extends Component {
//     constructor(props) {
//       super(props);
//       // console.log('Parent Constructor');
//     }
  
    // componentDidMount() {
    //   // console.log('Parent Component Did Mount');
    // }
  
  //   render() {
  //     // console.log('Parent Render');
  //     return (
  //       <div className="about-page">
  //         <h1>About Class Component</h1>
  //         <div>
  //           loggedIn User
  //           <UserContext.Consumer>
  //             {({loggedInuser}) => <h1 className='text-xl font-bold'>{loggedInuser}</h1>}
  //           </UserContext.Consumer>
  //         </div>
  //         <h2>This is About Page</h2>
  //         <UserClass name={'First'} location={'Badvel class'} />
  //         <UserClass name={'Second'} location={'Badvel class'} /> 
  //         <UserClass name={'Third'} location={'Badvel class'} />
  //       </div>
  //     );
  //   }
  // }
  
  // * RENDER CYCLE OF CLASS BASED COMPONENTS WHEN THE CLASS HAS TWO CHLIDREN
  
  /* 
  *  - Parent Constructor()              -- Render Phase
  *  - Parent Render()
   
  *    - First Child Constructor()
  *    - First Child Render()
  *                                      -- Render Phase
  *    - Second Child Constructor()
  *    - Second Child Render()
  
  *     <DOM UPDATED - IN SINGLE BATCH> -> Optimizes the Performance of App  -- Commit Phase
  *    - First Child ComponentDidMount()
  *    - Second Child ComponentDidMount()
  
  *  - Parent ComponentDidMount()=
  */

import { useState } from "react";
import { RiAddLargeLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import profile from '../assets/profile.jpg'

const About = () => {
    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (itemId) => {
        if (activeItem === itemId) {
            setActiveItem(null); // Collapse the clicked item if it's already active
        } else {
            setActiveItem(itemId); // Expand the clicked item
        }
    };


    const email = 'virajsinghfbd@gmail.com';
    const subject = 'Regarding [Subject]';
    const body = 'Hello,';

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return (
        <div className="main w-full flex flex-col justify-center items-center ">
            <div className="mainBodyRestaurantMenu w-full flex flex-col items-center lg:w-[60%] max-[800px]:px-3 ">
                <div className="firstresNameDetails flex justify-between w-full px-2 my-4 lg:mx-10 ">
                    <div className="left flex flex-col justify-center gap-2  rounded-xl">
                        <h1 className="name text-lg font-bold font-open  max-[900px]:w-full md:text-2xl">Viraj Singh</h1>
                        <p className=" text-sm font-semibold text-gray-500">FRONTEND WEB DEVELOPER</p>

                    </div>
                    <div className="right flex flex-col justify-around  bg-white items-center pr-2">
                        <img className="w-20 rounded-full" src={profile} alt=" viraj singh" />
                    </div>
                </div>


            </div>


            <div className="ACCORDIANS w-[90%] mb-5 flex flex-col justify-center items-center gap-1 lg:mb-10">



                <div
                    className="flex justify-between items-center px-2 bg-black/20 hover:bg-gray-300 rounded-xl mb-2 w-full py-1 max-[800px]:px-2 lg:w-[70%]"
                    onClick={() => handleItemClick("aboutme")}
                >
                    <span className="summary text-base pl-4 font-open font-bold py-1 lg:text-xl lg:p-3 ">ABOUT ME</span>
                    <span className="pr-4">{activeItem === "me" ? <RxCross2 /> : <RiAddLargeLine />}</span>
                </div>
                {activeItem === "aboutme" && (
                    <div className="flex mb-3 justify-center items-center font-sans bg-black/5 rounded-xl lg:w-[70%]">
                        <div className="content px-4 text-sm font-medium py-4 p-2">
                            Detail-oriented individual with a B.Tech in Computer Science & Engineering, looking for a Frontend Developer position in a fast-growing
                            company to utilize my technical skills and working knowledge of software applications, development and design. I want to work in a
                            competitive environment where I can enhance my skills along with facing the new Situations, learning new things.
                        </div>
                    </div>
                )}
                <div
                    className="flex justify-between items-center px-2 bg-black/20 hover:bg-gray-300 rounded-xl mb-2 w-full py-1 max-[800px]:px-2 lg:w-[70%]"
                    onClick={() => handleItemClick("skills")}
                >
                    <span className="summary text-base pl-4 font-open font-bold py-1 lg:text-xl lg:p-3 ">SKILLS</span>
                    <span className="pr-4">{activeItem === "skills" ? <RxCross2  /> : <RiAddLargeLine />}</span>
                </div>
                {activeItem === "skills" && (
                    <div className="flex mb-3 justify-around items-center font-sans bg-black/5 rounded-xl lg:w-[70%]">
                        <div className="content px-4 text-sm  p-2 flex justify-around flex-wrap gap-3 py-4 ">
                            <span className="bg-black/5 font-medium text-slate-700 rounded-md p-2 hover:bg-black/20 hover:transition-transform flex justify-center items-center  lg:mx-5">REACT JS</span>
                            <span className="bg-black/5 font-medium text-slate-700 rounded-md p-2 hover:bg-black/20 hover:transition-transform flex justify-center items-center  lg:mx-5">REDUX</span>
                            <span className="bg-black/5 font-medium text-slate-700 rounded-md p-2 hover:bg-black/20 hover:transition-transform flex justify-center items-center  lg:mx-5">JAVASCRIPT</span>
                            <span className="bg-black/5 font-medium text-slate-700 rounded-md p-2 hover:bg-black/20 hover:transition-transform flex justify-center items-center  lg:mx-5">TAILWIND</span>
                            <span className="bg-black/5 font-medium text-slate-700 rounded-md p-2 hover:bg-black/20 hover:transition-transform flex justify-center items-center  lg:mx-5">CSS3</span>
                            <span className="bg-black/5 font-medium text-slate-700 rounded-md p-2 hover:bg-black/20 hover:transition-transform flex justify-center items-center  lg:mx-5">HTML5</span>
                            <span className="bg-black/5 font-medium text-slate-700 rounded-md p-2 hover:bg-black/20 hover:transition-transform flex justify-center items-center  lg:mx-5">C & C++</span>
                            <span className="bg-black/5 font-medium text-slate-700 rounded-md p-2 hover:bg-black/20 hover:transition-transform flex justify-center items-center  lg:mx-5">DBMS</span>
                            <span className="bg-black/5 font-medium text-slate-700 rounded-md p-2 hover:bg-black/20 hover:transition-transform flex justify-center items-center  lg:mx-5">GIT</span>
                            <span className="bg-black/5 font-medium text-slate-700 rounded-md p-2 hover:bg-black/20 hover:transition-transform flex justify-center items-center  lg:mx-5">GITHUB</span>
                            <span className="bg-black/5 font-medium text-slate-700 rounded-md p-2 hover:bg-black/20 hover:transition-transform flex justify-center items-center  lg:mx-5">00PS</span>
                            <span className="bg-black/5 font-medium text-slate-700 rounded-md p-2 hover:bg-black/20 hover:transition-transform flex justify-center items-center  lg:mx-5">PROBLEM SOLVING</span>
                        </div>
                    </div>
                )}
                <div
                    className="flex justify-between items-center px-2 bg-black/20 hover:bg-gray-300 rounded-xl mb-2 w-full py-1 max-[800px]:px-2 lg:w-[70%]"
                    onClick={() => handleItemClick("socials")}
                >
                    <span className="summary text-base pl-4 font-open font-bold py-1 lg:text-xl lg:p-3 ">SOCIALS</span>
                    <span className="pr-4">{activeItem === "socials" ? <RxCross2  /> : <RiAddLargeLine />}</span>
                </div>
                {activeItem === "socials" && (
                    <div className="flex w-full mb-3 justify-center items-center font-sans bg-black/5 rounded-xl py-3 lg:w-[70%]">
                        <div className="content px-4 text-sm  p-2 flex justify-around w-full">
                            <Link to="https://www.linkedin.com/in/viraj-singh-18b1a4201/"><img className="w-10" src="https://i.postimg.cc/ydvzTRdG/2504923.png" alt="" /></Link>
                            <Link to="https://github.com/virajcoder"><img className="w-10" src="https://i.postimg.cc/DZbMSbGs/2504911.png" alt="" /></Link>
                            <Link to="https://x.com/virajsingh81246"><img className="w-10" src="https://i.postimg.cc/63dgbVwB/twitter.png" alt="" /></Link>
                            <Link to={mailtoLink}><img className="w-10" src="https://i.postimg.cc/bNv1Lf6V/10829119.png" alt="" /></Link>

                        </div>
                    </div>
                )}
                <div
                    className="flex justify-between items-center px-2 bg-black/20 hover:bg-gray-300 rounded-xl mb-2 w-full py-1 max-[800px]:px-2 lg:w-[70%]"
                    onClick={() => handleItemClick("aboutThisProject")}
                >
                    <span className="summary text-base pl-4 font-open font-bold py-1 lg:text-xl lg:p-3 ">ABOUT THIS PROJECT</span>
                    <span className="pr-4">{activeItem === "aboutThisProject" ? <RxCross2  /> : <RiAddLargeLine />}</span>
                </div>
                {activeItem === "aboutThisProject" && (
                    <div className="flex mb-3 justify-center items-center font-sans bg-black/5  hover:bg-gray-300 lg:w-[70%]">
                        <div className="content px-4 text-sm  p-2 flex flex-col justify-start gap-2">


                            <ul className="flex flex-col justify-between gap-2 lg:items-start">
                                <li>- Authentication with Dummy Json.</li>
                                <li>- Real time Swiggy API DATA of #ayodhya.</li>
                                <li>- Detailed Menu page almost same features as Swiggy.</li>
                                <li>- Payment Integration with Razorpay.</li>
                                <li>- Added LAZY LOADING in About-Me page.</li>
                                <li>- 🟢|🔴 Veg & Non Veg icon is also Dynamically used based on food.</li>
                                <li>- Every Detail/Data used is dynamically coming from Swiggy Api.</li>
                                <li>- Hosted on Netlify</li>
                                <li>- Your Location Will be at Top🔝</li>
                            </ul>
                            <div className="HEAD">
                                Tech stack used :
                            </div>
                            <ul className="flex flex-col justify-between items-start">
                                <li> - ✅ React</li>
                                <li> - ✅ Redux</li>
                                <li> - ✅ React Router v6</li>
                                <li> - ✅ Tailwind Labs CSS</li>
                                <li> - ✅ Material UI</li>
                                <li> - ✅ GitHub</li>
                                <li> - ✅ Netlify for Deployment</li>
                                <li> - ✅ Swiggy Api</li>
                                <li> - ✅ Custom Hooks</li>
                                <li> - ✅ Custom Shimmer</li>
                                <li> - ✅ React Carousel</li>
                                <li> - ✅ Lazy Loading</li>
                            </ul>

                            <div className="flex flex-col justify-between lg:items-start gap-2">
                                <div>DO CHECK IT ❤️</div>
                                <Link to="#"><button className=" bg-green-400 hover:bg-green-500 rounded-lg p-2 lg:text-xl font-semibold px-4">Live link</button></Link>
                                <Link to="https://github.com/virajcoder/Food-Delivery-App-"><button className="bg-green-400 hover:bg-green-500 rounded-lg p-2 lg:text-xl font-semibold px-4">Github link</button></Link>


                            </div>
                        </div>
                    </div>
                )}
                <div
                    className="flex justify-between items-center px-2 bg-black/20  hover:bg-gray-300 rounded-xl mb-2 w-full py-1 max-[800px]:px-2 lg:w-[70%]"
                    onClick={() => handleItemClick("resume")}
                >
                    <span className="summary text-base pl-4 font-open font-bold py-1 lg:text-xl lg:p-3 ">RESUME</span>
                    <span className="pr-4">{activeItem === "resume" ? <RxCross2  /> : <RiAddLargeLine />}</span>
                </div>
                {activeItem === "resume" && (
                    <div className="flex w-full mb-3 justify-center items-center font-sans bg-black/5 hover:bg-gray-300 px-2 rounded-xl  lg:w-[70%]">
                        <div className="content px-4 text-sm p-2 w-full rounded-xl">
                            <a className="flex justify-center items-center" href="https://drive.google.com/file/d/1lQx38sU-Z1Q4T1P7-6qbHQGCstVr6nr0/view" download="resume.pdf">
                                <button className="flex justify-center gap-2 items-center"><img className="w-6" src="https://i.postimg.cc/PqDG0cq1/1092004.png" alt="" /> <span className="font-semibold text-xl">Resume</span></button>
                            </a>
                        </div>
                    </div>
                )}





            </div>









            <div className="items w-full flex flex-col gap-5">

                {/* <ResMenu /> */}


            </div>


        </div>
    )
}




export default About;