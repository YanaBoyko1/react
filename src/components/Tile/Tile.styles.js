import styled from 'styled-components';

export const TileContainer = styled.div`
  width: 300px;
  padding: 20px;
  text-align: center;
  background-color: rgba(252, 241, 249, 1);
  border-radius: 10px;
  /* margin: 10px; */
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  margin-bottom: 130px;
  margin-top: 40px;
  margin-left: 75px;
  justify-content: center;
`;

export const TileImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 8px;
`;

export const TileTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  color: rgba(71, 61, 137, 1);
`;

export const TileDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
`;

export const TilePrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #444;
  margin-top: 10px;
`;

export const ViewMoreButton = styled.button`
  background-color: black;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: gray;
  }
`;

