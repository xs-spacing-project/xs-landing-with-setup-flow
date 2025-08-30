import React, { useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Compass,
  Search,
  Loader,
  CheckCircle,
  X,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// --- TYPES ---
type OwnerType = "commercial" | "land" | "other";
type SlotsType = "upto20" | "20-50" | "over50";
type SpaceType = "type1" | "type2" | "other";

interface FormData {
  ownerType: OwnerType | "";
  otherOwnerType: string;
  atLocationNow: "yes" | "no" | "";
  location: {
    address: string;
    lat: number | null;
    lng: number | null;
  };
  slots: SlotsType | "";
  contact: string;
  spaceType: SpaceType | "";
  otherSpaceType: string;
}

// --- CONSTANTS ---
const STEPS = [
  { id: 1, title: "Do you own your own parking slot?" },
  { id: 2, title: "Are you at the Parking Spot now?" },
  { id: 3, title: "Provide parking & contact details." },
  { id: 4, title: "Tell us more about your space." },
  { id: 5, title: "Submission Complete" },
];

// --- REUSABLE UI COMPONENTS ---

const ProgressIndicator: React.FC<{
  currentStep: number;
  totalSteps: number;
}> = ({ currentStep, totalSteps }) => (
  <div className="flex items-center space-x-4">
    <p className="text-sm font-semibold text-brand-secondary">
      Step{" "}
      <span className="text-brand-dark dark:text-brand-light">
        {currentStep}
      </span>{" "}
      of {totalSteps}
    </p>
    <div className="flex-1 h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-brand-accent"
        initial={{ width: 0 }}
        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  </div>
);

const SelectableCard: React.FC<{
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ title, description, isSelected, onClick }) => (
  <motion.div
    onClick={onClick}
    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
      isSelected
        ? "border-brand-accent bg-brand-accent/10 shadow-lg"
        : "border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 bg-black/5 dark:bg-white/5"
    }`}
    whileTap={{ scale: 0.98 }}
    role="radio"
    aria-checked={isSelected}
  >
    <h3 className="font-bold text-lg text-brand-dark dark:text-brand-light">
      {title}
    </h3>
    <p className="text-brand-secondary mt-1">{description}</p>
  </motion.div>
);

const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => (
  <input
    {...props}
    className="w-full bg-black/5 dark:bg-white/10 border-2 border-transparent focus:border-brand-accent focus:outline-none rounded-xl p-4 transition-colors"
  />
);

const SelectInput: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (
  props
) => (
  <div className="relative w-full">
    <select
      {...props}
      className="w-full appearance-none bg-black/5 dark:bg-white/10 border-2 border-transparent focus:border-brand-accent focus:outline-none rounded-xl p-4 transition-colors"
    >
      {props.children}
    </select>
    <ChevronDown
      size={20}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-secondary pointer-events-none"
    />
  </div>
);

const FormButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "outline";
    children: ReactNode;
  }
> = ({ variant = "primary", children, ...props }) => {
  const baseClasses =
    "w-full text-center font-semibold py-3 px-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-brand-dark disabled:opacity-50 disabled:cursor-not-allowed";
  const styles = {
    primary:
      "bg-brand-accent text-white hover:bg-brand-accent-hover focus:ring-brand-accent",
    secondary:
      "bg-black/20 dark:bg-white/20 text-brand-dark dark:text-brand-light hover:bg-black/30 dark:hover:bg-white/30 focus:ring-brand-secondary",
    outline:
      "bg-transparent border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary/10 hover:text-brand-dark dark:hover:text-brand-light focus:ring-brand-secondary",
  };
  const finalClassName = `${baseClasses} ${styles[variant]} ${
    props.className || ""
  }`;
  const buttonProps = { ...props, className: finalClassName };
  return <button {...buttonProps}>{children}</button>;
};

const SectionTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-dark dark:text-brand-light">
    {children}
  </h2>
);

// --- MODAL COMPONENT ---
const LocationSearchModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (location: string) => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  const [location, setLocation] = useState({
    state: "",
    district: "",
    city: "",
    landmark: "",
  });

  const handleConfirm = () => {
    const addressParts = [
      location.landmark,
      location.city,
      location.district,
      location.state,
    ];
    const fullAddress = addressParts.filter(Boolean).join(", ");
    onConfirm(fullAddress || "Manual location set");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-brand-light dark:bg-brand-dark w-full max-w-md rounded-2xl shadow-2xl p-6 border border-black/10 dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <h3 className="text-xl font-bold">Search Location</h3>
              </div>
            </div>

            <div className="space-y-4">
              <SelectInput
                value={location.state}
                onChange={(e) =>
                  setLocation({ ...location, state: e.target.value })
                }
              >
                <option value="">State</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
              </SelectInput>
              <SelectInput
                value={location.district}
                onChange={(e) =>
                  setLocation({ ...location, district: e.target.value })
                }
              >
                <option value="">District</option>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
              </SelectInput>
              <SelectInput
                value={location.city}
                onChange={(e) =>
                  setLocation({ ...location, city: e.target.value })
                }
              >
                <option value="">City/Town/Village</option>
                <option value="Pune City">Pune City</option>
                <option value="Pimpri-Chinchwad">Pimpri-Chinchwad</option>
              </SelectInput>
              <TextInput
                placeholder="Add Landmark"
                value={location.landmark}
                onChange={(e) =>
                  setLocation({ ...location, landmark: e.target.value })
                }
              />
            </div>

            <div className="mt-8">
              <FormButton onClick={handleConfirm}>Confirm Location</FormButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- FORM STEP COMPONENTS ---

const Step1_OwnerType: React.FC<{
  data: FormData;
  update: (field: keyof FormData, value: any) => void;
}> = ({ data, update }) => {
  return (
    <div className="space-y-4">
      <SelectableCard
        title="Commercial Parking"
        description="A functional facility with a track record of accommodating vehicles."
        isSelected={data.ownerType === "commercial"}
        onClick={() => update("ownerType", "commercial")}
      />
      <SelectableCard
        title="Land"
        description="Not currently a parking facility, but I want to list it as one."
        isSelected={data.ownerType === "land"}
        onClick={() => update("ownerType", "land")}
      />
      <SelectableCard
        title="Other"
        description="None of the above match my situation."
        isSelected={data.ownerType === "other"}
        onClick={() => update("ownerType", "other")}
      />
      <AnimatePresence>
        {data.ownerType === "other" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: -7.5 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <TextInput
              placeholder="Please specify"
              value={data.otherOwnerType}
              onChange={(e) => update("otherOwnerType", e.target.value)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Step2_Location: React.FC<{
  data: FormData;
  update: (field: keyof FormData, value: any) => void;
  openModal: () => void;
}> = ({ data, update, openModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLocation = () => {
    setIsLoading(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        update("location", {
          address: `Current Location (${position.coords.latitude.toFixed(
            4
          )}, ${position.coords.longitude.toFixed(4)})`,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        setError(
          "Could not fetch location. Please grant permission or try again."
        );
        console.error(err);
        setIsLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormButton
          variant={data.atLocationNow === "yes" ? "primary" : "secondary"}
          onClick={() => update("atLocationNow", "yes")}
        >
          Yes
        </FormButton>
        <FormButton
          variant={data.atLocationNow === "no" ? "primary" : "secondary"}
          onClick={() => update("atLocationNow", "no")}
        >
          No
        </FormButton>
      </div>

      <AnimatePresence>
        {data.atLocationNow && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 overflow-hidden"
          >
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/5 dark:bg-white/5">
              <Compass
                size={40}
                className="text-brand-accent mt-1 flex-shrink-0"
              />
              <div>
                <h4 className="font-bold">
                  {data.location.address ? "Location Set" : "Location:"}
                </h4>
                <p className="text-brand-secondary">
                  {data.location.address || "Your location will appear here."}
                </p>
              </div>
            </div>

            {data.atLocationNow === "yes" && (
              <FormButton
                variant="outline"
                onClick={fetchLocation}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin mx-auto" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Compass size={16} />
                    Fetch Location
                  </div>
                )}
              </FormButton>
            )}
            {data.atLocationNow === "no" && (
              <FormButton variant="outline" onClick={openModal}>
                <div className="flex items-center justify-center gap-2">
                  <Search size={16} />
                  Search Location
                </div>
              </FormButton>
            )}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Step3_Details: React.FC<{
  data: FormData;
  update: (field: keyof FormData, value: any) => void;
}> = ({ data, update }) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-bold mb-4">
        Approx. 4-wheeler slots available?
      </h3>
      <div className="grid grid-cols-3 gap-2">
        <FormButton
          variant={data.slots === "upto20" ? "primary" : "secondary"}
          onClick={() => update("slots", "upto20")}
        >
          Upto 20
        </FormButton>
        <FormButton
          variant={data.slots === "20-50" ? "primary" : "secondary"}
          onClick={() => update("slots", "20-50")}
        >
          20-50
        </FormButton>
        <FormButton
          variant={data.slots === "over50" ? "primary" : "secondary"}
          onClick={() => update("slots", "over50")}
        >
          GT 50
        </FormButton>
      </div>
    </div>
    <div>
      <h3 className="text-xl font-bold mb-4">Contact Details</h3>
      <div className="flex gap-2">
        <div className="bg-black/5 dark:bg-white/10 flex items-center justify-center px-4 rounded-xl">
          <span className="font-semibold text-brand-secondary">+91</span>
        </div>
        <TextInput
          placeholder="10-digit mobile number"
          type="tel"
          maxLength={10}
          minLength={10}
          value={data.contact}
          onChange={(e) => update("contact", e.target.value)}
        />
      </div>
    </div>
  </div>
);

const Step4_SpaceType: React.FC<{
  data: FormData;
  update: (field: keyof FormData, value: any) => void;
}> = ({ data, update }) => (
  <div className="space-y-4">
    <SelectableCard
      title="Type-I"
      description="It's a walled-in area, i.e., it is surrounded by brick walls"
      isSelected={data.spaceType === "type1"}
      onClick={() => update("spaceType", "type1")}
    />
    <SelectableCard
      title="Type-II"
      description="It's a non-walled-in area, i.e., an open space which is not walled"
      isSelected={data.spaceType === "type2"}
      onClick={() => update("spaceType", "type2")}
    />
    <SelectableCard
      title="Other"
      description="Neither of the above."
      isSelected={data.spaceType === "other"}
      onClick={() => update("spaceType", "other")}
    />
    <AnimatePresence>
      {data.spaceType === "other" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: -7.5 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <TextInput
            placeholder="Please specify"
            value={data.otherSpaceType}
            onChange={(e) => update("otherSpaceType", e.target.value)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Step5_ThankYou: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center py-10 relative flex flex-col items-center justify-center h-full">
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <span className="text-[12rem] font-extrabold italic text-black/5 dark:text-white/5 select-none">
          Xs
        </span>
      </div>
      <CheckCircle size={64} className="mx-auto text-brand-accent mb-6" />
      <h2 className="text-4xl font-bold mb-2">Thank You!</h2>
      <p className="text-lg text-brand-secondary max-w-sm mx-auto">
        Our Outreach Team will contact you shortly!
      </p>
      <div className="mt-8 w-full max-w-xs">
        <FormButton onClick={() => navigate("/")}>Continue using Xs</FormButton>
      </div>
    </div>
  );
};

// --- MAIN FORM COMPONENT ---

export const ParkingSetupForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    ownerType: "",
    otherOwnerType: "",
    atLocationNow: "",
    location: { address: "", lat: null, lng: null },
    slots: "",
    contact: "",
    spaceType: "",
    otherSpaceType: "",
  });

  const updateFormData = useCallback((field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const isNextDisabled = () => {
    switch (currentStep) {
      case 1:
        if (formData.ownerType === "other") {
          return !formData.otherOwnerType.trim();
        }
        return !formData.ownerType;
      case 2:
        return !formData.atLocationNow || !formData.location.address;
      case 3:
        const phoneRegex = /^\d{10}$/;
        return !formData.slots || !phoneRegex.test(formData.contact);
      case 4:
        if (formData.spaceType === "other") {
          return !formData.otherSpaceType.trim();
        }
        return !formData.spaceType;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 5 && !isNextDisabled()) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmLocation = (address: string) => {
    updateFormData("location", { ...formData.location, address });
    setIsModalOpen(false);
  };

  const steps = [
    <Step1_OwnerType data={formData} update={updateFormData} />,
    <Step2_Location
      data={formData}
      update={updateFormData}
      openModal={() => setIsModalOpen(true)}
    />,
    <Step3_Details data={formData} update={updateFormData} />,
    <Step4_SpaceType data={formData} update={updateFormData} />,
    <Step5_ThankYou />,
  ];

  const totalSteps = steps.length - 1;

  const animationVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: { y: 0, opacity: 1 },
    exit: (direction: number) => ({
      y: direction > 0 ? -30 : 30,
      opacity: 0,
    }),
  };

  return (
    <>
      <LocationSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmLocation}
      />
      <div className="grid md:grid-cols-2 md:gap-16 lg:gap-24">
        {/* --- LEFT COLUMN (Info) --- */}
        <div className="py-8 md:py-16 hidden md:block">
          <div className="sticky top-32 space-y-8">
            {currentStep <= totalSteps ? (
              <>
                <div className="flex items-center gap-4">
                  {/* {currentStep > 1 ? (
                    <button
                      onClick={handleBack}
                      className="p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
                    >
                      <ArrowLeft size={20} />
                    </button>
                  ) : (
                    <div className="w-9 h-9" /> // Placeholder
                  )} */}
                  <h3 className="font-bold">Set Up Your Parking</h3>
                </div>
                <ProgressIndicator
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                />
                <SectionTitle>{STEPS[currentStep - 1].title}</SectionTitle>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <h3 className="font-bold text-2xl text-brand-secondary">
                  All Done!
                </h3>
              </div>
            )}
          </div>
        </div>

        {/* --- RIGHT COLUMN (Form) --- */}
        <div className="py-8 md:py-16">
          {/* Mobile Header */}
          {currentStep <= totalSteps && (
            <div className="md:hidden mb-8 space-y-4">
              <div className="flex items-center gap-4">
                {/* {currentStep > 1 ? (
                  <button
                    onClick={handleBack}
                    className="p-2 rounded-full bg-black/10 dark:bg-white/10"
                  >
                    <ArrowLeft size={20} />
                  </button>
                ) : (
                  <div className="w-9 h-9" /> // Placeholder
                )} */}

                <div className="flex-grow">
                  <h3 className="font-bold mb-4">Set Up Your Parking</h3>
                  <ProgressIndicator
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                  />
                </div>
              </div>
              <SectionTitle>{STEPS[currentStep - 1].title}</SectionTitle>
            </div>
          )}

          <div className="relative min-h-[450px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={animationVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-full"
              >
                {steps[currentStep - 1]}
              </motion.div>
            </AnimatePresence>
          </div>

          {currentStep <= totalSteps && (
            <div className="mt-8 flex justify-end items-center gap-4">
              {currentStep > 1 && (
                <FormButton
                  variant="secondary"
                  onClick={handleBack}
                  className="w-auto px-8"
                >
                  Back
                </FormButton>
              )}
              <FormButton
                onClick={handleNext}
                disabled={isNextDisabled()}
                className="w-auto px-8"
              >
                {currentStep === totalSteps ? "Finish" : "Next"}
              </FormButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
