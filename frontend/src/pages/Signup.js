import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault();
    await api.post('/auth/signup', form);
    nav('/login');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f2f5',
      padding: '16px',
    },
    form: {
      width: '100%',
      maxWidth: '400px',
      padding: '32px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    title: {
      margin: 0,
      textAlign: 'center',
      color: '#333',
    },
    inputWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      width: '85%',
      padding: '12px',
      paddingRight: '40px', // space for the eye button
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      outline: 'none',
    },
    eyeButton: {
      position: 'absolute',
      right: '12px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      padding: 0,
      lineHeight: 1,
    },
    button: {
      padding: '12px',
      fontSize: '16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={submit} style={styles.form}>
        <h2 style={styles.title}>Sign Up</h2>
        <input
          name="name"
          placeholder="Name"
          onChange={handle}
          required
          style={styles.input}
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handle}
          required
          style={styles.input}
        />

        <div style={styles.inputWrapper}>
          <input
            name="password"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            onChange={handle}
            required
            style={styles.input}
          />
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            style={styles.eyeButton}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
