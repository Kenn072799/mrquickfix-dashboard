import { useState } from "react";

const useCategoryDropdown = (existingCategories = []) => {
  const [selectedCategories, setSelectedCategories] = useState(
    existingCategories
  );
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown((prev) => !prev);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return {
    selectedCategories,
    setSelectedCategories,
    showCategoryDropdown,
    toggleCategoryDropdown,
    handleCategorySelect,
  };
};

export default useCategoryDropdown;
