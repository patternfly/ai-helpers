import { createContext, useContext, useState, ReactNode } from "react";

interface ContentDrawerContextType {
  isContentDrawerOpen: boolean;
  toggleContentDrawer: () => void;
  openContentDrawer: () => void;
  closeContentDrawer: () => void;
}

const ContentDrawerContext = createContext<
  ContentDrawerContextType | undefined
>(undefined);

interface ContentDrawerProviderProps {
  children: ReactNode;
}

export const ContentDrawerProvider = ({
  children,
}: ContentDrawerProviderProps) => {
  const [isContentDrawerOpen, setIsContentDrawerOpen] = useState(false);

  const toggleContentDrawer = () => {
    setIsContentDrawerOpen(!isContentDrawerOpen);
  };

  const openContentDrawer = () => {
    setIsContentDrawerOpen(true);
  };

  const closeContentDrawer = () => {
    setIsContentDrawerOpen(false);
  };

  const value = {
    isContentDrawerOpen,
    toggleContentDrawer,
    openContentDrawer,
    closeContentDrawer,
  };

  return (
    <ContentDrawerContext.Provider value={value}>
      {children}
    </ContentDrawerContext.Provider>
  );
};

export const useContentDrawer = () => {
  const context = useContext(ContentDrawerContext);
  if (context === undefined) {
    throw new Error(
      "useContentDrawer must be used within a ContentDrawerProvider"
    );
  }
  return context;
};
