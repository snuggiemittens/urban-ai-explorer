import React, { useState } from 'react';

function App() {
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const API_BASE_URL = 'https://urban-ai-explorer-production.up.railway.app';


    const sendMessage = async () => {
        if (!message.trim()) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/conversation/urban-intent`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message: message})
            });

            const data = await response.json();

            setConversation(prev => [...prev, {
                user: message,
                ai: data
            }]);

            setMessage('');
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#000000',
            color: '#00ff00',
            fontFamily: 'monospace',
            padding: '20px'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                {/* Header */}
                <h1 style={{
                    textAlign: 'center',
                    fontSize: '2.5rem',
                    color: '#00ffff',
                    marginBottom: '30px'
                }}>
                    🏙️ URBAN AI EXPLORER
                </h1>

                {/* Input */}
                <div style={{
                    border: '1px solid #00ff00',
                    padding: '20px',
                    marginBottom: '20px'
                }}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#000000',
                            border: '1px solid #00ff00',
                            color: '#00ff00',
                            fontFamily: 'monospace',
                            fontSize: '16px',
                            marginBottom: '10px'
                        }}
                        placeholder="Plan a Tokyo food tour with $1000 budget..."
                    />

                    <button
                        onClick={sendMessage}
                        disabled={loading || !message.trim()}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#000000',
                            border: '1px solid #00ff00',
                            color: '#00ff00',
                            fontFamily: 'monospace',
                            cursor: 'pointer'
                        }}
                    >
                        {loading ? 'PROCESSING...' : 'EXECUTE CONVERSATIONAL PROGRAMMING'}
                    </button>
                </div>

                {/* Conversations */}
                <div>
                    {conversation.map((conv, index) => (
                        <div key={index} style={{
                            border: '1px solid #ffff00',
                            padding: '15px',
                            marginBottom: '15px'
                        }}>
                            <div style={{ color: '#00ffff', marginBottom: '10px' }}>
                                <strong>YOU:</strong> {conv.user}
                            </div>
                            <div style={{ color: '#ffffff', marginBottom: '10px' }}>
                                <strong>AI:</strong> {conv.ai.response}
                            </div>
                            <div style={{ color: '#ffff00', fontSize: '12px' }}>
                                Intent: {conv.ai.intent} | Learning: {conv.ai.learning ? 'YES' : 'NO'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;