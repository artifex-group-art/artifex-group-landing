"use client"

import { motion } from "framer-motion"

export function HeroSection() {
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delay: 1.2,
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden bg-background">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full grid-pattern" />

        <div className="floating-number top-20 right-32">01</div>
        <div className="floating-number bottom-32 left-20">25</div>

        {/* Geometric Lines */}
        <div className="absolute top-1/4 left-1/3 w-px h-32 bg-muted-foreground/20 transform rotate-12" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-px bg-muted-foreground/30" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-muted-foreground/20 transform rotate-45" />

        {/* Accent Rectangles */}
        <div className="absolute top-40 right-20 w-2 h-20 bg-gradient-to-b from-stone-400 to-stone-600" />
        <div className="absolute bottom-40 left-40 w-12 h-2 bg-gradient-to-r from-stone-400 to-stone-600" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-12 gap-8 items-center min-h-screen">
          {/* Left Column - Main Title */}
          <div className="col-span-12 lg:col-span-7">
            <div className="geometric-accent mb-8">
              <motion.h1
                className="font-heading font-bold text-7xl lg:text-9xl text-primary leading-[0.85] tracking-tighter"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
              >
                {"ARTIFEX".split("").map((letter, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block">
                    {letter}
                  </motion.span>
                ))}
                <br />
                <span className="text-outline font-light">
                  {"GROUP".split("").map((letter, index) => (
                    <motion.span key={index + 7} variants={letterVariants} className="inline-block">
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>
            </div>

            <motion.div
              className="flex items-center gap-8 mt-12"
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="w-16 h-px bg-stone-500" />
              <p className="font-body text-lg text-muted-foreground font-light uppercase tracking-wider">
                International Architecture
              </p>
            </motion.div>
          </div>

          {/* Right Column - Tagline and Details */}
          <div className="col-span-12 lg:col-span-5 lg:pl-12">
            <motion.div className="space-y-8" variants={subtitleVariants} initial="hidden" animate="visible">
              <div className="diagonal-line">
                <h2 className="font-body text-2xl lg:text-3xl text-primary font-light leading-relaxed text-balance">
                  Architecture is about experience, not only visual.
                </h2>
              </div>

              <div className="space-y-6 pt-8">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 border border-stone-400 flex items-center justify-center">
                    <div className="w-2 h-2 bg-stone-500" />
                  </div>
                  <span className="font-body text-sm text-muted-foreground uppercase tracking-wide">
                    Based in Tashkent
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 border border-stone-400 flex items-center justify-center">
                    <div className="w-2 h-2 bg-stone-500" />
                  </div>
                  <span className="font-body text-sm text-muted-foreground uppercase tracking-wide">
                    Modern Design Focus
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 border border-stone-400 flex items-center justify-center">
                    <div className="w-2 h-2 bg-stone-500" />
                  </div>
                  <span className="font-body text-sm text-muted-foreground uppercase tracking-wide">
                    Interiors & Landscapes
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
