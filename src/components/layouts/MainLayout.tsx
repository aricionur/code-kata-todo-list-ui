import { ReactElement, FC } from "react";
import Navbar from "../core/Navbar";

interface MainLayoutProps {
  children: React.ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default MainLayout;
