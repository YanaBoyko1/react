import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Heading, Input, Button, Link } from './RegisterPage.styles';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // State to manage error messages
  const navigate = useNavigate();

  // Regular expression for email validation with domain length check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Email validation check
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address with at least two characters after "@" symbol.');
      return;
    }

    // Password mismatch check
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (data.message === 'User registered successfully') {
        navigate('/login');
      } else {
        setError(data.message); // If the backend returns a message (like "Email already exists"), show it as an error
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Something went wrong. Please try again later.'); // General error if registration fails
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
        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>} {/* Display error if any */}

        <Button type="submit">Register</Button>
        
        <Link>
          <a href="/login">Already have an account? Login here</a>
        </Link>
      </Form>
    </Container>
  );
};

export default Register;
