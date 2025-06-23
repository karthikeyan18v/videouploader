import { useEffect, useState } from 'react';
import api from '../api/api';

export default function Feed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/videos')
      .then(res => setVideos(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '32px',
      backgroundColor: '#f0f2f5',
    },
    title: {
      margin: '0 0 24px',
      textAlign: 'center',
      color: '#333',
      fontSize: '2rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '24px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'transform 0.2s',
    },
    cardHover: {
      transform: 'scale(1.02)',
    },
    videoWrapper: {
      width: '100%',
      backgroundColor: '#000',
    },
    video: {
      width: '100%',
      height: 'auto',
      display: 'block',
    },
    content: {
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    titleText: {
      margin: 0,
      fontSize: '1.25rem',
      color: '#222',
    },
    metadataText: {
      fontSize: '0.9rem',
      color: '#666',
    },
    description: {
      fontSize: '1rem',
      color: '#444',
      lineHeight: 1.4,
      margin: '8px 0 0',
    },
    statusMessage: {
      textAlign: 'center',
      marginTop: '40px',
      color: '#555',
      fontSize: '1.1rem',
    }
  };

  // Simple hover state
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (loading) {
    return (
      <div style={styles.statusMessage}>
        Loading videos…
      </div>
    );
  }

  if (!videos.length) {
    return (
      <div style={styles.statusMessage}>
        No videos found.
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Video Feed</h2>
      <div style={styles.grid}>
        {videos.map((v, i) => (
          <div
            key={v._id}
            style={{
              ...styles.card,
              ...(hoveredIndex === i ? styles.cardHover : {})
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div style={styles.videoWrapper}>
              <video
                controls
                style={styles.video}
                src={v.url}
              />
            </div>
            <div style={styles.content}>
              <h3 style={styles.titleText}>{v.title}</h3>
              <div style={styles.metadataText}>
                By {v.owner.name} on{' '}
                {new Date(v.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
              {v.description && (
                <p style={styles.description}>{v.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
