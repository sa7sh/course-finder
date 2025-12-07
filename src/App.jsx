import { useState } from 'react';
import SearchBar from './components/SearchBar';
import CourseList from './components/CourseList';
import QuoteDisplay from './components/QuoteDisplay';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      textAlign: 'center',
      padding: '40px 20px'
    },
    title: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '15px'
    },
    subtitle: {
      fontSize: '20px',
      color: '#64748b',
      maxWidth: '600px',
      margin: '0 auto'
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    coursesHeader: {
      margin: '40px 0 20px 0'
    },
    coursesTitle: {
      fontSize: '32px',
      color: '#1e293b',
      marginBottom: '10px'
    },
    coursesCount: {
      color: '#64748b',
      fontSize: '16px'
    },
    footer: {
      marginTop: '60px',
      paddingTop: '30px',
      borderTop: '1px solid #e2e8f0',
      textAlign: 'center',
      color: '#64748b',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🎓 Course Finder</h1>
        <p style={styles.subtitle}>
          Discover your next learning adventure. Filter by name or category.
        </p>
      </header>

      <main style={styles.main}>
        <QuoteDisplay />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <div style={styles.coursesHeader}>
          <h2 style={styles.coursesTitle}>Available Courses</h2>
          <p style={styles.coursesCount}>
            Showing {searchTerm ? 'filtered' : 'all'} courses ({searchTerm ? 'matches your search' : 'total available'})
          </p>
        </div>

        <CourseList searchTerm={searchTerm} />
      </main>

      <footer style={styles.footer}>
        <p>
          Built with React & Inline Styles • API: 
          <a 
            href="https://quotable.io" 
            style={{ color: '#3b82f6', marginLeft: '5px', textDecoration: 'none' }}
          >
            Quotable
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;