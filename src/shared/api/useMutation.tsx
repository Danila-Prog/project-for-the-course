"use client";

import { useState, useCallback } from "react";
import { StateSetter } from "../types";

/**
 * Возвращаемый тип для хука useMutation.
 * @template Data Тип данных, возвращаемых мутацией.
 * @template Variables Тип аргументов, передаваемых в функцию мутации.
 */
type UseMutationReturn<Data, Variables> = {
  data?: Data;
  setData: StateSetter<Data | undefined>; // Для ручной установки данных, если нужно
  isError: boolean;
  isSuccess: boolean; // Добавили isSuccess
  isLoading: boolean;
  error?: Error;
  mutate: (variables: Variables) => Promise<Data | undefined>; // Функция для запуска мутации
  reset: () => void; // Функция для сброса состояния
};

/**
 * Хук для выполнения асинхронных мутаций (POST, PUT, PATCH, DELETE).
 * Он предоставляет состояние загрузки, ошибки и данных,
 * а также функцию для ручного запуска мутации.
 *
 * @template Data Тип данных, возвращаемых мутацией.
 * @template Variables Тип аргументов, передаваемых в функцию мутации.
 * @param {function(Variables): Promise<Data>} mutationFn Асинхронная функция, которая выполняет мутацию.
 * @param {object} [options] Опции для хука.
 * @param {function(Data): void} [options.onSuccess] Колбэк, вызываемый при успешном завершении мутации.
 * @param {function(Error): void} [options.onError] Колбэк, вызываемый при ошибке мутации.
 * @param {function(): void} [options.onSettled] Колбэк, вызываемый после завершения мутации (успех или ошибка).
 * @returns {UseMutationReturn<Data, Variables>} Объект со состоянием мутации и функцией для её запуска.
 */

export const useMutation = <Data, Variables = void>(
  mutationFn: (variables: Variables) => Promise<Data>,
  options?: {
    onSuccess?: (data: Data) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
  },
): UseMutationReturn<Data, Variables> => {
  const [data, setData] = useState<Data | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Инициализация isSuccess
  const [error, setError] = useState<Error | undefined>(undefined);

  // Функция для сброса состояния мутации
  const reset = useCallback(() => {
    setData(undefined);
    setIsLoading(false);
    setIsError(false);
    setIsSuccess(false); // Сбрасываем isSuccess
    setError(undefined);
  }, []);

  const mutate = useCallback(
    async (variables: Variables) => {
      setIsLoading(true);
      setIsError(false);
      setIsSuccess(false);
      setError(undefined);

      try {
        const result = await mutationFn(variables);
        setData(result);
        setIsSuccess(true); // Устанавливаем isSuccess в true при успехе
        options?.onSuccess?.(result);
        return result;
      } catch (e) {
        const err = e instanceof Error ? e : new Error(String(e));
        setError(err);
        setIsError(true);
        options?.onError?.(err);
        return undefined; // Возвращаем undefined при ошибке
      } finally {
        setIsLoading(false);
        options?.onSettled?.();
      }
    },
    [mutationFn, options],
  );

  return {
    data,
    setData,
    isError,
    isSuccess, // Возвращаем isSuccess
    isLoading,
    error,
    mutate,
    reset,
  };
};
