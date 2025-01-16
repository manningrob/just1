import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserInfo {
  name: string;
  email: string;
}

interface UserInfoState {
  userInfo: UserInfo | null;
  designPrompt: string | null;
  setUserInfo: (info: UserInfo) => void;
  setDesignPrompt: (prompt: string) => void;
  clearUserInfo: () => void;
}

export const useUserInfo = create<UserInfoState>()(
  persist(
    (set) => ({
      userInfo: null,
      designPrompt: null,
      setUserInfo: (info) => set({ userInfo: info }),
      setDesignPrompt: (prompt) => set({ designPrompt: prompt.trim() || null }),
      clearUserInfo: () => set({ userInfo: null, designPrompt: null }),
    }),
    {
      name: 'user-info-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userInfo: state.userInfo,
        designPrompt: state.designPrompt
      }),
      onRehydrateStorage: () => (state) => {
        console.log('State hydrated:', state);
      }
    }
  )
);