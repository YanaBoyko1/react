import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(252, 241, 249, 1);
  font-family: Arial, sans-serif;
`;

export const Form = styled.form`
  background: #fff;
  padding: 30px;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const Heading = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: rgba(238, 170, 214, 1);;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: rgba(238, 170, 214, 1);
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: rgba(70, 62, 135, 1);
  }
`;

export const Link = styled.div`
  text-align: center;
  margin-top: 10px;

  a {
    color:  rgba(238, 170, 214, 1);;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
