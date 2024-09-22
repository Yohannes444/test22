import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import SearchTours from './components/SearchTours/SearchTours';

function App() {
  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.post('https://dev.intraversewebservices.com/api/main/v1/account/login?populate=detail', {
          email: 'abebe2@yopmail.com',
          password: 'Password.1',
        });

        // Extract the token from the response
        const token = response.data.data.token;
        localStorage.setItem('authToken', token); // Store token in localStorage
        return token;
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    login(); // Initiate login on component mount
  }, []);

  return (
    <div className="inline-flex bg-white h-[937px] py-[346px] px-[420px] justify-center items-center">
      <SearchTours />
    </div>
  );
}

export default App;
