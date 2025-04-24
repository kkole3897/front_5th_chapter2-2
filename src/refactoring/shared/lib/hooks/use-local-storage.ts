import { useState, useEffect, useCallback } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const getValue = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      console.warn(`Error getting value from localStorage for key: ${key}`);
      return initialValue;
    }
  }, [key, initialValue]);

  const [value, setValue] = useState<T>(() => {
    return getValue();
  });

  const setValueWithStorage = (newValue: React.SetStateAction<T>) => {
    const valueToStore =
      newValue instanceof Function ? newValue(value) : newValue;
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(valueToStore));

    // 같은 탭에서도 이벤트를 발생시키기 위한 커스텀 이벤트
    window.dispatchEvent(
      new StorageEvent("localStorageChange", {
        key,
      })
    );
  };

  const removeValue = () => {
    localStorage.removeItem(key);
    setValue(initialValue);

    // 같은 탭에서도 이벤트를 발생시키기 위한 커스텀 이벤트
    window.dispatchEvent(
      new StorageEvent("localStorageChange", {
        key,
      })
    );
  };

  // 초기 값 설정
  useEffect(() => {
    setValue(getValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // 스토리지 변경 이벤트 처리 (다른 탭에서의 변경)
  const handleStorageChange = useCallback(
    (e: StorageEvent) => {
      if (e.key === key) {
        const rawValue = localStorage.getItem(key);
        const newValue = rawValue ? (JSON.parse(rawValue) as T) : initialValue;
        setValue(newValue);
      }
    },
    [key, initialValue]
  );

  // 커스텀 이벤트 처리 (같은 탭에서의 변경)
  const handleCustomStorageChange = useCallback(
    (e: StorageEvent) => {
      if (e.key !== key) {
        return;
      }

      setValue(getValue());
    },
    [key, getValue]
  );

  // 다른 탭에서의 변경 감지
  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange]);

  // 같은 탭에서의 변경 감지
  useEffect(() => {
    window.addEventListener(
      "localStorageChange",
      handleCustomStorageChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "localStorageChange",
        handleCustomStorageChange as EventListener
      );
    };
  }, [handleCustomStorageChange]);

  return [
    value,
    setValueWithStorage as (value: React.SetStateAction<T>) => void,
    removeValue,
  ] as const;
};
