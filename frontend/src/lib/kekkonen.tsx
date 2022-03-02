import React, { ReactNode } from 'react';

type KekkonenContext<TState, TAction> = [TState, React.Dispatch<TAction>];

export default function kekkonen<TState, TAction>(
  reducer: React.Reducer<TState, TAction>,
  getInitialState: () => TState,
) {
  const Context = React.createContext<KekkonenContext<TState, TAction>>(
    undefined as never,
  );

  function Provider({ children }: { children?: ReactNode | undefined }) {
    const [state, dispatch] = React.useReducer(
      reducer,
      undefined,
      getInitialState,
    );
    const value: KekkonenContext<TState, TAction> = React.useMemo(
      () => [state, dispatch],
      [state, dispatch],
    );
    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    );
  }

  function useState(): TState {
    return React.useContext(Context)[0];
  }

  function useDispatch(): React.Dispatch<TAction> {
    return React.useContext(Context)[1];
  }

  return {
    Provider,
    useDispatch,
    useState,
  };
}