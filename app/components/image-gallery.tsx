'use client';

import { useState } from 'react';
import Image from 'next/image';

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

  // Handle click on an image
  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    // Add event listener to handle Escape key
    document.addEventListener('keydown', handleKeyDown);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedImage(null);
    // Remove event listener when modal is closed
    document.removeEventListener('keydown', handleKeyDown);
  };

  // Handle key press events for the modal
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  // Handle click outside of image to close modal
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Style objects
  const closeButtonStyle = {
    position: 'absolute' as const,
    top: '-0.5rem',
    right: '-1rem',
    backgroundColor: '#F7F0DD', // cream background
    color: '#4b5563', // text-gray-600
    width: '2.5rem',
    height: '2.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #0ea5e9', // blue border
    cursor: 'pointer',
    fontFamily: 'SpaceMono-Bold, monospace',
    fontSize: '1.25rem',
    transition: 'all 0.1s ease-in-out',
  };

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
            style={{ 
              cursor: 'pointer',
              // If this is the last image and we have an odd number of images, make it span full width
              gridColumn: images.length % 2 !== 0 && index === images.length - 1 ? '1 / -1' : 'auto'
            }}
            onClick={() => openModal(image)}
          >
            <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '66.66%' }}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal overlay */}
      {selectedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 50,
            padding: '2rem'
          }}
          onClick={handleOutsideClick}
        >
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={selectedImage.width || 1200}
              height={selectedImage.height || 800}
              style={{ 
                maxHeight: '90vh', 
                maxWidth: '90vw', 
                objectFit: 'contain',
              }}
            />
            <button
              onClick={closeModal}
              style={closeButtonStyle}
              onMouseOver={(e) => {
                (e.target as HTMLButtonElement).style.borderColor = '#ef4444'; // Tailwind red-500
              }}
              onMouseOut={(e) => {
                (e.target as HTMLButtonElement).style.borderColor = '#0ea5e9'; // Tailwind sky-500
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
} 