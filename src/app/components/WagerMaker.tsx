'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const WagerMaker = () => {
  const newQuestion = () => {
    const question = (document.querySelector('#question') as HTMLInputElement)
      .value;

    // const { push } = useRouter();

    // const searchParams = new URLSearchParams({
    //   title: `${question}`,
    // });

    // push(`/question/${searchParams}`);
  };

  return (
    <div className="flex flex-col items-center border-2 border-green-700 rounded w-3/5 h-1/4 p-5 bg-slate-600 font-mono">
      <h3 className="text-left italic mb-5 self-start text-green-500">
        Make your own wager:
      </h3>
      <input
        placeholder="Enter your question here"
        type="text"
        id="question"
        className="border-white rounded w-4/5 pl-3 content-center placeholder:text-slate-400 placeholder:italic mb-2 outline-none"
      ></input>
      <button
        onClick={newQuestion}
        className="rounded border-0 bg-green-500 text-white px-2 w-20"
      >
        Create
      </button>
    </div>
  );
};

export default WagerMaker;
