"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-32 px-6 lg:px-8 bg-card">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="font-heading font-semibold text-5xl lg:text-7xl text-primary mb-12 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          Get in touch
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
        >
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-body font-medium text-lg px-12 py-6 rounded-lg transition-all duration-300 hover:scale-105"
            asChild
          >
            <motion.a
              href="mailto:contact@artifexgroup.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Contact Us
            </motion.a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
