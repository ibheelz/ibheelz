"use client";

import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function BlogDetailClient() {
  return <motion.div initial="initial" animate="animate" variants={pageVariants} />;
}
