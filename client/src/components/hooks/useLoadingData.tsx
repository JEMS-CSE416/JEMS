import { useState, useEffect } from "react";


/**
 * `useLoadingData` is a custom React hook that fetches data from an API using a provided fetch function and parameters.
 * It maintains and returns three state variables: `data`, `error`, and `loading`.
 *
 * @param fetchDataFunction - A function that fetches data from an API. This function should return a promise.
 * @param params - An array of parameters to pass to the `fetchDataFunction`. This is optional.
 *
 * @returns An object containing the following properties:
 * - `data`: The data fetched from the API. Its type is determined by the type parameter `T`. It's `undefined` by default and after a successful fetch, it will hold the fetched data.
 * - `error`: Any error that occurred while fetching the data. It's `null` by default and if an error occurs during the fetch, it will hold the error.
 * - `loading`: A boolean indicating whether the data is currently being fetched. It's `true` by default and becomes `false` once the data has been fetched.
 *
 * @template T The type of the data that will be fetched. This can be any valid TypeScript type. The default type is `any`.
 */
export const useLoadingData = <T = any>(
  fetchDataFunction: (...args: any[]) => Promise<any>,
  params: any[] = [],
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
    console.log("fetching data")
      try {
        const res = await fetchDataFunction(...params);
        setData(res);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, dependencies);

  return { data, error, loading };
};
