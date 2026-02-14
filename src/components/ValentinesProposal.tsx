import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Fireworks from '@fireworks-js/react'
const images = [
  '/photos-siufun/1.avif',
  '/photos-siufun/2.avif',
  '/photos-siufun/3.avif',
  '/photos-siufun/4.avif',
  '/photos-siufun/5.avif',
  '/photos-siufun/6.avif',
  '/photos-siufun/7.avif',
  '/photos-siufun/8.avif',
  '/photos-siufun/9.avif',
  '/photos-siufun/10.avif',
  '/photos-siufun/11.avif',
  '/photos-siufun/12.avif',
  '/photos-siufun/13.avif',
  '/photos-siufun/14.avif',
  '/photos-siufun/15.avif',
  '/photos-siufun/16.avif',
  '/photos-siufun/17.avif',
  '/photos-siufun/18.avif',
  // '/photos-siufun/19.avif',
  // '/photos-siufun/20.avif',
  // '/photos-siufun/21.avif',
  // '/photos-siufun/22.avif',
  // '/photos-siufun/23.avif',
  // '/photos-siufun/24.avif',
  // '/photos-siufun/25.avif',
  // '/photos-siufun/26.avif',
  // '/photos-siufun/27.avif',
  // '/photos-siufun/28.avif',
  // '/photos-siufun/29.avif',
  // '/photos-siufun/30.avif',
  // '/photos-siufun/31.avif',
  // '/photos-siufun/32.avif',
  // '/photos-siufun/33.avif',
  // '/photos-siufun/34.avif',
  // '/photos-siufun/35.avif',
  // '/photos-siufun/36.avif',
]

export default function ValentinesProposal() {
  const [step, setStep] = useState(0)
  const [position, setPosition] = useState<{
    top: string
    left: string
  } | null>(null)
  const [showFireworks, setShowFireworks] = useState(false)

  const getRandomPosition = () => {
    const randomTop = Math.random() * 80
    const randomLeft = Math.random() * 80
    return { top: `${randomTop}%`, left: `${randomLeft}%` }
  }

  useEffect(() => {
    if (step < 2) {
      // Change step after 5 seconds
      const timer = setTimeout(() => {
        setStep((prevStep) => prevStep + 1)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [step])

  const handleYesClick = () => {
    setShowFireworks(true)
    setStep(3)
  }

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <AnimatePresence mode='wait'>
        {step === 0 && (
          <motion.h2
            key='step-0'
            className={`text-4xl font-semibold mb-4`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            ¡Felicidades amorcito! Has completado el juego.
          </motion.h2>
        )}
        {step === 1 && (
          <motion.h2
            key='step-1'
            className={`text-4xl font-semibold mb-4`}
            transition={{ duration: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            ¡Tengo una sorpresa para ti!
          </motion.h2>
        )}
        {step === 2 && (
          <motion.div
            key='step-2'
            transition={{ duration: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='flex flex-col items-center'
          >
            {/* Image Grid Background */}
            <div className='absolute inset-0 grid grid-cols-6 opacity-10'>
              {[...images, ...images].slice(0, 18).map((src, index) => (
                <div key={index} className='relative h-full'>
                  <img
                    src={src}
                    alt={`Memory ${index + 1}`}
                    className='object-cover w-full h-full'
                  />
                </div>
              ))}
            </div>

            <div className='text-center z-10'>
              <h2 className={`text-5xl font-semibold mb-8`}>
                ¿Quieres ser mi San Valentín?
              </h2>
              <img
                className='mx-auto mb-8'
                src='/sad_hamster.png'
                alt='Sad Hamster'
                width={200}
                height={200}
              />
              <div className='grid grid-cols-2 gap-4'>
                <button
                  className='px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
                  onClick={handleYesClick}
                >
                  ¡Sí, acepto! 🥰
                </button>
                <button
                  className='px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-95 transition-all duration-300 shadow-lg'
                  style={
                    position
                      ? {
                          position: 'absolute',
                          top: position.top,
                          left: position.left,
                        }
                      : {}
                  }
                  onMouseEnter={() => setPosition(getRandomPosition())}
                  onClick={() => setPosition(getRandomPosition())}
                >
                  No, lo siento 😢
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key='step-3'
            className={`text-4xl font-semibold mb-4 flex flex-col justify-center items-center`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            ¡Gracias por aceptar, te amo! ❤️
            <p className='text-sm mt-4'>¡Hoy toca pisada de nuca! 🥵</p>
            <img
              src='/hamster_jumping.gif'
              alt='Hamster Feliz'
              width={200}
              height={200}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showFireworks && (
        <div className='absolute w-full h-full'>
          <Fireworks
            options={{
              autoresize: true,
            }}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </div>
      )}
    </div>
  )
}
