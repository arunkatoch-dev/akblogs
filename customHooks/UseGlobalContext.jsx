import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";

const UseGlobalContext = () => {
  const globalAppContext = useContext(GlobalContext);
  return globalAppContext;
};

export default UseGlobalContext;
