
import React from 'react';
import CostCalculator from '@/components/CostCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
        </div>  
        <CostCalculator />
      </div>
    </div>
  );
};

export default Index;
