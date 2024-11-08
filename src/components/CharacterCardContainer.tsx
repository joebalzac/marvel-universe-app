import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const CharacterCardContainer = ({ children }: Props) => {
  return (
    <div style={{ overflow: "hidden", borderRadius: "10px" }}>{children}</div>
  );
};

export default CharacterCardContainer;
