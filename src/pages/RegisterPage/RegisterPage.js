import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/api'; // Імпортуємо функцію register з API
import { Container, Form, Heading, Input, Button, Link } from './RegisterPage.styles';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // Для помилок
  const navigate = useNavigate();

  // Регулярний вираз для перевірки email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Очищаємо попередні помилки

    // Перевірка валідності email
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address with at least two characters after "@" symbol.');
      return;
    }

    // Перевірка на співпадіння паролів
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Використовуємо функцію register з API
      const data = await register(username, email, password);
      
      if (data.message === 'User registered successfully') {
        navigate('/login'); // Якщо реєстрація успішна, перенаправляємо на логін
      } else {
        setError(data.message); // Якщо на сервері повертається повідомлення, виводимо його
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Something went wrong. Please try again later.'); // Загальна помилка, якщо щось пішло не так
    }
  };

  return (
    <Container>
      <Form onSubmit={handleRegister}>
        <Heading>Register</Heading>

        {/* Username Input */}
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Email Input */}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Confirm Password Input */}
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Error Message */}
        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

        <Button type="submit">Register</Button>

        <Link>
          <a href="/login">Already have an account? Login here</a>
        </Link>
      </Form>
    </Container>
  );
};

export default Register;
