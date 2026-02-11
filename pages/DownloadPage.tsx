import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { APP_STORE_URL, PLAY_STORE_URL } from "../constants";

type Platform = "ios" | "android" | "desktop";

const detectPlatform = (): Platform => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return "ios";
  }
  
  if (/android/.test(userAgent)) {
    return "android";
  }
  
  return "desktop";
};

const DownloadPage: React.FC = () => {
  const [platform] = useState<Platform>(detectPlatform());

  useEffect(() => {
    if (platform === "desktop") return;

    const redirectUrl = platform === "ios" ? APP_STORE_URL : PLAY_STORE_URL;
    
    const timer = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 2000);

    return () => clearTimeout(timer);
  }, [platform]);

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-6"
      >
        <Link to="/" className="inline-block mb-8">
          <span className="text-4xl font-extrabold italic text-brand-dark dark:text-brand-light">
            Xs
          </span>
        </Link>
        
        {platform === "desktop" ? (
          <>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold tracking-tighter text-brand-dark dark:text-brand-light mb-4"
            >
              Download Xs
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-brand-secondary mb-10 max-w-md mx-auto"
            >
              Get the best parking experience on your mobile device
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform transform hover:scale-105 w-[180px]"
              >
                <img 
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                  alt="Download on the App Store"
                  className="w-full h-auto"
                />
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform transform hover:scale-105 w-[180px]"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Get it on Google Play"
                  className="w-full h-auto"
                />
              </a>
            </motion.div>
          </>
        ) : (
          <>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold tracking-tighter text-brand-dark dark:text-brand-light mb-3"
            >
              Redirecting to {platform === "ios" ? "App Store" : "Play Store"}...
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-brand-secondary mb-8"
            >
              You'll be redirected automatically
            </motion.p>
            <div className="w-48 h-1.5 bg-black/10 dark:bg-white/10 rounded-full mx-auto overflow-hidden">
              <motion.div 
                className="h-full bg-brand-accent rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "linear" }}
              />
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default DownloadPage;
