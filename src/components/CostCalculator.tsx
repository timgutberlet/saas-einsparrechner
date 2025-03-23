import React, { useState, useEffect } from 'react';
import { Calculator, Euro, MessageSquare, Image, Mic, Clock, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

const CostCalculator = () => {
  const defaultHourlyRate = 50;
  const defaultMessagesPerDay = 20;
  const defaultImagesPerDay = 5;
  const defaultVoiceMinutesPerDay = 15;
  
  const [hourlyRate, setHourlyRate] = useState<number>(defaultHourlyRate);
  const [messagesPerDay, setMessagesPerDay] = useState<number>(defaultMessagesPerDay);
  const [imagesPerDay, setImagesPerDay] = useState<number>(defaultImagesPerDay);
  const [voiceMinutesPerDay, setVoiceMinutesPerDay] = useState<number>(defaultVoiceMinutesPerDay);
  
  const [timeSavings, setTimeSavings] = useState<number | null>(null);
  const [moneySavings, setMoneySavings] = useState<number | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  
  const validateInputs = (): boolean => {
    return hourlyRate > 0;
  };

  const calculateSavings = () => {
    if (!validateInputs()) return;
    
    setIsCalculating(true);
    
    setTimeout(() => {
      const S = Number(hourlyRate);
      const N = Number(messagesPerDay);
      const B = Number(imagesPerDay);
      const M = Number(voiceMinutesPerDay);
      
      const monthlySavingsMinutes = 22 * ((N * 1.833) + (B * 3.833) + (M * 0.667));
      
      const monthlySavingsEuro = (monthlySavingsMinutes / 60) * S;
      
      setTimeSavings(Math.round(monthlySavingsMinutes * 10) / 10);
      setMoneySavings(Math.round(monthlySavingsEuro * 100) / 100);
      setShowResults(true);
      setIsCalculating(false);
    }, 800);
  };

  const resetCalculator = () => {
    setHourlyRate(defaultHourlyRate);
    setMessagesPerDay(defaultMessagesPerDay);
    setImagesPerDay(defaultImagesPerDay);
    setVoiceMinutesPerDay(defaultVoiceMinutesPerDay);
    setTimeSavings(null);
    setMoneySavings(null);
    setShowResults(false);
  };

  useEffect(() => {
    if (showResults) {
      const resultsElement = document.getElementById('results-section');
      resultsElement?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showResults]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-fade-in">      
      <Card className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-6 md:p-8">
          {!showResults ? (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-6">
                <h3 className="text-xl font-medium flex items-center gap-2 text-gray-800">
                  <Calculator className="h-5 w-5 text-brand" />
                  Geben Sie Ihre Daten ein
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="hourlyRate" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Euro className="h-4 w-4 text-gray-500" />
                      Stundenlohn (€)
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                        className="w-16 h-8 text-right"
                        min={0}
                        max={500}
                      />
                      <span className="text-sm">€</span>
                    </div>
                  </div>
                  <Slider
                    id="hourlyRate"
                    value={[hourlyRate]}
                    min={0}
                    max={200}
                    step={1}
                    onValueChange={(value) => setHourlyRate(value[0])}
                    className="cursor-pointer"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="messagesPerDay" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      WhatsApp Nachrichten pro Tag
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={messagesPerDay}
                        onChange={(e) => setMessagesPerDay(Number(e.target.value))}
                        className="w-16 h-8 text-right"
                        min={0}
                        max={500}
                      />
                      <span className="text-sm">Nachrichten</span>
                    </div>
                  </div>
                  <Slider
                    id="messagesPerDay"
                    value={[messagesPerDay]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setMessagesPerDay(value[0])}
                    className="cursor-pointer"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="imagesPerDay" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Image className="h-4 w-4 text-gray-500" />
                      Bilder/Dokumente pro Tag
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={imagesPerDay}
                        onChange={(e) => setImagesPerDay(Number(e.target.value))}
                        className="w-16 h-8 text-right"
                        min={0}
                        max={500}
                      />
                      <span className="text-sm">Bilder</span>
                    </div>
                  </div>
                  <Slider
                    id="imagesPerDay"
                    value={[imagesPerDay]}
                    min={0}
                    max={50}
                    step={1}
                    onValueChange={(value) => setImagesPerDay(value[0])}
                    className="cursor-pointer"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="voiceMinutesPerDay" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mic className="h-4 w-4 text-gray-500" />
                      Sprachmemos (Minuten pro Tag)
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={voiceMinutesPerDay}
                        onChange={(e) => setVoiceMinutesPerDay(Number(e.target.value))}
                        className="w-16 h-8 text-right"
                        min={0}
                        max={500}
                      />
                      <span className="text-sm">Minuten</span>
                    </div>
                  </div>
                  <Slider
                    id="voiceMinutesPerDay"
                    value={[voiceMinutesPerDay]}
                    min={0}
                    max={60}
                    step={1}
                    onValueChange={(value) => setVoiceMinutesPerDay(value[0])}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={calculateSavings}
                  disabled={!validateInputs() || isCalculating}
                  className="bg-brand hover:bg-brand-dark text-white px-8 py-6 rounded-xl font-medium text-lg transition-all duration-300 flex items-center gap-2"
                >
                  {isCalculating ? (
                    <>Berechne<span className="ml-2 animate-pulse">...</span></>
                  ) : (
                    <>Berechnen <ArrowRight className="h-5 w-5 ml-1" /></>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div id="results-section" className="space-y-8 animate-fade-up">
              <div className="text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-6">Ihre monatliche Ersparnis</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex flex-col items-center">
                      <Clock className="h-8 w-8 text-brand mb-2" />
                      <p className="text-sm text-gray-500 mb-1">Zeitersparnis pro Monat</p>
                      <div className="calculation-result">
                        {timeSavings} Minuten
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex flex-col items-center">
                      <Euro className="h-8 w-8 text-brand mb-2" />
                      <p className="text-sm text-gray-500 mb-1">Kostenersparnis pro Monat</p>
                      <div className="calculation-result">
                        {moneySavings} €
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-brand/5 rounded-xl p-6">
                <h4 className="font-medium text-gray-700 mb-3">Annahmen zur Berechnung:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="bg-brand rounded-full p-1 mt-0.5">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Archivierung von Textnachrichten: 2 Min. ohne Software vs. 10 Sek. mit Software
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-brand rounded-full p-1 mt-0.5">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Archivierung von Bildern/Dokumenten: 4 Min. ohne Software vs. 10 Sek. mit Software
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-brand rounded-full p-1 mt-0.5">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Verarbeitung von Sprachmemos: 1 Min. Sprachmemo mit Transkription in 20 Sek. verständlich
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={resetCalculator}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-4 rounded-xl font-medium transition-all duration-300"
                >
                  Neue Berechnung
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CostCalculator;
