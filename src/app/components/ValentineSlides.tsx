import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronLeft } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Chief Complaint",
    status: "Ongoing",
    content: "Persistent warmth in the chest area when thinking about one incredibly intelligent, kind, and beautiful future doctor.",
    buttonText: "Review Symptoms",
    statusColor: "text-rose-600"
  },
  {
    id: 2,
    title: "Symptoms",
    status: "Well Documented",
    content: [
      "Smiling for no reason",
      "Feeling calm just by hearing your voice",
      "Wanting to share every good moment with you",
      "Complete certainty that you're my favorite person"
    ],
    buttonText: "Assessment",
    statusColor: "text-rose-600"
  },
  {
    id: 3,
    title: "Assessment",
    status: "Stable",
    content: "Condition appears chronic and irreversible.\n\nPatient reports feeling safe, supported, and genuinely happy in your presence.",
    buttonText: "Final Recommendation",
    statusColor: "text-rose-600"
  },
  {
    id: 4,
    title: "Final Recommendation",
    status: "High Priority",
    content: "Proceed with Valentine's Day together.\nLaugh a lot.\nEat something good with patient.\n\nWill you be Patient's Valentine?",
    buttonText: "Accept",
    rejectButton: true,
    statusColor: "text-rose-600"
  },
  {
    id: 5,
    title: "Rejection Disclaimer",
    status: "Medical Notice",
    content: "Wait! Your medical license doesn't cover rejection of this specific patient.\n\nLook how sad he'll be:",
    showImages: true,
    buttonText: "Accept ❤",
    statusColor: "text-rose-600"
  },
  {
    id: 6,
    title: "Case Closed",
    status: "Approved",
    content: "Recommendation accepted.\n\nPrognosis: Extremely good.\nThank you, Doctor ❤",
    buttonText: "View Treatment Plan",
    statusColor: "text-green-600"
  },
  {
    id: 7,
    title: "Treatment Plan",
    status: "Ongoing Care",
    content: "Daily doses of:\n• Laughter and smiles\n• Quality time together\n• Shared meals and moments\n• Endless support and love\n• Being the best Valentine ever\n\nPrescribed by: Your biggest admirer\nDuration: Forever ❤",
    buttonText: "Happy Valentine's Day! 💕",
    isFinal: true,
    statusColor: "text-rose-600"
  }
];

export function ValentineSlides() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showForeverModal, setShowForeverModal] = useState(false);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleReject = () => {
    setShowRejectionModal(true);
    setTimeout(() => {
      setShowRejectionModal(false);
      setCurrentSlide(4); // Go to rejection slide
    }, 2000);
  };

  const handleAccept = () => {
    if (currentSlide === 3) {
      // From Final Recommendation (index 3), skip Rejection Disclaimer and go directly to Case Closed (index 5)
      setCurrentSlide(5);
    } else if (currentSlide === 4) {
      // From Rejection Disclaimer (index 4), also go to Case Closed (index 5)
      setCurrentSlide(5);
    } else {
      handleNext();
    }
  };

  const slide = slides[currentSlide];

  // Floating hearts in background
  const FloatingHearts = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-400/30"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: window.innerHeight + 50,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: -100,
            x: Math.random() * window.innerWidth
          }}
          transition={{ 
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        >
          <Heart size={Math.random() * 30 + 20} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-8">
      <FloatingHearts />
      
      {/* Back Button */}
      {currentSlide > 0 && (
        <motion.button
          onClick={handleBack}
          className="fixed top-8 left-8 bg-white/90 backdrop-blur-lg text-rose-600 p-3 rounded-full shadow-lg z-10 hover:bg-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={28} />
        </motion.button>
      )}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full max-w-2xl"
        >
          <motion.div 
            className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-12"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Title */}
            <motion.h1 
              className="text-4xl sm:text-5xl mb-4 text-gray-900"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {slide.title}
            </motion.h1>
            
            {/* Status */}
            <motion.p 
              className={`text-lg sm:text-xl mb-8 ${slide.statusColor}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {slide.status}
            </motion.p>

            {/* Content */}
            <motion.div 
              className="mb-8 text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {Array.isArray(slide.content) ? (
                <ul className="space-y-3 text-lg sm:text-xl">
                  {slide.content.map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <span className="mr-3 text-rose-500">•</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-lg sm:text-xl whitespace-pre-line leading-relaxed">
                  {slide.content}
                </p>
              )}

              {/* Images for rejection slide */}
              {slide.showImages && (
                <motion.div 
                  className="grid grid-cols-2 gap-4 mt-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1676986448970-c735d055948c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWQlMjBiYWJ5JTIwZmFjZXxlbnwxfHx8fDE3NzEwNTAzNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                      alt="Sad baby"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1655210912171-c53b1b2f95ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWQlMjBjYXQlMjBtZW1lfGVufDF8fHx8MTc3MTA1MDM2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                      alt="Sad cat"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </motion.div>
              )}

              {slide.showImages && (
                <p className="text-lg sm:text-xl mt-6 text-gray-800">
                  Please reconsider the correct medical procedure.
                </p>
              )}
            </motion.div>

            {/* Buttons */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={slide.isFinal ? () => setShowForeverModal(true) : slide.id === 4 ? handleAccept : handleNext}
                className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-4 px-8 rounded-2xl text-xl shadow-lg transition-all"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(244, 63, 94, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                {slide.buttonText}
              </motion.button>

              {slide.rejectButton && (
                <motion.button
                  onClick={handleReject}
                  className="w-full bg-transparent border-2 border-rose-300 text-rose-600 py-4 px-8 rounded-2xl text-xl transition-all"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(244, 63, 94, 0.05)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reject ✗
                </motion.button>
              )}
            </motion.div>

            {/* Progress indicator */}
            <div className="mt-8 flex justify-center gap-2">
              {slides.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'w-8 bg-rose-500' 
                      : index < currentSlide 
                      ? 'w-2 bg-rose-300' 
                      : 'w-2 bg-gray-300'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Rejection Modal */}
      <AnimatePresence>
        {showRejectionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white rounded-3xl p-8 max-w-md text-center shadow-2xl"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5, repeat: 1 }}
              >
                <p className="text-2xl mb-4">😢</p>
              </motion.div>
              <p className="text-xl text-gray-800">
                Oh no! Let me show you something...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Forever Modal */}
      <AnimatePresence>
        {showForeverModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-rose-500/80 via-pink-500/80 to-red-500/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowForeverModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.5, y: -100, opacity: 0 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="bg-white rounded-3xl p-10 sm:p-12 max-w-lg text-center shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating hearts inside modal */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-rose-300"
                    initial={{ 
                      x: Math.random() * 400,
                      y: 500,
                      scale: Math.random() * 0.3 + 0.2,
                      opacity: 0.6
                    }}
                    animate={{ 
                      y: -50,
                      x: Math.random() * 400
                    }}
                    transition={{ 
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: Math.random() * 2
                    }}
                  >
                    <Heart size={20} fill="currentColor" />
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="relative z-10"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                  className="text-6xl mb-6"
                >
                  💕
                </motion.div>
                
                <h2 className="text-3xl sm:text-4xl mb-4 text-gray-900">
                  One More Thing...
                </h2>
                
                <p className="text-xl sm:text-2xl text-gray-800 mb-6 leading-relaxed">
                  Not just for Valentine's Day...
                </p>
                
                <motion.p 
                  className="text-2xl sm:text-3xl text-rose-600 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Will you be my Valentine <span className="italic">forever</span>?
                </motion.p>

                <motion.p
                  className="text-lg text-gray-700 mb-8 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Through every sunrise, every late-night study session, every dream we chase together...
                </motion.p>

                <motion.button
                  onClick={() => setShowForeverModal(false)}
                  className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 px-10 rounded-2xl text-xl shadow-lg"
                  whileHover={{ scale: 1.1, boxShadow: "0 20px 40px rgba(244, 63, 94, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  Forever & Always ❤️
                </motion.button>

                <motion.p
                  className="text-sm text-gray-500 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  (Click anywhere to close)
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}