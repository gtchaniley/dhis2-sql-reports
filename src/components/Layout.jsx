import React from 'react'

export default function Layout({ sidebar, content }) {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: 280, borderRight: '1px solid #ddd' }}>
                {sidebar}
            </div>

            <div style={{ flex: 1, padding: 20 }}>
                {content}
            </div>
        </div>
    )
}