import React from 'react';
import SearchInput from './SearchInput';
import DatePicker from './DatePicker';
import SearchButton from './SearchButton';

const SearchTours: React.FC = () => {
  return (
    <main >
    <section className="flex flex-col justify-start items-center max-w-full w-[600px]">
  <header className="flex flex-col w-full text-lg font-bold max-w-[600px] text-zinc-800 max-md:max-w-full">
    <h1 className="gap-2.5 w-full mb-3">Search for Tours</h1>
  </header>
  <form className="w-full"> {/* Added w-full to form for better alignment */}
    <SearchInput
      label="Search for a place or activity"
      placeholder="e.g Lagos, Nigeria"
    />
    <DatePicker />
    <button className="gap-2 self-stretch px-6 py-4 mt-6 w-full text-lg leading-none text-indigo-50 bg-blue-600 rounded-lg max-md:px-5">
      Search for tours
    </button>
  </form>
</section>

    </main>
  );
};

export default SearchTours