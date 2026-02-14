'use client'

import { motion } from 'framer-motion'

import { useState, useEffect } from 'react'

// 18 images
const images = [
  '/photos-gabriel/1.avif',
  '/photos-gabriel/2.avif',
  '/photos-gabriel/3.avif',
  '/photos-gabriel/4.avif',
  '/photos-gabriel/5.avif',
  '/photos-gabriel/6.avif',
  '/photos-gabriel/7.avif',
  '/photos-gabriel/8.avif',
  '/photos-gabriel/9.avif',
  '/photos-gabriel/10.avif',
  '/photos-gabriel/11.avif',
  '/photos-gabriel/12.avif',
  '/photos-gabriel/13.avif',
  '/photos-gabriel/14.avif',
  '/photos-gabriel/15.avif',
  '/photos-gabriel/16.avif',
  '/photos-gabriel/17.avif',
  '/photos-gabriel/18.avif',
]

// Create 18 pairs of images (36 images in total)
const imagePairs = images.flatMap((image) => [image, image])

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const heartLayout = [
  [null, null, 0, 1, null, 2, 3, null, null],
  [null, 4, 5, 6, 7, 8, 9, 10, null],
  [11, 12, 13, 14, 15, 16, 17, 18, 19],
  [null, 20, 21, 22, 23, 24, 25, 26, null],
  [null, null, 27, 28, 29, 30, 31, null, null],
  [null, null, null, 32, 33, 34, null, null, null],
  [null, null, null, null, 35, null, null, null, null],
]

type ValentinesProposalProps = {
  handleShowProposal: () => void
}

export default function PhotoPairGame({
  handleShowProposal,
}: ValentinesProposalProps) {
  const [selected, setSelected] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [incorrect, setIncorrect] = useState<number[]>([])
  const [images] = useState(() => shuffleArray([...imagePairs]))

  const handleClick = async (index: number) => {
    if (
      selected.length === 2 ||
      matched.includes(index) ||
      selected.includes(index)
    )
      return

    if (selected.length === 1) {
      const firstIndex = selected[0]
      setSelected((prev) => [...prev, index])

      if (images[firstIndex] === images[index]) {
        setMatched((prev) => [...prev, firstIndex, index])
        setSelected([])
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second

        setIncorrect([firstIndex, index])
        setTimeout(() => setIncorrect([]), 1000) // Clear incorrect after 1 second
        setTimeout(() => setSelected([]), 1000)
      }
    } else {
      setSelected([index])
    }
  }

  // Check if game is won
  useEffect(() => {
    if (matched.length === imagePairs.length) {
      handleShowProposal()
    }
  }, [matched, handleShowProposal])

  return (
    <div className='grid grid-cols-9 gap-1 lg:gap-2 max-w-[95vw] mx-auto place-items-center user-select-none'>
      {/* Image preload */}
      <div className='hidden'>
        {images.map((image, i) => (
          <img
            key={i}
            src={image}
            alt={`Image ${i + 1}`}
            className='object-cover w-full h-full user-select-none'
          />
        ))}
      </div>

      {heartLayout.flat().map((index, i) =>
        index !== null ? (
          <motion.div
            key={i}
            className='w-[11vh] h-[11vh] lg:w-20 lg:h-20 relative cursor-pointer user-select-none'
            whileHover={{ scale: 1.1 }}
            onClick={() => handleClick(index)}
            style={{ perspective: '1000px' }} // Add perspective for 3D effect
          >
            {/* Back of the card */}
            {!selected.includes(index) && !matched.includes(index) && (
              <motion.div
                className='w-full h-full bg-red-500 rounded-sm lg:rounded-md absolute z-10 user-select-none'
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY:
                    selected.includes(index) || matched.includes(index)
                      ? 180
                      : 0,
                }}
                transition={{ duration: 0.5 }}
                style={{ backfaceVisibility: 'hidden' }}
              />
            )}

            {/* Front of the card (image) */}
            {(selected.includes(index) || matched.includes(index)) && (
              <motion.div
                className='w-full h-full absolute user-select-none'
                initial={{ rotateY: -180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.5 }}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img
                  src={images[index]}
                  alt={`Imagen ${index + 1}`}
                  className='rounded-sm lg:rounded-md object-cover w-full h-full user-select-none'
                />
              </motion.div>
            )}

            {/* Incorrect animation */}
            {incorrect.includes(index) && (
              <motion.div
                className='absolute inset-0 user-select-none'
                animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 0.5 }}
              >
                <div className='w-full h-full bg-red-500 rounded-sm lg:rounded-md user-select-none'></div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div
            key={i}
            className='w-[11vh] h-[11vh] lg:w-20 lg:h-20 user-select-none'
          />
        ),
      )}
    </div>
  )
}
