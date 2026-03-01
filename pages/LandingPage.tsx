import React, { useState, createContext, useContext } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  Variants,
} from "framer-motion";
import {
  Map,
  Zap,
  Clock,
  ShieldCheck,
  Plus,
  Minus,
  Star,
  MapPin,
  Navigation,
  Sparkles,
  Info,
} from "lucide-react";
import { TESTIMONIALS, FAQ_ITEMS } from "../constants";
import DownloadModal from "../components/DownloadModal";

// Context to share modal state across sections
const DownloadModalContext = createContext<{
  openDownloadModal: () => void;
  openComingSoonModal: () => void;
}>({ openDownloadModal: () => {}, openComingSoonModal: () => {} });

const MotionDiv = motion.div;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

/** Renders a text string with every occurrence of "Xs" styled as the brand logo. */
const StyledXsText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/\b(Xs)\b/);
  return (
    <>
      {parts.map((part, i) =>
        part === "Xs" ? (
          <span key={i} className="tracking-tight font-extrabold italic not-italic-parent">
            Xs
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

const HeroSection: React.FC = () => {
  const { openDownloadModal, openComingSoonModal } = useContext(DownloadModalContext);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-brand-light dark:bg-brand-dark z-0">
        <div className="absolute inset-0 bg-grid-zinc-300/[0.2] dark:bg-grid-zinc-700/[0.2]"></div>
      </div>

      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center z-10 px-4"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-brand-dark to-brand-secondary dark:from-brand-light dark:to-brand-secondary">
            Divine Journeys.
          </span>
          <br />
          <span>Reserved Parking.</span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-brand-secondary"
        >
          Focus on your faith, not the friction of finding a parking spot. <span className="tracking-tight font-extrabold italic">Xs</span>
          {" "}provides seamless, pre-booked parking near temples and religious
          sites.
        </motion.p>
        <MotionDiv
          variants={itemVariants}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
        >
          <button
            onClick={openDownloadModal}
            className="inline-block bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 w-full sm:w-auto"
          >
            Download the App
          </button>
          <button
            onClick={openComingSoonModal}
            className="inline-block bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-brand-secondary/30 text-brand-dark dark:text-brand-light font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 w-full sm:w-auto"
          >
            List Your Space
          </button>
        </MotionDiv>
      </MotionDiv>
      <motion.div
        className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-brand-light dark:from-brand-dark to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      />
    </section>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Map size={32} />,
      title: "Interactive Map View",
      description:
        "Visually locate and select the best parking spots with our easy-to-use map interface.",
    },
    {
      icon: <Clock size={32} />,
      title: "Rush Hour Prediction",
      description:
        "Our smart algorithm predicts high-traffic periods, so you can plan ahead and avoid the crowds.",
    },
    {
      icon: <Zap size={32} />,
      title: "Instant Prepaid Booking",
      description:
        "Book and pay for your spot in seconds. No more searching for cash or change.",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Secure & Reliable",
      description:
        "All our parking locations are verified for safety and security, giving you peace of mind.",
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Everything you need, nothing you don't.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-brand-secondary">
            <span className="tracking-tight font-extrabold italic">Xs</span> is packed with features designed to make your pilgrimage smooth
            and stress-free.
          </p>
        </MotionDiv>
        <MotionDiv
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {features.map((feature, i) => (
            <MotionDiv
              key={i}
              variants={itemVariants}
              className="bg-black/5 dark:bg-white/5 p-8 rounded-2xl border border-black/10 dark:border-white/10 backdrop-blur-lg"
            >
              <div className="text-brand-accent">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 text-brand-secondary">{feature.description}</p>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
};

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Search Your Destination",
      description: "Enter the temple or religious place you plan to visit.",
    },
    {
      number: "02",
      title: "Choose Your Parking",
      description:
        "Browse available spots on the map, filter by price, distance, and see rush predictions.",
    },
    {
      number: "03",
      title: "Book & Pay",
      description:
        "Select your spot, choose your arrival time, and pay securely within the app.",
    },
    {
      number: "04",
      title: "Park with Ease",
      description:
        "Navigate to your reserved spot using the app and enjoy your visit, stress-free.",
    },
  ];
  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-32 bg-white/5 dark:bg-black/5"
    >
      <div className="max-w-7xl mx-auto px-4">
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Four Steps to Parking Nirvana
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-brand-secondary">
            Getting started with <span className="tracking-tight font-extrabold italic">Xs</span> is as simple as it gets.
          </p>
        </MotionDiv>
        <div className="mt-16 max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <MotionDiv
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={itemVariants}
              className="flex items-start space-x-6 p-6"
            >
              <div className="text-3xl font-bold text-brand-accent">
                {step.number}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="mt-2 text-brand-secondary">{step.description}</p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection: React.FC = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-20 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold tracking-tighter"
          >
            Our Mission is Simple
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg text-brand-secondary"
          >
            <span className="tracking-tight font-extrabold italic">Xs</span> was born from a personal struggle: the chaos of finding parking
            during auspicious occasions. We believe that a spiritual journey
            should begin with peace, not parking-related stress.
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-brand-secondary"
          >
            Our goal is to use technology to bridge the gap between devotion and
            convenience, allowing pilgrims and visitors to focus on what truly
            matters. We are a team of engineers, designers, and believers
            dedicated to this cause.
          </motion.p>
        </MotionDiv>
        <div className="relative aspect-[4/5] max-h-[600px] w-full overflow-hidden rounded-2xl">
          <motion.img
            src="/pick-spot-park-comfort.png"
            alt="Pick your spot, park with comfort"
            className="w-full h-full object-contain"
            style={{ y }}
          />
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="py-20 sm:py-32 bg-white/5 dark:bg-black/5"
    >
      <div className="max-w-7xl mx-auto px-4">
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Loved by Devotees at Khatu Shyam Ji
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-brand-secondary">
            Hear from pilgrims who made their visit stress-free with <span className="tracking-tight font-extrabold italic">Xs</span>.
          </p>
        </MotionDiv>
        <MotionDiv
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <MotionDiv
              key={i}
              variants={itemVariants}
              className="bg-brand-light dark:bg-brand-dark p-8 rounded-2xl border border-black/10 dark:border-white/10 flex flex-col"
            >
              <div className="flex-grow">
                <div className="flex items-center text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} />
                  ))}
                </div>
                <p className="mt-4 text-brand-secondary italic">
                  "<StyledXsText text={testimonial.quote} />"
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-brand-secondary">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
};

const FaqItem: React.FC<{
  item: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-brand-secondary/20">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-6 text-left"
      >
        <h3 className="text-lg font-semibold"><StyledXsText text={item.question} /></h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-brand-secondary"><StyledXsText text={item.answer} /></p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-20 sm:py-32">
      <div className="max-w-3xl mx-auto px-4">
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-brand-secondary">
            Have questions? We've got answers.
          </p>
        </MotionDiv>
        <div className="mt-12">
          {FAQ_ITEMS.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const OPERATIONAL_LOCATIONS = [
  {
    name: "Khatu Shyam Ji",
    state: "Rajasthan",
    status: "live" as const,
    description:
      "Pre-book parking for one of India's most visited pilgrimage destinations. Skip the chaos during Ekadashi, Falgun Mela, and daily darshan.",
    highlights: ["Falgun Mela Ready", "Ekadashi Parking", "24/7 Availability"],
  },
];

const UPCOMING_LOCATIONS = [
  { name: "Mehandipur Balaji Temple", state: "Rajasthan" },
  { name: "Govind Dev Ji", state: "Rajasthan" },
  { name: "Salasar Balaji Temple", state: "Rajasthan" },
];

const LocationsSection: React.FC = () => {
  return (
    <section
      id="locations"
      className="py-20 sm:py-32 bg-white/5 dark:bg-black/5"
    >
      <div className="max-w-7xl mx-auto px-4">
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Where We Operate
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-brand-secondary">
            Currently live at one of India's most beloved pilgrimage sites, with
            more locations on the way.
          </p>
        </MotionDiv>

        {/* Live Locations */}
        <MotionDiv
          className="mt-16 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {OPERATIONAL_LOCATIONS.map((location, i) => (
            <MotionDiv
              key={i}
              variants={itemVariants}
              className="relative overflow-hidden bg-brand-light dark:bg-brand-dark p-8 sm:p-10 rounded-2xl border border-brand-accent/30 shadow-lg shadow-brand-accent/5"
            >
              {/* Live Badge */}
              <div className="absolute top-6 right-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-500 border border-green-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Live
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent">
                  <MapPin size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    {location.name}
                  </h3>
                  <p className="text-brand-secondary font-medium">
                    {location.state}
                  </p>
                  <p className="mt-3 text-brand-secondary">
                    {location.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {location.highlights.map((highlight, j) => (
                      <span
                        key={j}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-brand-accent/10 text-brand-accent border border-brand-accent/20"
                      >
                        <Sparkles size={12} />
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </MotionDiv>
          ))}
        </MotionDiv>

        {/* Upcoming Locations */}
        <MotionDiv
          className="mt-12 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3
            variants={itemVariants}
            className="text-xl font-bold text-center mb-6"
          >
            <span className="text-brand-secondary">Coming Soon</span>
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {UPCOMING_LOCATIONS.map((location, i) => (
              <MotionDiv
                key={i}
                variants={itemVariants}
                className="flex items-center gap-3 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
              >
                <Navigation
                  size={16}
                  className="text-brand-secondary flex-shrink-0"
                />
                <div>
                  <h4 className="font-semibold text-sm">{location.name}</h4>
                  <p className="text-xs text-brand-secondary">
                    {location.state}
                  </p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

const AppPreviewSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-32" id="locations">
      <div className="max-w-7xl mx-auto px-4">
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            See the App in Action
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-brand-secondary">
            A seamless experience from searching to parking — right from your
            phone.
          </p>
        </MotionDiv>
        <div className="mt-16 flex justify-center gap-6 sm:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="w-[160px] sm:w-[220px] md:w-[260px]"
          >
            <img
              src="/home-ios.png"
              alt="Xs app — browse nearby parking spots"
              className="w-full h-auto rounded-2xl shadow-2xl border border-black/10 dark:border-white/10"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="w-[160px] sm:w-[220px] md:w-[260px]"
          >
            <img
              src="/booked-home-ios.png"
              alt="Xs app — booked parking confirmation"
              className="w-full h-auto rounded-2xl shadow-2xl border border-black/10 dark:border-white/10"
            />
          </motion.div>
        </div>
        <p className="mt-6 text-center text-xs text-brand-secondary inline-flex items-center justify-center gap-1.5 w-full">
          <Info size={14} className="flex-shrink-0" />
          Screenshots from iOS. Android experience may vary slightly.
        </p>
      </div>
    </section>
  );
};

const LandingPage: React.FC = () => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  return (
    <DownloadModalContext.Provider
      value={{
        openDownloadModal: () => setIsDownloadModalOpen(true),
        openComingSoonModal: () => setIsComingSoonOpen(true),
      }}
    >
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <LocationsSection />
      <AppPreviewSection />
      <AboutSection />
      <TestimonialsSection />
      <FaqSection />
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
      {/* Coming Soon Modal */}
      <AnimatePresence>
        {isComingSoonOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            onClick={() => setIsComingSoonOpen(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 bg-brand-light dark:bg-brand-dark rounded-2xl border border-black/10 dark:border-white/10 shadow-2xl p-8 sm:p-10 max-w-sm w-[90%] mx-4 text-center"
            >
              <button
                onClick={() => setIsComingSoonOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-brand-secondary hover:text-brand-dark dark:hover:text-brand-light transition-colors"
                aria-label="Close"
              >
                <Plus size={20} className="rotate-45" />
              </button>
              <div className="mx-auto w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mb-4">
                <Sparkles size={28} className="text-brand-accent" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                Coming Soon
              </h3>
              <p className="mt-3 text-brand-secondary">
                The "List Your Space" feature is under development. Soon you'll be able to list your parking space and earn from it.
              </p>
              <button
                onClick={() => setIsComingSoonOpen(false)}
                className="mt-6 bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold py-2.5 px-6 rounded-full transition-colors"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DownloadModalContext.Provider>
  );
};

export default LandingPage;
