import { useState, useEffect, useRef, useCallback } from 'react';

export const useDebounce = <T>(value: T, delay: number = 300): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
};

export const useDebouncedCallback = <T extends (...args: unknown[]) => void>(
    callback: T,
    delay: number = 300,
): T => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedCallback = useCallback(
        (...args: Parameters<T>) => {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => callback(...args), delay);
        },
        [callback, delay],
    ) as T;

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    return debouncedCallback;
};
