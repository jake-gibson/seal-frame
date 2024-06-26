'use client';

import React, { useState } from 'react';
import { encrypt, decrypt } from '../utilities/encryption';
import { useRouter } from 'next/navigation';

const WagerMaker = () => {
  const [link, setLink] = useState<string | null>(null);

  const newQuestion = () => {
    const question = (document.querySelector('#question') as HTMLInputElement)
      .value;

    // const { iv, encryptedData } = encrypt(question);
    // console.log(iv, encryptedData);
    // console.log(decrypt({ iv: iv, encryptedData: encryptedData }));

    const hexQuestion = Buffer.from(question, 'utf8').toString('hex');

    setLink(
      `${process.env.NEXT_PUBLIC_SITE_URL}/question/page-1/${hexQuestion}`
    );
  };

  return (
    <>
      <div className="flex flex-col items-center border-2 border-green-700 rounded w-3/5 h-1/4 p-5 bg-slate-600 font-mono mb-5">
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
          className="rounded border-0 bg-green-500 text-white px-2 w-30"
        >
          Build Frame
        </button>
      </div>
      {link && (
        <div className="flex flex-col justify-center items-center border border-white rounded w-3/6 h-1/6 p-5 bg-slate-500 font-mono">
          <p className="text-left italic mb-2 self-start text-white text-sm">
            Here is your link:
          </p>
          <span className="flex items-center justify-around w-full">
            <div className="rounded text-xs px-3 text-slate-600 w-9/12 h-full overflow-scroll bg-slate-200">
              {link}
            </div>
            <button
              className="bg-slate-200 px-2 text-sm rounded h-4/5"
              onClick={() => navigator.clipboard.writeText(link)}
            >
              Copy
            </button>
          </span>
        </div>
      )}
    </>
  );
};

export default WagerMaker;
