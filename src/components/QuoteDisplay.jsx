import { useEffect, useState } from 'react';

const QuoteDisplay = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [apiUsed, setApiUsed] = useState('');

  // Static fallback quotes in case all APIs fail
  const staticQuotes = [
    { content: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
    { content: "Learning is not attained by chance, it must be sought for with ardor and diligence.", author: "Abigail Adams" },
    { content: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
    { content: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { content: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" }
  ];

  const fetchQuote = async () => {
    setLoading(true);
    
    // Try multiple API endpoints
    const apiEndpoints = [
      {
        name: 'Quotable',
        url: 'https://api.quotable.io/random',
        parser: (data) => ({ content: data.content, author: data.author })
      },
      {
        name: 'ZenQuotes',
        url: 'https://zenquotes.io/api/random',
        parser: (data) => ({ content: data[0].q, author: data[0].a })
      },
      {
        name: 'Programming Quotes',
        url: 'https://programming-quotes-api.herokuapp.com/quotes/random',
        parser: (data) => ({ content: data.en, author: data.author })
      }
    ];

    let success = false;
    
    // Try each API in order
    for (const api of apiEndpoints) {
      try {
        console.log(`Trying ${api.name} API...`);
        const response = await fetch(api.url);
        
        if (response.ok) {
          const data = await response.json();
          const parsed = api.parser(data);
          setQuote(parsed.content);
          setAuthor(parsed.author);
          setApiUsed(api.name);
          success = true;
          console.log(`Success with ${api.name}`);
          break;
        }
      } catch (error) {
        console.log(`${api.name} failed:`, error.message);
        continue;
      }
    }
    
    // If all APIs fail, use static quote
    if (!success) {
      console.log('All APIs failed, using static quote');
      const randomIndex = Math.floor(Math.random() * staticQuotes.length);
      const staticQuote = staticQuotes[randomIndex];
      setQuote(staticQuote.content);
      setAuthor(staticQuote.author);
      setApiUsed('Static');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const styles = {
    container: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '30px',
      borderRadius: '16px',
      marginBottom: '40px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      minHeight: '250px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    loading: {
      fontSize: '18px',
      textAlign: 'center',
      padding: '40px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px'
    },
    quote: {
      fontSize: '20px',
      fontStyle: 'italic',
      lineHeight: '1.6',
      marginBottom: '15px',
      minHeight: '80px'
    },
    author: {
      textAlign: 'right',
      fontSize: '16px',
      opacity: '0.9',
      fontStyle: 'italic',
      marginBottom: '10px'
    },
    apiInfo: {
      fontSize: '12px',
      opacity: '0.7',
      textAlign: 'right',
      marginTop: '10px'
    },
    button: {
      marginTop: '20px',
      padding: '12px 24px',
      background: 'white',
      color: '#667eea',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'block',
      marginLeft: 'auto'
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📚 Daily Learning Quote</h3>
      
      {loading ? (
        <div style={styles.loading}>
          <span>⏳</span> Loading quote from APIs...
        </div>
      ) : (
        <>
          <p style={styles.quote}>"{quote}"</p>
          <p style={styles.author}>— {author}</p>
          <p style={styles.apiInfo}>
            Source: {apiUsed} {apiUsed === 'Static' ? '(Fallback)' : 'API'}
          </p>
        </>
      )}
      
      <button 
        style={styles.button}
        onClick={fetchQuote}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = 'none';
        }}
        disabled={loading}
      >
        {loading ? 'Loading...' : '🎲 Get New Quote'}
      </button>
    </div>
  );
};

export default QuoteDisplay;