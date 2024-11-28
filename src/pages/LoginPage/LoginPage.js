import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Heading, Input, Button, Link } from './LoginPage.styles';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Очищення попередніх помилок

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
        localStorage.setItem('authToken', data.token); // Зберігаємо токен
        navigate('/home'); // Перенаправлення після успішного логіну
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Heading>Log In</Heading>
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
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Виведення помилки */}
        <Button type="submit">LOGIN</Button>
        <Link>
          <span>Not a member? </span>
          <button onClick={() => navigate('/register')}>Sign up</button> {/* Використовуємо navigate для переходу на реєстрацію */}
        </Link>
      </Form>
    </Container>
  );
};

export default LoginPage;
