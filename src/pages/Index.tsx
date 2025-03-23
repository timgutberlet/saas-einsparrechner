
import React from 'react';
import CostCalculator from '@/components/CostCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            WhatsApp-Manager
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Berechnen Sie Ihre Einsparungen mit unserem professionellen WhatsApp Management Tool.
          </p>
        </div>
        
        <CostCalculator />
        
        <div className="mt-20 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} WhatsApp-Manager | Alle Rechte vorbehalten
        </div>
      </div>
    </div>
  );
};

export default Index;
