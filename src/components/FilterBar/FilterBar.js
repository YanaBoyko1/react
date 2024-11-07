// FilterBar.js
import React, { useState } from 'react';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import Select from '../Select/Select';
import { FilterBarContainer, FiltersContainer } from './FilterBar.styles';

function FilterBar({ onFilterChange }) {
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [material, setMaterial] = useState('');

  const handleApplyFilters = () => {
    const filters = {};
    if (type) filters.type = type;
    if (size) filters.size = size;
    if (material) filters.material = material;
    onFilterChange(filters);
  };

  return (
    <FilterBarContainer>
      <FiltersContainer>
        <Select options={['type','Yacht', 'Motorboat', 'Fishing Boat']} onChange={(e) => setType(e.target.value)} />
        <Select options={['size','Large', 'Medium', 'Small']} onChange={(e) => setSize(e.target.value)} />
        <Select options={['material','Fiberglass', 'Aluminum', 'Wood']} onChange={(e) => setMaterial(e.target.value)} />
      </FiltersContainer>
      <PrimaryButton onClick={handleApplyFilters}>Apply</PrimaryButton>
    </FilterBarContainer>
  );
}

export default FilterBar;
