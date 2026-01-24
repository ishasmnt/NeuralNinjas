import React from 'react';
import { Video, Image, Play } from 'lucide-react';

const TopPostsTable = ({ posts }) => {
    const getIcon = (type) => {
        switch (type) {
            case 'Reel': return <Video size={16} />;
            case 'Image': return <Image size={16} />;
            case 'Video': return <Play size={16} />;
            default: return <Image size={16} />;
        }
    };

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            gridColumn: 'span 2'
        }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Top Performing Posts</h3>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                            <th style={{ padding: '12px', color: '#aaa', fontWeight: '500' }}>Post Title</th>
                            <th style={{ padding: '12px', color: '#aaa', fontWeight: '500' }}>Type</th>
                            <th style={{ padding: '12px', color: '#aaa', fontWeight: '500' }}>Date</th>
                            <th style={{ padding: '12px', color: '#aaa', fontWeight: '500' }}>Views</th>
                            <th style={{ padding: '12px', color: '#aaa', fontWeight: '500' }}>Likes</th>
                            <th style={{ padding: '12px', color: '#aaa', fontWeight: '500' }}>Engagement</th>
                        </tr>
                    </thead>
                    <tbody>
  {posts.map((post, index) => (
    <tr key={post.id || index} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '16px 12px', fontWeight: '500' }}>{post.title}</td>
                                <td style={{ padding: '16px 12px' }}>
                                    <span style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        background: 'rgba(255,255,255,0.1)',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        width: 'fit-content',
                                        fontSize: '0.85rem'
                                    }}>
                                        {getIcon(post.type)} {post.type}
                                    </span>
                                </td>
                               {/* Use 'Text' for title and 'Likes' for views/likes */}
                                <td style={{ padding: '16px 12px' }}>{post.Text?.substring(0, 40)}...</td>
                                <td style={{ padding: '16px 12px' }}>{post.Likes}</td>
                                <td style={{ padding: '16px 12px', color: '#4ade80' }}>{post.Total_Engagement}</td>
                              
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopPostsTable;
