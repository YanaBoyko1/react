import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Heading, Input, Button, Link } from './LoginPage.styles'; // Assuming the styled components are in 'LoginPage.styles.js'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid login credentials');
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('authToken', data.token); // Store the token
        navigate('/home'); // Redirect after successful login
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Heading>Submit the form to sign in</Heading>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">LOGIN ME</Button>
        <Link>
          <span>Not a member? </span>
          <a href="/register">Sign up</a>
        </Link>
      </Form>
    </Container>
  );
};

export default LoginPage;
