import { useEffect, useState } from "react";
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
    }, 1500);

    return () => clearTimeout(timer);
  }, [platform]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
          <span className="text-3xl font-bold text-white">Xs</span>
        </div>
        
        {platform === "desktop" ? (
          <>
            <h1 className="text-3xl font-bold text-white mb-2">
              Download Xs App
            </h1>
            <p className="text-gray-400 mb-8">
              Get the best parking experience on your mobile device
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-100 transition-colors"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-100 transition-colors"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.31 0 .62.1.87.28l14.5 8.5c.52.31.52 1.13 0 1.44l-14.5 8.5c-.25.18-.56.28-.87.28-.83 0-1.5-.67-1.5-1.5z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-white mb-2">
              Redirecting to {platform === "ios" ? "App Store" : "Play Store"}...
            </h1>
            <p className="text-gray-400 mb-6">
              You'll be redirected automatically
            </p>
            <div className="w-48 h-1 bg-gray-700 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full animate-[loading_1.5s_ease-in-out]" 
                   style={{ animation: "loading 1.5s ease-in-out forwards" }} />
            </div>
            <style>{`
              @keyframes loading {
                from { width: 0%; }
                to { width: 100%; }
              }
            `}</style>
          </>
        )}
      </div>
    </div>
  );
};

export default DownloadPage;
