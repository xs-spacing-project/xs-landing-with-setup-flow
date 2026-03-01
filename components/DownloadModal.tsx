import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  ANDROID_DEEP_LINK_URL,
  APP_STORE_URL,
  PLAY_STORE_APP_URL,
  PLAY_STORE_URL,
} from "../constants";

type Platform = "ios" | "android" | "desktop";

const detectPlatform = (): Platform => {
  if (typeof navigator === "undefined") {
    return "desktop";
  }
  const userAgent = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(userAgent)) return "ios";
  if (/android/.test(userAgent)) return "android";
  return "desktop";
};

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [platform] = useState<Platform>(detectPlatform());

  useEffect(() => {
    if (!isOpen || platform === "desktop") return;

    let fallbackTimer: number | null = null;
    let webFallbackTimer: number | null = null;

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (fallbackTimer !== null) {
          window.clearTimeout(fallbackTimer);
          fallbackTimer = null;
        }
        if (webFallbackTimer !== null) {
          window.clearTimeout(webFallbackTimer);
          webFallbackTimer = null;
        }
        document.removeEventListener("visibilitychange", onVisibilityChange);
      }
    };

    const redirectTimer = window.setTimeout(() => {
      if (platform === "ios") {
        window.location.href = APP_STORE_URL;
        return;
      }

      fallbackTimer = window.setTimeout(() => {
        if (!document.hidden) {
          window.location.href = PLAY_STORE_APP_URL;
          webFallbackTimer = window.setTimeout(() => {
            if (!document.hidden) {
              window.location.href = PLAY_STORE_URL;
            }
            webFallbackTimer = null;
            document.removeEventListener(
              "visibilitychange",
              onVisibilityChange
            );
          }, 1200);
        }
        fallbackTimer = null;
      }, 1500);

      document.addEventListener("visibilitychange", onVisibilityChange);
      window.location.href = ANDROID_DEEP_LINK_URL;
    }, 2000);

    return () => {
      window.clearTimeout(redirectTimer);
      if (fallbackTimer !== null) window.clearTimeout(fallbackTimer);
      if (webFallbackTimer !== null) window.clearTimeout(webFallbackTimer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isOpen, platform]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 bg-brand-light dark:bg-brand-dark rounded-2xl border border-black/10 dark:border-white/10 shadow-2xl p-8 sm:p-10 max-w-md w-[90%] mx-4"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-brand-secondary hover:text-brand-dark dark:hover:text-brand-light transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <span className="text-5xl tracking-tight font-extrabold italic text-brand-dark dark:text-brand-light">
                Xs
              </span>

              {platform === "desktop" ? (
                <>
                  <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tighter text-brand-dark dark:text-brand-light">
                    Download Now
                  </h2>
                  <p className="mt-2 text-brand-secondary">
                    Get the best parking experience on your mobile device
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
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
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex-1 h-px bg-brand-secondary/20"></div>
                    <span className="text-xs text-brand-secondary">or</span>
                    <div className="flex-1 h-px bg-brand-secondary/20"></div>
                  </div>
                  <p className="mt-4 text-xs text-brand-secondary">
                    Scan the QR code to download
                  </p>
                  <img
                    src="/qr-code.svg"
                    alt="QR Code"
                    className="mt-2 w-32 h-32 mx-auto rounded-lg"
                  />
                </>
              ) : (
                <>
                  <h2 className="mt-4 text-2xl font-bold tracking-tighter text-brand-dark dark:text-brand-light">
                    Redirecting to{" "}
                    {platform === "ios" ? "App Store" : "Play Store"}...
                  </h2>
                  <p className="mt-2 text-brand-secondary">
                    You'll be redirected automatically
                  </p>
                  <div className="mt-6 w-48 h-1.5 bg-black/10 dark:bg-white/10 rounded-full mx-auto overflow-hidden">
                    <motion.div
                      className="h-full bg-brand-accent rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "linear" }}
                    />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DownloadModal;
