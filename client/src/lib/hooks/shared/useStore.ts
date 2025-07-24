import { useContext } from "react";
import { StoreContext } from "../../stores/store";

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("context used outside of provider");
  return context;
};
