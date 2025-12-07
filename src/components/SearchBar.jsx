const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto 40px',
      padding: '0 20px'
    },
    input: {
      width: '100%',
      padding: '18px 24px',
      borderRadius: '12px',
      border: '2px solid #e2e8f0',
      fontSize: '18px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    hint: {
      color: '#64748b',
      fontSize: '14px',
      marginTop: '10px',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="🔍 Search by course name or category..."
        style={styles.input}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
      />
      <p style={styles.hint}>Try: "React", "Backend", "Design", "Mobile"</p>
    </div>
  );
};

export default SearchBar;