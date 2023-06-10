import React, { useState } from 'react';

type HorizontalBarProps = {
    value1: number;
    value2: number;
}

const HorizontalBar: React.FC<HorizontalBarProps> = ({ value1, value2 }) => {
    const totalValue = value1 + value2;
    const value1Percentage = (value1 / totalValue) * 100;
    const value2Percentage = (value2 / totalValue) * 100;

    const [hoveredBar, setHoveredBar] = useState<number | null>(null);
    const [tooltipText, setTooltipText] = useState<string>('');

    const barStyle = {
        borderRadius: "20px",
        height: '40px',
        width: '100%',
        backgroundColor: '#ddd',
        display: 'flex',
        position: 'relative' as 'relative'
    };

    const fillStyle1 = {
        borderRadius: "20px",
        height: '100%',
        flex: value1,
        backgroundColor: 'rgb(241, 95, 168)',
        transition: 'transform 0.3s ease',
        transformOrigin: 'bottom',
        transform: hoveredBar === 1 ? 'scaleY(1.2)' : 'scaleY(1)'
    };

    const fillStyle2 = {
        borderRadius: "20px",
        height: '100%',
        flex: value2,
        backgroundColor: 'gray',
        transition: 'transform 0.3s ease',
        transformOrigin: 'bottom',
        transform: hoveredBar === 2 ? 'scaleY(1.2)' : 'scaleY(1)'
    };

    const tooltipStyle = {
        position: 'absolute' as 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'black',
        color: 'white',
        padding: '5px',
        borderRadius: '5px',
        display: hoveredBar ? 'block' : 'none'
    };

    return (
        <div style={barStyle}>
            <div style={fillStyle1} 
                onMouseEnter={() => { setHoveredBar(1); setTooltipText(`Agreed: ${value1Percentage.toFixed(0)} %`); }} 
                onMouseLeave={() => setHoveredBar(null)}>
            </div>
            <div style={fillStyle2} 
                onMouseEnter={() => { setHoveredBar(2); setTooltipText(`Disagreed: ${value2Percentage.toFixed(0)} %`); }} 
                onMouseLeave={() => setHoveredBar(null)}>
            </div>
            <div style={tooltipStyle}>
                {tooltipText}
            </div>
        </div>
    );
}

export default HorizontalBar;
