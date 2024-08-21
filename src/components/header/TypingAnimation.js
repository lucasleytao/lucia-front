import React from 'react'

const TypingAnimation = () => {
    return (
        <Typography variant="body1" style={{ display: 'flex', alignItems: 'center' }}>
            Carregando
            <span className="dots">
                <span>.</span><span>.</span><span>.</span>
            </span>
        </Typography>
    );
}

export default TypingAnimation
