// app/components/InfoTooltip.jsx
"use client";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

export default function InfoTooltip({ message }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block ml-1 align-middle">
      <button
        type="button" // Evita que envíe el formulario
        className="text-gray-400 hover:text-gray-600 transition-colors"
        onClick={() => setVisible(prev => !prev)} 
        onBlur={() => setVisible(false)} 
      >
        <AiOutlineQuestionCircle size={18} />
      </button>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="
              absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2
              w-52 p-3 bg-white text-black text-sm
              rounded-lg shadow-xl border border-gray-200
            "
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}