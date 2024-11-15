import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@chakra-ui/react";
import { useState } from "react";

interface SortSelectorProps {
  onSelectOrder: (order: string) => void;
}

const SortSelector = ({ onSelectOrder }: SortSelectorProps) => {
  const [currentSortOrder, setCurrentSortOrder] = useState<string>("");
  const sortOrders = [
    { value: "", label: "Relevance" },
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "-modified", label: "Recently Modified" },
    { value: "comics", label: "Most Comics" },
    { value: "series", label: "Most Series" },
    { value: "stories", label: "Most Stories" },
  ];

  const handleSelect = (order: string) => {
    setCurrentSortOrder(order);
    onSelectOrder(order);
  };

  return (
    <MenuRoot>
      <MenuTrigger>
        Order by:{" "}
        {sortOrders.find((sortOrder) => sortOrder.value === currentSortOrder)
          ?.label || "Relevance"}
      </MenuTrigger>
      <MenuContent>
        {sortOrders.map((order) => (
          <MenuItem
            key={order.value}
            value={order.value}
            onClick={() => handleSelect(order.value)}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
};

export default SortSelector;
