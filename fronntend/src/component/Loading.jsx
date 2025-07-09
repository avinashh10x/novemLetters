import React, { useEffect, useState } from 'react';

function Loading() {
  const [loading, setLoading] = useState(true);
  // loading just for 3 secc
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000 * 2);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      {loading ? (
        <div className="flex w-full justify-center items-center">
          <div className="w-12 h-12 border-4 border-[#684df4] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <p className='text-xl font-bold'>No result</p>
      )}
    </div>
  );
}

export default Loading;
