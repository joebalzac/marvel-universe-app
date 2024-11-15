import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@chakra-ui/react";

const SortSelector = () => {
  return (
    <MenuRoot>
      <MenuTrigger />
      <MenuContent>
        <MenuItem value="..." />
      </MenuContent>
    </MenuRoot>
  );
};

export default SortSelector;
