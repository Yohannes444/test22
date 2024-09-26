import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface SearchInputProps {
  label: string;
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ label, placeholder }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const cancelTokenSource = useRef<any>(null);

  const fetchSuggestions = async (query: string) => {
    const token = localStorage.getItem('authToken'); // Get token from localStorage

    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Cancelling previous request');
    }

    cancelTokenSource.current = axios.CancelToken.source();
    setLoading(true);

    try {
      const response = await axios.get(`https://dev.intraversewebservices.com/api/product/v1/package/auto-complete?q=${query}`, {
        cancelToken: cancelTokenSource.current.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { destinations } = response.data.data; // Extract destinations from response
      setSuggestions(destinations);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error('Error fetching suggestions:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);
  const handleSuggestionClick = (destinationName: string) => {
    setSearchQuery(destinationName); // Set the input value to the selected destination
    setSuggestions([]); // Clear suggestions after selection
  };
  return (
    <div className="flex flex-col w-full leading-none max-w-[600px] max-md:max-w-full">
      <label htmlFor={label.toLowerCase()} className="text-sm text-zinc-500">
        {label}
      </label>
      <input
        type="text"
        id={label.toLowerCase()}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="flex items-center py-0.5 pl-6 mt-2.5 w-full font-big text-base rounded-lg border-2 border-solid border-zinc-300  max-md:pl-5 max-md:max-w-full"
      />
      {loading && <p>Loading suggestions...</p>}
      <ul className="mt-4">
        {suggestions.map((item, index) => (
          <li key={index} className="p-2 " onClick={() => handleSuggestionClick(item.destinationName)}>
            <div className="">{item.destinationName} </div>
            {item.tags.map((tag:any, index:any) => (
              <div key={index} className="inline-block mb-2">
                <p className="bg-green-400 text-white py-1 px-3 rounded-md shadow-md hover:bg-green-500 transition duration-300">
                  {tag.tagName}
                </p>
              </div>
            ))}

            <div className="text-sm text-gray-500">
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchInput;
