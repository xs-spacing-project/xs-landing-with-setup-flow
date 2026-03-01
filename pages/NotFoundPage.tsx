import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const NotFoundPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center"
    >
      {/* Large 404 */}
      <p className="text-[10rem] sm:text-[14rem] font-extrabold tracking-tighter leading-none text-brand-accent/10 select-none">
        404
      </p>

      {/* Offset content over the big number */}
      <div className="-mt-12 sm:-mt-16 flex flex-col items-center gap-4">
        <span className="text-5xl sm:text-6xl font-extrabold tracking-tight italic text-brand-accent">
          Xs
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter text-brand-dark dark:text-brand-light">
          Page not found
        </h1>
        <p className="max-w-sm text-brand-secondary">
          The page you're looking for doesn't exist or has been moved. Head back
          home to find your parking spot.
        </p>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-accent text-white font-semibold rounded-full hover:bg-brand-accent-hover transition-colors"
          >
            <Home size={16} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black/5 dark:bg-white/5 text-brand-dark dark:text-brand-light font-semibold rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;
