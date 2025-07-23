import React, { useState } from 'react';
import DiabetesPredictionForm from '@/components/DiabetesPredictionForm';
import PredictionResults from '@/components/PredictionResults';

interface PredictionData {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  insulin: number;
  bmi: number;
  age: number;
}

interface PredictionResult {
  isDiabetic: boolean;
  riskPercentage: number;
}

const Index = () => {
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handlePredict = (data: PredictionData, result: PredictionResult) => {
    setPredictionData(data);
    setPredictionResult(result);
    setShowResults(true);
  };

  const handleReset = () => {
    setPredictionData(null);
    setPredictionResult(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
            <div className="bg-gradient-to-r from-primary to-primary-glow p-3 rounded-full">
              <svg className="h-8 w-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            PredictWell
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI-powered diabetes risk assessment using machine learning algorithms
          </p>
        </div>

        {/* Content */}
        {!showResults ? (
          <DiabetesPredictionForm onPredict={handlePredict} />
        ) : (
          predictionData && predictionResult && (
            <PredictionResults 
              data={predictionData}
              result={predictionResult}
              onReset={handleReset}
            />
          )
        )}

        {/* Footer */}
        <div className="text-center mt-16 py-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2024 PredictWell. Empowering health decisions through AI.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
