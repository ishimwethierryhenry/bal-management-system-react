import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Placeholder images - you'll want to replace these with your actual image paths
const galleryImages = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  '/images/image4.jpg',
  '/images/image5.jpg',
  '/images/image6.jpg',
  '/images/image7.jpg',
  '/images/image8.jpg'
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-500 text-white">
      {/* Header */}
      <header className="bg-black/70 py-6 text-center">
        <h1 className="text-4xl font-bold">Gallery</h1>
      </header>

      {/* Content Container */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Basketball Africa League Gallery</h2>
          <p className="text-xl max-w-2xl mx-auto">
            Check out some of the best moments from the Basketball Africa League.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => handleImageClick(image)}
            >
              <img 
                src={image} 
                alt={`Gallery image ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-300"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.img
              src={selectedImage}
              alt="Selected gallery image"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="cta-buttons flex justify-center space-x-6 mt-16"
        >
          <Link 
            to="/" 
            className="bg-pink-500 text-white px-8 py-4 rounded-full hover:bg-yellow-400 hover:text-blue-900 transition-all"
          >
            HOME
          </Link>
          <Link 
            to="/register" 
            className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-full hover:bg-pink-500 hover:text-white transition-all"
          >
            Join the BAL Community
          </Link>
          <Link 
            to="/matches" 
            className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-blue-900 transition-all"
          >
            View Matches
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-black/70 text-center py-6">
        <p>&copy; 2024 Basketball Africa League. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Gallery;