import { useState, useCallback } from 'react';

// https://medium.com/trabe/catching-asynchronous-errors-in-react-using-error-boundaries-5e8a5fd7b971
const useAsyncError = () => {
  const [_, setError] = useState();
  return useCallback(
    e => {
      setError(() => {
        throw e;
      });
    },
    [setError],
  );
};

export default useAsyncError;
