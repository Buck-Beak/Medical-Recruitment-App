import React from 'react';
import './VideoBackground.css'; // Import the CSS for styling

const VideoBackground = () => {
    return (
        <div className="video-background">
            <video autoPlay loop muted playsInline>
                <source src="/mixkit-close-up-of-a-heart-rate-monitor-46365-hd-ready.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoBackground;