"use client";
import { GlobalContextProvider } from "@/context/GlobalContext";
import Footer from "./Footer/Footer";
import { ThemeProvider } from "./ThemeProvider";
import Navbar from "./Navbar/Navbar";

const App = ({ children }) => {


  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <GlobalContextProvider>
        <Navbar />
        {children}
        <Footer />
      </GlobalContextProvider>
    </ThemeProvider>
  );
};

export default App;
