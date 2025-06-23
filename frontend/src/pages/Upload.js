import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const [file, setFile]   = useState(null);
  const [meta, setMeta]   = useState({});
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', meta.title);
    formData.append('description', meta.description);
    formData.append('video', file);

    await api.post('/videos/upload', formData);
    
    nav('/');
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
      maxWidth: '500px',
      padding: '32px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    title: {
      margin: 0,
      textAlign: 'center',
      color: '#333',
    },
    input: {
      padding: '12px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      outline: 'none',
    },
    fileInput: {
      padding: '10px',
      fontSize: '14px',
      border: '1px dashed #aaa',
      borderRadius: '4px',
      backgroundColor: '#fafafa',
      cursor: 'pointer',
    },
    button: {
      padding: '12px',
      fontSize: '16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      alignSelf: 'flex-end',
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={submit} style={styles.form}>
        <h2 style={styles.title}>Upload Video</h2>

        <input
          name="title"
          placeholder="Title"
          onChange={e => setMeta({ ...meta, title: e.target.value })}
          required
          style={styles.input}
        />

        <input
          name="description"
          placeholder="Description (optional)"
          onChange={e => setMeta({ ...meta, description: e.target.value })}
          style={styles.input}
        />

        <input
          type="file"
          accept="video/mp4"
          onChange={e => setFile(e.target.files[0])}
          required
          style={styles.fileInput}
        />
        {file && (
          <div style={{ fontSize: '14px', color: '#555' }}>
            Selected file: {file.name}
          </div>
        )}

        <button type="submit" style={styles.button}>
          Upload
        </button>
      </form>
    </div>
  );
}
