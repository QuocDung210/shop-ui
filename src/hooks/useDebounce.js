// import { useEffect, useState } from 'react';

// function useDebounce(value, delay) {
//     const [debounceValue, setDebounceValue] = useState(value);

//     useEffect(() => {
//         const handleSetDebounce = setTimeout(() => setDebounceValue(value), delay);
//         return () => clearTimeout(handleSetDebounce);
//     }, [value, delay]);
//     return debounceValue;
// }

// export default useDebounce;

import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debounce, setDebounce] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebounce(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debounce.toString();
}

export default useDebounce;
