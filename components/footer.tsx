"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="py-16 px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Left Side - Company Description */}
          <div className="max-w-md">
            <p className="font-body text-foreground/70 leading-relaxed">
              Artifex is a Tashkent based studio practice focused on modern design, interiors and landscapes.
            </p>
          </div>

          {/* Right Side - Social Links and Copyright */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex gap-6">
              <motion.a
                href="#"
                className="text-foreground/60 hover:text-foreground transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297z" />
                </svg>
              </motion.a>

              <motion.a
                href="#"
                className="text-foreground/60 hover:text-foreground transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Behance</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 2-5.101 2-3.074 0-5.564-1.584-5.564-5.33 0-3.330 2.014-5.63 5.564-5.63 3.19 0 4.901 2.3 4.901 5.63 0 .394-.045.79-.134 1.146h-7.596c.135 1.597 1.304 2.684 3.074 2.684 1.048 0 1.959-.415 2.597-1.107L22 16.845z" />
                </svg>
              </motion.a>
            </div>

            <p className="font-body text-sm text-foreground/60">© 2024 ARTIFEX GROUP</p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
