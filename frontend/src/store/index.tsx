import kekkonen from '../lib/kekkonen';

interface AppState {
  searchText: string;
  notifications: string[],
}

export type AppAction = ['search', string] | ['addNotification', string];

function appStateReducer(state: AppState, action: AppAction) {
  switch (action[0]) {
    case 'search':
      return { ...state, searchText: action[1] };
    case 'addNotification':
      return { ...state, notifications: [...state.notifications, action[1]] };
    default:
      return state;
  }
}
export const store = kekkonen(appStateReducer, () => ({
  searchText: '',
  notifications: [],
}));
