import React, { useContext, useState } from 'react';
import { ItemContext } from '../../context/ItemContext';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import Select from '../Select/Select';
import { FilterBarContainer, FiltersContainer } from './FilterBar.styles';

function FilterBar() {
  const { updateFilters, applyFilters } = useContext(ItemContext);
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [material, setMaterial] = useState('');

  const handleApplyFilters = () => {
    updateFilters('type', type);
    updateFilters('size', size);
    updateFilters('material', material);
    applyFilters();
  };

  return (
    <FilterBarContainer>
      <FiltersContainer>
        <Select
          options={['type', 'Yacht', 'Motorboat', 'Fishing Boat']}
          onChange={(e) => setType(e.target.value)}
        />
        <Select
          options={['size', 'Large', 'Medium', 'Small']}
          onChange={(e) => setSize(e.target.value)}
        />
        <Select
          options={['material', 'Fiberglass', 'Aluminum', 'Wood']}
          onChange={(e) => setMaterial(e.target.value)}
        />
      </FiltersContainer>
      <PrimaryButton onClick={handleApplyFilters}>Apply</PrimaryButton>
    </FilterBarContainer>
  );
}

export default FilterBar;


