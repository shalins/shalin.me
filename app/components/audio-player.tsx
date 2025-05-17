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

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    updateTimeFromEvent(e);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateTimeFromEvent(e);
    
    // Add event listeners for dragging
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateTimeFromMouseEvent(e);
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const updateTimeFromEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const container = progressContainerRef.current;
    if (!audio || !container) return;

    const rect = container.getBoundingClientRect();
    const clickPosition = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = clickPosition * audio.duration;
    
    // Update progress immediately for smoother UX
    setProgress(clickPosition * 100);
    setCurrentTime(formatTime(audio.currentTime));
  };
  
  const updateTimeFromMouseEvent = (e: MouseEvent) => {
    const audio = audioRef.current;
    const container = progressContainerRef.current;
    if (!audio || !container) return;

    const rect = container.getBoundingClientRect();
    const clickPosition = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = clickPosition * audio.duration;
    
    // Update progress immediately for smoother UX
    setProgress(clickPosition * 100);
    setCurrentTime(formatTime(audio.currentTime));
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handlePlaybackRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newRate = parseFloat(e.target.value);
    audio.playbackRate = newRate;
    setPlaybackRate(newRate);
  };

  return (
    <div className="block border border-sky-500 overflow-hidden my-2 bg-[#F7F0DD]">
      <div className="border-b border-sky-500 bg-[#F7F0DD] px-4 py-1 flex items-center gap-3">
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
            className="col-span-14 relative h-8 flex items-center group"
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
            className="col-span-4 bg-transparent border border-sky-500 text-gray-600 px-2 py-1 text-sm cursor-pointer"
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