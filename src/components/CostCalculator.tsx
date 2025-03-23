import React, { useState, useEffect } from 'react';
import { Calculator, Euro, MessageSquare, Image, Mic, Clock, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

const CostCalculator = () => {
  const isMobile = useIsMobile();
  const defaultHourlyRate = 50;
  const defaultMessagesPerDay = 20;
  const defaultImagesPerDay = 5;
  const defaultVoiceMinutesPerDay = 7;
  
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
      
      setTimeSavings(Math.round(monthlySavingsMinutes));
      setMoneySavings(Math.round(monthlySavingsEuro));
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
    <div className="w-full min-h-screen flex items-start justify-center animate-fade-in py-4">      
      <Card className="glass-panel rounded-2xl overflow-hidden w-full max-w-4xl mx-2.5 shadow-xl">
        <div className="p-4 md:p-8">
          {!showResults ? (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-6">
                <h3 className="text-lg md:text-xl font-medium flex items-center gap-2 text-gray-800">
                  <Calculator className="h-5 w-5 text-brand" />
                  Geben Sie Ihre Daten ein um Ihre monatliche Ersparnis zu berechnen
                </h3>
                
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
                    <label htmlFor="hourlyRate" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Euro className="h-4 w-4 text-gray-500" />
                      Stundenlohn (€)
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                        className="w-20 h-8 text-right text-sm md:text-base"
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
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
                    <label htmlFor="messagesPerDay" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      WhatsApp Nachrichten pro Tag
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={messagesPerDay}
                        onChange={(e) => setMessagesPerDay(Number(e.target.value))}
                        className="w-20 h-8 text-right text-sm md:text-base"
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
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
                    <label htmlFor="imagesPerDay" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Image className="h-4 w-4 text-gray-500" />
                      Bilder/Dokumente pro Tag
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={imagesPerDay}
                        onChange={(e) => setImagesPerDay(Number(e.target.value))}
                        className="w-20 h-8 text-right text-sm md:text-base"
                        min={0}
                        max={500}
                      />
                      <span className="text-sm">Bilder/PDFs</span>
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
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
                    <label htmlFor="voiceMinutesPerDay" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mic className="h-4 w-4 text-gray-500" />
                      Sprachmemos (Minuten pro Tag)
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={voiceMinutesPerDay}
                        onChange={(e) => setVoiceMinutesPerDay(Number(e.target.value))}
                        className="w-20 h-8 text-right text-sm md:text-base"
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
                  className="bg-brand hover:bg-brand-dark text-white px-6 md:px-8 py-4 md:py-6 rounded-xl font-medium text-base md:text-lg transition-all duration-300 flex items-center gap-2"
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
            <div id="results-section" className="space-y-6 md:space-y-8 animate-fade-up">
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-4 md:mb-6">Ihre monatliche Ersparnis</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-100 shadow-sm">
                    <div className="flex flex-col items-center">
                      <Clock className="h-6 w-6 md:h-8 md:w-8 text-brand mb-2" />
                      <p className="text-xs md:text-sm text-gray-500 mb-1">Zeitersparnis pro Monat</p>
                      <div className="calculation-result text-base md:text-lg">
                        {timeSavings} Minuten
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-100 shadow-sm">
                    <div className="flex flex-col items-center">
                      <Euro className="h-6 w-6 md:h-8 md:w-8 text-brand mb-2" />
                      <p className="text-xs md:text-sm text-gray-500 mb-1">Kostenersparnis pro Monat</p>
                      <div className="calculation-result text-base md:text-lg">
                        {moneySavings} €
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-brand/20 rounded-xl p-4 md:p-6 space-y-3 md:space-y-4">
                <h4 className="font-medium text-gray-800 text-base md:text-lg">
                  {isMobile ? 'Rechtliche Absicherung durch InsurMagic' : 'Zusätzliche rechtliche Absicherung mithilfe von InsurMagic durch einfache Dokumentation'}
                </h4>
                
                <div className="prose prose-sm text-gray-600">
                  <p className="text-sm md:text-base">
                    Die 1-Klick Archivierungsfunktion von InsurMagic hilft Ihnen sich vor kostspieligen Rechtsstreitigkeiten durch Ordnungsgemäße Dokumentation zu schützen. 
                    Eine Fehlende oder unvollständige Dokumentation kann zu Schadensersatzforderungen von bis zu 250.000€ führen.
                  </p>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-lg p-3 md:p-4 mt-3 md:mt-4">
                  <h5 className="font-medium text-red-800 mb-2 text-sm md:text-base">Fallbeispiel: LG Halle (Saale), Urteil v. 31.03.2023</h5>
                  <p className="text-xs md:text-sm text-red-700 mb-3 md:mb-4">
                    Ein Versicherungsmakler wurde zu 101.000 € Schadensersatz verurteilt,
                    weil er die Beratung zur Gebäudeversicherung unzureichend dokumentiert hatte.
                    Das Gericht sah darin eine Verletzung der Dokumentationspflicht nach §§ 61, 63 VVG,
                    da weder eine Empfehlung zum Versicherungswert noch ein Hinweis auf Unterversicherung
                    dokumentiert wurden.
                  </p>
                  <a 
                    href="https://kanzlei-schlegelmilch.de/2023/09/25/beratungspflicht-des-versicherungsvermittlers/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors text-xs md:text-sm font-medium"
                  >
                    {isMobile ? 'Mehr Details' : 'Zum vollständigen Urteil'}
                    <svg className="w-3 h-3 md:w-4 md:h-4 ml-1.5 md:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-brand/5 rounded-xl p-4 md:p-6">
                <h4 className="font-medium text-gray-700 mb-2 md:mb-3 text-sm md:text-base">Annahmen zur Berechnung:</h4>
                <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="bg-brand rounded-full p-1 mt-0.5">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Archivierung von Textnachrichten: 2 Min. ohne InsurMagic vs. 10 Sek. mit InsurMagic
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-brand rounded-full p-1 mt-0.5">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Archivierung von Bildern/Dokumenten: 4 Min. ohne InsurMagic vs. 10 Sek. mit InsurMagic
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-brand rounded-full p-1 mt-0.5">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Verarbeitung von Sprachmemos: 1 Min. Sprachmemo anhören vs 20 Sek. mit Transkription 
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={resetCalculator}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 md:px-8 py-3 md:py-4 rounded-xl font-medium transition-all duration-300 text-sm md:text-base"
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
