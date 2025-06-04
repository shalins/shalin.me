'use client';

import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVideo, faExpand, faCompress, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface VideoPlayerProps {
  src: string;
  title?: string;
  width?: string | number;
}

export default function VideoPlayer({ src, title, width = "100%" }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenOperationInProgress = useRef(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const formatTime = (time: number) => {
      if (isNaN(time)) return '00:00';
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const updateProgress = () => {
      if (!video.duration || isDragging) return;
      const progressValue = (video.currentTime / video.duration) * 100;
      if (!isNaN(progressValue)) {
        setProgress(progressValue);
        setCurrentTime(formatTime(video.currentTime));
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(formatTime(video.duration));
      setIsVideoLoaded(true);
    };

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
    };

    const handleError = () => {
      setIsVideoError(true);
      setIsVideoLoaded(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      video.currentTime = 0;
    };

    // Sync play/pause state
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    // Sync playback rate
    const handleRateChange = () => setPlaybackRate(video.playbackRate);

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ratechange', handleRateChange);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ratechange', handleRateChange);
    };
  }, [isDragging]);

  const togglePlayPause = () => {
    if (!isVideoLoaded) return;
    
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    // We don't need to set isPlaying as it will be updated by the event listeners
  };

  // Format time helper
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
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
    if (!isVideoLoaded || isDragging) return;
    
    const pos = getPositionFromX(e.clientX);
    const video = videoRef.current;
    
    if (video && !isNaN(video.duration)) {
      video.currentTime = (pos / 100) * video.duration;
      // Progress and time will be updated by timeupdate event
    }
  };

  // Handle mouse down to start dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isVideoLoaded) return;
    
    e.preventDefault();
    
    const pos = getPositionFromX(e.clientX);
    const video = videoRef.current;
    
    // Update display immediately
    setProgress(pos);
    if (video && !isNaN(video.duration)) {
      setCurrentTime(formatTime((pos / 100) * video.duration));
    }
    
    // Set dragging state
    setIsDragging(true);
    
    // Add the event listeners to handle drag and release
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  };

  // Handle drag (mousemove)
  const handleDrag = (e: MouseEvent) => {
    if (!isVideoLoaded) return;
    
    const pos = getPositionFromX(e.clientX);
    const video = videoRef.current;
    
    // Update display immediately
    setProgress(pos);
    if (video && !isNaN(video.duration)) {
      setCurrentTime(formatTime((pos / 100) * video.duration));
    }
  };

  // Handle drag end (mouseup)
  const handleDragEnd = (e: MouseEvent) => {
    if (!isVideoLoaded) return;
    
    const pos = getPositionFromX(e.clientX);
    const video = videoRef.current;
    
    // Update video position
    if (video && !isNaN(video.duration)) {
      video.currentTime = (pos / 100) * video.duration;
    }
    
    // Reset state
    setIsDragging(false);
    
    // Clean up event listeners
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  const handlePlaybackRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isVideoLoaded) return;
    
    const video = videoRef.current;
    if (!video) return;
    
    const newRate = parseFloat(e.target.value);
    video.playbackRate = newRate;
    // We don't need to set playbackRate as it will be updated by the ratechange event
  };

  // Completely revised fullscreen implementation
  const toggleFullscreen = () => {
    // Don't allow a new fullscreen operation until the current one is complete
    if (fullscreenOperationInProgress.current) return;
    
    const video = videoRef.current;
    if (!video) return;
    
    fullscreenOperationInProgress.current = true;
    
    // Get the current fullscreen element
    const fullscreenElement = document.fullscreenElement ||
                             (document as any).webkitFullscreenElement ||
                             (document as any).mozFullScreenElement ||
                             (document as any).msFullscreenElement;
    
    // If not in fullscreen, enter fullscreen
    if (!fullscreenElement) {
      // Set controls before entering fullscreen
      video.controls = true;
      
      // Use the video element directly for fullscreen
      if (video.requestFullscreen) {
        video.requestFullscreen()
          .then(() => {
            setIsFullscreen(true);
            fullscreenOperationInProgress.current = false;
          })
          .catch(err => {
            console.error('Error attempting to enable fullscreen:', err);
            fullscreenOperationInProgress.current = false;
          });
      } else if ((video as any).webkitRequestFullscreen) {
        (video as any).webkitRequestFullscreen();
        setIsFullscreen(true);
        fullscreenOperationInProgress.current = false;
      } else if ((video as any).mozRequestFullScreen) {
        (video as any).mozRequestFullScreen();
        setIsFullscreen(true);
        fullscreenOperationInProgress.current = false;
      } else {
        fullscreenOperationInProgress.current = false;
      }
    } 
    // If in fullscreen, exit fullscreen
    else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
          .then(() => {
            setIsFullscreen(false);
            // Remove controls when exiting fullscreen
            video.controls = false;
            fullscreenOperationInProgress.current = false;
          })
          .catch(err => {
            console.error('Error attempting to exit fullscreen:', err);
            fullscreenOperationInProgress.current = false;
          });
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
        setIsFullscreen(false);
        video.controls = false;
        fullscreenOperationInProgress.current = false;
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
        setIsFullscreen(false);
        video.controls = false;
        fullscreenOperationInProgress.current = false;
      } else {
        fullscreenOperationInProgress.current = false;
      }
    }
  };

  // Simplified fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement ||
                              (document as any).webkitFullscreenElement ||
                              (document as any).mozFullScreenElement ||
                              (document as any).msFullscreenElement;
      
      const newFullscreenState = !!fullscreenElement;
      setIsFullscreen(newFullscreenState);
      
      // Update video controls
      const video = videoRef.current;
      if (video) {
        video.controls = newFullscreenState;
      }
      
      // Reset the operation flag
      fullscreenOperationInProgress.current = false;
    };

    // Standard and vendor prefixed events
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Ensure video controls attribute is properly set when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.controls = isFullscreen;
    }
  }, [isFullscreen]);

  // When the speed selector changes its value, update the actual playback rate
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.playbackRate !== playbackRate) {
      video.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Calculate width style - accept string (e.g. "100%") or number (interpreted as pixels)
  const widthStyle = typeof width === 'number' ? `${width}px` : width;

  return (
    <div className="block border border-sky-500 overflow-hidden my-2 bg-[#F7F0DD] w-full relative border-b-8 border-sky-500 hover:border-b-8 hover:border-red-500 transition-all duration-100 ease-in-out group">
      <div className="border-b border-sky-500 bg-[#F7F0DD] px-4 py-1 flex items-center gap-3 group-hover:border-red-500 transition-colors duration-100">
        <FontAwesomeIcon icon={faVideo} className="text-gray-600" />
        <span className="text-sm text-gray-600">{title || "Video"}</span>
      </div>
      
      {/* Video display area */}
      <div 
        ref={videoContainerRef}
        className="w-full bg-black relative aspect-video flex items-center justify-center" 
        onClick={togglePlayPause}
      >
        <video 
          ref={videoRef} 
          src={src}
          className="max-w-full max-h-full object-contain"
          onClick={(e) => {
            e.stopPropagation();
            togglePlayPause();
          }}
        />
        
        {/* Loading spinner */}
        {!isVideoLoaded && !isVideoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <FontAwesomeIcon icon={faSpinner} className="text-white text-4xl animate-spin" />
          </div>
        )}
        
        {/* Error message */}
        {isVideoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white text-center p-4">
              <p className="text-lg">Error loading video</p>
              <p className="text-sm mt-2">Please check the video source and try again</p>
            </div>
          </div>
        )}
        
        {/* Play button overlay */}
        {!isPlaying && !isFullscreen && isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
              <FontAwesomeIcon icon={faPlay} className="text-white text-2xl ml-1" />
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-[#FAF8EC] px-4 py-4">
        {/* Controls layout using CSS Grid with 24 columns for finer control */}
        <div className="grid grid-cols-24 gap-3 items-center">
          {/* Play button - 2 columns */}
          <button 
            onClick={togglePlayPause}
            disabled={!isVideoLoaded}
            className={`col-span-2 bg-transparent border border-sky-500 text-gray-600 w-8 h-8 flex items-center justify-center ${isVideoLoaded ? 'cursor-pointer hover:border-red-500' : 'opacity-50 cursor-not-allowed'}`}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className={isPlaying ? "" : "ml-0.5"} />
          </button>
          
          {/* Progress track - 12 columns */}
          <div 
            ref={progressContainerRef}
            onClick={isVideoLoaded ? handleProgressClick : undefined}
            onMouseDown={isVideoLoaded ? handleMouseDown : undefined}
            className={`col-span-12 relative h-8 flex items-center group ${isVideoLoaded ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            tabIndex={isVideoLoaded ? 0 : -1}
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
          <div className="col-span-4 text-xs text-gray-600 text-right whitespace-nowrap">
            {currentTime} / {duration}
          </div>
          
          {/* Playback speed - 4 columns */}
          <select 
            value={playbackRate}
            onChange={handlePlaybackRateChange}
            disabled={!isVideoLoaded}
            className={`col-span-4 bg-transparent border border-sky-500 text-gray-600 px-2 py-1 text-sm ${isVideoLoaded ? 'cursor-pointer hover:border-red-500 focus:border-red-500' : 'opacity-50 cursor-not-allowed'}`}
          >
            <option value="0.25">0.25x</option>
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="1.75">1.75x</option>
            <option value="2">2x</option>
          </select>
          
          {/* Fullscreen button - 2 columns */}
          <button 
            onClick={toggleFullscreen}
            disabled={!isVideoLoaded}
            className={`col-span-2 bg-transparent border border-sky-500 text-gray-600 w-8 h-8 flex items-center justify-center ${isVideoLoaded ? 'cursor-pointer hover:border-red-500' : 'opacity-50 cursor-not-allowed'}`}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
          </button>
        </div>
      </div>
    </div>
  );
} 