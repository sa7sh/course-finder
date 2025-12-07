import { courses } from '../data/courses';

const CourseList = ({ searchTerm }) => {
  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return { background: '#d1fae5', color: '#065f46' };
      case 'Intermediate': return { background: '#fef3c7', color: '#92400e' };
      case 'Advanced': return { background: '#fee2e2', color: '#991b1b' };
      default: return { background: '#f3f4f6', color: '#374151' };
    }
  };

  const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '25px',
      marginTop: '20px'
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      padding: '25px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
      border: '1px solid #e2e8f0',
      transition: 'all 0.3s ease'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '15px'
    },
    courseName: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1e293b',
      margin: '0'
    },
    levelBadge: {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    category: {
      color: '#64748b',
      fontSize: '16px',
      marginBottom: '20px'
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '20px',
      paddingTop: '20px',
      borderTop: '1px solid #f1f5f9'
    },
    duration: {
      color: '#64748b',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    button: {
      padding: '10px 20px',
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background 0.3s'
    },
    noResults: {
      gridColumn: '1 / -1',
      textAlign: 'center',
      padding: '60px 20px',
      color: '#64748b'
    }
  };

  return (
    <div style={styles.grid}>
      {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => {
          const levelStyle = getLevelColor(course.level);
          return (
            <div 
              key={course.id} 
              style={styles.card}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
              }}
            >
              <div style={styles.cardHeader}>
                <h3 style={styles.courseName}>{course.name}</h3>
                <span style={{...styles.levelBadge, ...levelStyle}}>
                  {course.level}
                </span>
              </div>
              <p style={styles.category}>{course.category}</p>
              <div style={styles.cardFooter}>
                <span style={styles.duration}>⏱️ {course.duration}</span>
                <button 
                  style={styles.button}
                  onMouseOver={(e) => e.target.style.background = '#2563eb'}
                  onMouseOut={(e) => e.target.style.background = '#3b82f6'}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div style={styles.noResults}>
          <p style={{ fontSize: '20px', marginBottom: '10px' }}>
            No courses found matching "{searchTerm}"
          </p>
          <p>Try a different search term</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;