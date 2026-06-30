import React from 'react'

export default function Sidebar({ views, onSelect }) {
    return (
        <div style={{ padding: 10 }}>
            <h3>SQL Views</h3>

            {views.map((v) => (
                <div
                    key={v.id}
                    onClick={() => onSelect(v)}
                    style={{
                        padding: 8,
                        cursor: 'pointer',
                        borderBottom: '1px solid #eee',
                    }}
                >
                    {v.displayName}
                </div>
            ))}
        </div>
    )
}