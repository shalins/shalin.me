'use client';

import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

interface AudioPlayerProps {
  src: string;
  title?: string;
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const updateProgress = () => {
      if (!audio.duration || isDragging) return;
      const progressValue = (audio.currentTime / audio.duration) * 100;
      setProgress(progressValue);
      setCurrentTime(formatTime(audio.currentTime));
    };

    const handleLoadedMetadata = () => {
      setDuration(formatTime(audio.duration));
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      audio.currentTime = 0;
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isDragging]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Format time helper
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Get position as a percentage based on x coordinate
  const getPositionFromX = (clientX: number) => {
    const container = progressContainerRef.current;
    if (!container) return 0;
    
    const rect = container.getBoundingClientRect();
    return Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1) * 100;
  };

  // Handle regular click on the progress bar
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't handle clicks if we're dragging
    if (isDragging) return;
    
    const pos = getPositionFromX(e.clientX);
    const audio = audioRef.current;
    
    if (audio) {
      audio.currentTime = (pos / 100) * audio.duration;
      setProgress(pos);
      setCurrentTime(formatTime((pos / 100) * audio.duration));
    }
  };

  // Handle mouse down to start dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const pos = getPositionFromX(e.clientX);
    const audio = audioRef.current;
    
    // Update display immediately
    setProgress(pos);
    if (audio) {
      setCurrentTime(formatTime((pos / 100) * audio.duration));
    }
    
    // Set dragging state
    setIsDragging(true);
    
    // Add the event listeners to handle drag and release
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  };

  // Handle drag (mousemove)
  const handleDrag = (e: MouseEvent) => {
    const pos = getPositionFromX(e.clientX);
    const audio = audioRef.current;
    
    // Update display immediately
    setProgress(pos);
    if (audio) {
      setCurrentTime(formatTime((pos / 100) * audio.duration));
    }
  };

  // Handle drag end (mouseup)
  const handleDragEnd = (e: MouseEvent) => {
    const pos = getPositionFromX(e.clientX);
    const audio = audioRef.current;
    
    // Update audio position
    if (audio) {
      audio.currentTime = (pos / 100) * audio.duration;
    }
    
    // Reset state
    setIsDragging(false);
    
    // Clean up event listeners
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  const handlePlaybackRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newRate = parseFloat(e.target.value);
    audio.playbackRate = newRate;
    setPlaybackRate(newRate);
  };

  return (
    <div className="block border border-sky-500 overflow-hidden my-2 bg-[#F7F0DD] relative border-b-8 border-sky-500 hover:border-b-8 hover:border-red-500 transition-all duration-100 ease-in-out group">
      <div className="border-b border-sky-500 bg-[#F7F0DD] px-4 py-1 flex items-center gap-3 group-hover:border-red-500 transition-colors duration-100">
        <FontAwesomeIcon icon={faVolumeHigh} className="text-gray-600" />
        <span className="text-sm text-gray-600">{title || "Audio"}</span>
      </div>
      
      <div className="bg-[#FAF8EC] px-4 py-4">
        <audio 
          ref={audioRef} 
          src={src} 
          className="hidden"
        />
        
        {/* New layout using CSS Grid with 24 columns for finer control */}
        <div className="grid grid-cols-24 gap-3 items-center">
          {/* Play button - 2 columns */}
          <button 
            onClick={togglePlayPause}
            className="col-span-2 bg-transparent border border-sky-500 text-gray-600 w-8 h-8 flex items-center justify-center cursor-pointer hover:border-red-500"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className={isPlaying ? "" : "ml-0.5"} />
          </button>
          
          {/* Progress track - 14 columns */}
          <div 
            ref={progressContainerRef}
            onClick={handleProgressClick}
            onMouseDown={handleMouseDown}
            className="col-span-14 relative h-8 flex items-center group cursor-pointer"
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            tabIndex={0}
          >
            {/* Track background */}
            <div className="absolute inset-0 flex items-center pointer-events-none">
              <div className="h-3 w-full bg-gray-300 border border-sky-500"></div>
            </div>
            
            {/* Progress fill */}
            <div className="absolute inset-0 flex items-center pointer-events-none">
              <div 
                className="h-3 bg-sky-500 border border-sky-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            {/* Thumb */}
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 h-5 w-5 bg-white shadow pointer-events-none border border-sky-500 group-hover:border-red-500"
              style={{ left: `calc(${progress}% - 10px)` }}
            ></div>
          </div>
          
          {/* Time display - 4 columns */}
          <div className="col-span-4 text-xs text-gray-600 text-right">
            {currentTime} / {duration}
          </div>
          
          {/* Playback speed - 4 columns */}
          <select 
            value={playbackRate}
            onChange={handlePlaybackRateChange}
            className="col-span-4 bg-transparent border border-sky-500 text-gray-600 px-2 py-1 text-sm cursor-pointer hover:border-red-500 focus:border-red-500"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>
    </div>
  );
} 