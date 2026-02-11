import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [platform] = useState<Platform>(detectPlatform());

  useEffect(() => {
    let redirectUrl: string;

    switch (platform) {
      case "ios":
        redirectUrl = APP_STORE_URL;
        break;
      case "android":
        redirectUrl = PLAY_STORE_URL;
        break;
      default:
        navigate("/");
        return;
    }

    const timer = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 500);

    return () => clearTimeout(timer);
  }, [platform, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Redirecting to {platform === "ios" ? "App Store" : "Play Store"}...
        </h1>
        <p className="text-gray-400">
          You'll be redirected automatically
        </p>
        {platform !== "desktop" && (
          <button
            onClick={() => {
              window.location.href = platform === "ios" ? APP_STORE_URL : PLAY_STORE_URL;
            }}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Open {platform === "ios" ? "App Store" : "Play Store"}
          </button>
        )}
      </div>
    </div>
  );
};

export default DownloadPage;
