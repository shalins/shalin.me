'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: number;
}

export default function ImageGallery({ images, columns = 2 }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to set loading state with delay to prevent flash
  const setLoadingWithDelay = (loading: boolean) => {
    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }

    if (loading) {
      // Only show loading spinner if loading takes more than 100ms
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(true);
      }, 100);
    } else {
      setIsLoading(false);
    }
  };

  // Handle click on an image
  const openModal = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setLoadingWithDelay(true);
    setHasError(false);
  };

  // Close the modal
  const closeModal = () => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    setSelectedImage(null);
    setSelectedIndex(-1);
    setIsLoading(false);
  };

  // Navigate to previous image
  const goToPrevious = () => {
    setLoadingWithDelay(true);
    setHasError(false);
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedImage(images[newIndex]);
      setSelectedIndex(newIndex);
    } else {
      // Wrap around to the last image
      const newIndex = images.length - 1;
      setSelectedImage(images[newIndex]);
      setSelectedIndex(newIndex);
    }
  };

  // Navigate to next image
  const goToNext = () => {
    setLoadingWithDelay(true);
    setHasError(false);
    if (selectedIndex < images.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedImage(images[newIndex]);
      setSelectedIndex(newIndex);
    } else {
      // Wrap around to the first image
      setSelectedImage(images[0]);
      setSelectedIndex(0);
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if the click was on the backdrop itself
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  // Add/remove keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore scrolling when modal is closed
      document.body.style.overflow = '';
    };
  }, [selectedImage, selectedIndex]);

  // Preload adjacent images
  useEffect(() => {
    if (selectedIndex >= 0) {
      // Preload next image
      if (selectedIndex < images.length - 1) {
        const nextImg = new window.Image();
        nextImg.src = images[selectedIndex + 1].src;
      }
      
      // Preload previous image
      if (selectedIndex > 0) {
        const prevImg = new window.Image();
        prevImg.src = images[selectedIndex - 1].src;
      }
    }
  }, [selectedIndex, images]);

  return (
    <>
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${columns}, 1fr)`, 
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative border border-sky-500 border-b-8 hover:border-b-8 hover:border-red-500 transition-all duration-100 ease-in-out overflow-hidden cursor-pointer"
            style={{ 
              // If this is the last image and we have an odd number of images, make it span full width
              gridColumn: images.length % 2 !== 0 && index === images.length - 1 ? '1 / -1' : 'auto'
            }}
            onClick={() => openModal(image, index)}
          >
            <div className="relative w-full h-0 pb-[66.66%]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal overlay */}
      {selectedImage && (
        // Backdrop - handles clicks outside the image
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={handleBackdropClick}
        >
          {/* Fixed position close button */}
          <button
            onClick={closeModal}
            className="fixed top-4 right-4 bg-[#F7F0DD] text-gray-600 w-10 h-10 flex items-center justify-center border border-sky-500 hover:border-red-500 transition-colors duration-100 cursor-pointer font-mono-regular text-xl z-[60]"
            aria-label="Close modal"
          >
            ✕
          </button>
          
          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="fixed left-4 top-1/2 -translate-y-1/2 bg-[#F7F0DD] text-gray-600 w-10 h-10 flex items-center justify-center border border-sky-500 hover:border-red-500 transition-colors duration-100 cursor-pointer font-mono-regular text-xl z-[60]"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                onClick={goToNext}
                className="fixed right-4 top-1/2 -translate-y-1/2 bg-[#F7F0DD] text-gray-600 w-10 h-10 flex items-center justify-center border border-sky-500 hover:border-red-500 transition-colors duration-100 cursor-pointer font-mono-regular text-xl z-[60]"
                aria-label="Next image"
              >
                →
              </button>
            </>
          )}
          
          {/* Content container - stops event propagation */}
          <div 
            ref={modalContentRef}
            className="relative bg-transparent max-w-[90vw] max-h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loading spinner - only shown if loading takes more than 100ms */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-[#F7F0DD] border border-sky-500 p-6 rounded-sm flex items-center justify-center">
                  <FontAwesomeIcon icon={faSpinner} className="text-gray-600 text-3xl animate-spin" />
                </div>
              </div>
            )}
            
            {/* Error message */}
            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-[#F7F0DD] border border-red-500 p-4 rounded-sm">
                  <p className="text-gray-600">Failed to load image</p>
                </div>
              </div>
            )}
            
            <div className="relative w-auto h-auto max-w-full max-h-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={selectedImage.width || 1200}
                height={selectedImage.height || 800}
                className="object-contain pointer-events-auto"
                style={{
                  maxWidth: '90vw',
                  maxHeight: '80vh',
                  width: 'auto',
                  height: 'auto'
                }}
                onLoadStart={() => setLoadingWithDelay(true)}
                onLoad={() => {
                  setLoadingWithDelay(false);
                  setHasError(false);
                }}
                onError={() => {
                  setLoadingWithDelay(false);
                  setHasError(true);
                }}
                priority
              />
            </div>
          </div>
          
          {/* Image counter */}
          {images.length > 1 && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#F7F0DD] text-gray-600 px-4 py-2 border border-sky-500 font-mono-regular text-sm z-[60]">
              {selectedIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
} 