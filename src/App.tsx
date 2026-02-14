import { useState } from 'react'
import { motion } from 'framer-motion'
import PhotoPairGame from './components/PhotoPairGame'
import ValentinesProposal from './components/ValentinesProposal'
import TextFooter from './components/TextFooter'
import OrientationGuard from './components/OrientationGuard'

const ANIM_DURATION = 2

export default function App() {
  const [showValentinesProposal, setShowValentinesProposal] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleShowProposal = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setShowValentinesProposal(true)
    }, ANIM_DURATION * 1000)
  }

  return (
    <OrientationGuard>
      <main className='flex items-center justify-center min-h-screen bg-black overflow-hidden relative'>
        {!showValentinesProposal ? (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: ANIM_DURATION }}
            className='flex flex-col items-center'
          >
            <h1 className='text-white text-4xl lg:text-5xl font-semibold leading-tight py-20'>
              <span className='text-gray-400'>Encuentra</span> <br /> los pares
            </h1>
            <PhotoPairGame handleShowProposal={handleShowProposal} />
            <h2 className='text-white text-2xl lg:text-3xl font-semibold leading-tight text-right py-20'>
              para revelar <br />{' '}
              <span className='text-gray-400'>la sorpresa</span>
            </h2>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: ANIM_DURATION }}
          >
            <ValentinesProposal />
          </motion.div>
        )}
      </main>
    </OrientationGuard>
  )
}
