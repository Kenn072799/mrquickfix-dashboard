import { useState } from "react";

const useCategories = (initialCategories = []) => {
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown((prev) => !prev);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  return {
    selectedCategories,
    showCategoryDropdown,
    toggleCategoryDropdown,
    handleCategorySelect,
  };
};

export default useCategories;