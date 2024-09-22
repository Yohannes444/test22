import React from 'react';

const DatePicker: React.FC = () => (
  <div className="flex flex-col w-full leading-none max-w-[600px] max-md:max-w-full">
    <label htmlFor="datePicker" className="text-sm text-zinc-500">
      When
    </label>
    <div className="relative flex items-center mt-2.5 w-full rounded-lg border-2 border-solid border-zinc-300 text-slate-800">
      {/* Input Field */}
      <input
        type="date"
        id="datePicker"
        placeholder="Select dates"
        className="py-4 pl-6 pr-10 w-full text-base rounded-lg max-md:max-w-full"
      />
      {/* Calendar Icon */}
     
    </div>
  </div>
);

export default DatePicker;
