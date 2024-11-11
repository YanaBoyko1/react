import React, { useState } from 'react';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import Select from '../Select/Select';
import { FilterBarContainer, FiltersContainer } from './FilterBar.styles';

function FilterBar({ onFilterChange }) {
  const [type, setType] = useState('Type');
  const [size, setSize] = useState('Size');
  const [material, setMaterial] = useState('Material');

  const handleApplyFilters = () => {
    const filters = {};

    if (type !== 'Type') filters.type = type;
    if (size !== 'Size') filters.size = size;
    if (material !== 'Material') filters.material = material;

    onFilterChange(filters); 
  };

  return (
    <FilterBarContainer>
      <FiltersContainer>
        <Select
          options={['Type', 'Yacht', 'Motorboat', 'Fishing Boat']}
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <Select
          options={['Size', 'Large', 'Medium', 'Small']}
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <Select
          options={['Material', 'Fiberglass', 'Aluminum', 'Wood']}
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        />
      </FiltersContainer>
      <PrimaryButton onClick={handleApplyFilters}>Apply</PrimaryButton>
    </FilterBarContainer>
  );
}

export default FilterBar;
