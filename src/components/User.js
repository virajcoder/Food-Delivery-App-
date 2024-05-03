import { useEffect, useState } from 'react';

const User = ({ name, location }) => {
  const [count, setCount] = useState(0);
  const [count2] = useState(1);

  useEffect(() => {
    // * API call
    // async function getUserInfo() {
    // }
  }, []);

  return (
    <div className="user-card m-4 p-4 bg-gray-50 rounded-lg">
      <h1>Count: {count}</h1>
      <button onClick={() => {
        setCount(count+1)
      }}>Count </button>
      <h1>Count2: {count2}</h1>
      <h2>Name: {name}</h2>
      <h3>Location: {location}</h3>
      <h4>Contact: 8090838832</h4>
    </div>
  );
};

export default User;
