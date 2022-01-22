import { createState, useHookstate } from "@hookstate/core";

const loginDialogState = createState(false);

export const useLoginDialog = () => {
  const state = useHookstate(loginDialogState);

  return {
    get isOpen() {
      return state.get();
    },
    open() {
      state.set(true);
    },
    close() {
      state.set(false);
    },
  };
};
