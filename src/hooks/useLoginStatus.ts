import { create } from 'zustand';

export type LoginStatus = 'authenticated' | 'unauthenticated' | 'loading';

interface State {
  loginStatus: LoginStatus;
}

interface Action {
  setLoginStatus: (loginStatus: LoginStatus) => void;
}

const initialState = {
  loginStatus: 'unauthenticated' as LoginStatus,
};

const useLoginStatus = create<State & Action>((set) => ({
  ...initialState,
  setLoginStatus: (loginStatus: LoginStatus) => set({ loginStatus }),
}));

export default useLoginStatus;
