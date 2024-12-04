"use client";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { createListCollection } from "@chakra-ui/react";
import { useState } from "react";

interface SortSelectorProps {
  onSelectOrder: (order: string) => void;
}

const SortSelector = ({ onSelectOrder }: SortSelectorProps) => {
  const [currentSortOrder, setCurrentSortOrder] = useState<string>("");

  const sortOrders = createListCollection({
    items: [
      { label: "Relevance", value: "" },
      { label: "Name (A-Z)", value: "name" },
      { label: "Name (Z-A)", value: "-name" },
      { label: "Recently Modified", value: "-modified" },
      { label: "Least Recently Modified", value: "modified" },
    ],
  });
  const handleSelect = (value: string) => {
    setCurrentSortOrder(value);
    onSelectOrder(value);
  };

  return (
    <SelectRoot
      collection={sortOrders}
      size="sm"
      width="320px"
      onSelect={(event) => {
        const selectedValue = (event.target as HTMLDivElement).dataset.value;
        if (selectedValue) {
          handleSelect(selectedValue);
        }
      }}
    >
      <SelectLabel>Order by</SelectLabel>
      <SelectTrigger>
        <SelectValueText
          className="text-white"
          
          placeholder="Relevance"
        />
      </SelectTrigger>
      <SelectContent className="bg-black">
        {sortOrders.items.map((order) => (
          <SelectItem
            key={order.value}
            className="hover:bg-gray-900"
            onClick={() => handleSelect(order.value)}
            data-value={order.value}
            item={order}
          >
            {order.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export default SortSelector;
