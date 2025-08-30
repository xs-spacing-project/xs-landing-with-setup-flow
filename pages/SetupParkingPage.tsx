import React from 'react';
import { ParkingSetupForm } from '../components/ParkingSetupForm';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SetupParkingPage: React.FC = () => {
  return (
    <div className="py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-brand-accent hover:text-brand-accent-hover font-semibold">
            <ArrowLeft className="mr-2" size={16} />
            Back to Home
          </Link>
        </div>
        <ParkingSetupForm />
      </div>
    </div>
  );
};

export default SetupParkingPage;