import styled from 'styled-components';

export const TileSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  margin-bottom: 160px;

  > div {
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-bottom: 40px;
    flex-wrap: wrap; 
    margin-left: 10px;
  }
`;

export const ViewMoreButton = styled.button`
  background-color: rgba(238, 170, 214, 1);
  color: white;
  padding: 15px 40px;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background-color: rgba(70, 62, 135, 1);
  }
`;

export const TileImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 8px;
`;
