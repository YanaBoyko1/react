
import React from 'react';
import Select from '../Select/Select';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { FilterBarContainer, FiltersContainer } from './FilterBar.styles'; 

function FilterBar() {
  return (
    <FilterBarContainer>
      <FiltersContainer>
        <Select options={['Filter 1', 'Filter 2', 'Filter 3']} />
        <Select options={['Filter 2', 'Filter 3', 'Filter 4']} />
        <Select options={['Filter 3', 'Filter 4', 'Filter 5']} />
      </FiltersContainer>

      <PrimaryButton>Apply</PrimaryButton>
    </FilterBarContainer>
  );
}

export default FilterBar;


