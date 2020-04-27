let __value = 42;

// jest.fn() creates a spy function. () => __value is wrapped in a spy 
const isomorphicFetch = jest.fn(() => __value);

// A function to set the __value
isomorphicFetch.__setValue = v => __value = v;

// Export isomorphicFetch so that this module is used instead of actual isomorphic-fetch
export default isomorphicFetch;