import { createState, useHookstate } from "@hookstate/core";

const dialogStore = createState(false);

export const useLoginDialog = () => {
  const store = useHookstate(dialogStore);

  return {
    get isOpen() {
      return store.get();
    },
    open() {
      // TODO: should this just be a literal value of a function (() => true)?
      store.set(true);
    },
    close() {
      // TODO: should this just be a literal value of a function (() => false)?
      store.set(false);
    },
  };
};
