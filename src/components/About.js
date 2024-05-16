import { Component } from 'react';
import User from "./User"
import UserClass from './UserClass';
import UserContext from '../../src/utils/UserContext';
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
class About extends Component {
    constructor(props) {
      super(props);
      // console.log('Parent Constructor');
    }
  
    componentDidMount() {
      // console.log('Parent Component Did Mount');
    }
  
    render() {
      // console.log('Parent Render');
      return (
        <div className="about-page">
          <h1>About Class Component</h1>
          <div>
            loggedIn User
            <UserContext.Consumer>
              {({loggedInuser}) => <h1 className='text-xl font-bold'>{loggedInuser}</h1>}
            </UserContext.Consumer>
          </div>
          <h2>This is About Page</h2>
          <UserClass name={'First'} location={'Badvel class'} />
          <UserClass name={'Second'} location={'Badvel class'} /> 
          <UserClass name={'Third'} location={'Badvel class'} />
        </div>
      );
    }
  }
  
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
export default About;