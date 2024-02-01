import { ReactNode, FC } from "react";
import { useMediaQuery } from "react-responsive";

interface MobileProps {
  children: ReactNode;
}

const Mobile: FC<MobileProps> = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  return <>{isMobile && children}</>;
};

interface PCProps {
  children: ReactNode;
}

const PC: FC<PCProps> = ({ children }) => {
  const isPc = useMediaQuery({
    query: "(min-width:768px)",
  });

  return <>{isPc && children}</>;
};

export { Mobile, PC };
