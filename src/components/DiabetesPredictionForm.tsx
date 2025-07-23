import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Heart, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PredictionData {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  insulin: number;
  bmi: number;
  age: number;
}

interface DiabetesPredictionFormProps {
  onPredict: (data: PredictionData, result: { isDiabetic: boolean; riskPercentage: number }) => void;
}

const DiabetesPredictionForm: React.FC<DiabetesPredictionFormProps> = ({ onPredict }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PredictionData>({
    pregnancies: 0,
    glucose: 0,
    bloodPressure: 0,
    insulin: 0,
    bmi: 0,
    age: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof PredictionData, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  // Mock prediction algorithm - replace with actual ML model API call
  const calculatePrediction = (data: PredictionData) => {
    let riskScore = 0;

    // Glucose risk (most important factor)
    if (data.glucose >= 126) riskScore += 40;
    else if (data.glucose >= 100) riskScore += 20;
    else if (data.glucose >= 70) riskScore += 5;

    // BMI risk
    if (data.bmi >= 30) riskScore += 25;
    else if (data.bmi >= 25) riskScore += 15;
    else if (data.bmi >= 18.5) riskScore += 5;

    // Age risk
    if (data.age >= 45) riskScore += 15;
    else if (data.age >= 35) riskScore += 8;

    // Blood pressure risk
    if (data.bloodPressure >= 140) riskScore += 10;
    else if (data.bloodPressure >= 120) riskScore += 5;

    // Pregnancies risk (for women)
    if (data.pregnancies >= 4) riskScore += 8;
    else if (data.pregnancies >= 2) riskScore += 4;

    // Insulin risk
    if (data.insulin >= 200) riskScore += 7;
    else if (data.insulin >= 100) riskScore += 3;

    const riskPercentage = Math.min(riskScore, 95);
    const isDiabetic = riskPercentage >= 50;

    return { isDiabetic, riskPercentage };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.glucose <= 0 || formData.bmi <= 0 || formData.age <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid values for all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const result = calculatePrediction(formData);
      onPredict(formData, result);
      setIsLoading(false);
      
      toast({
        title: "Analysis Complete",
        description: "Your diabetes risk assessment is ready.",
      });
    }, 1500);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" style={{ boxShadow: 'var(--shadow-medical)' }}>
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-primary to-primary-glow p-3 rounded-full">
            <Activity className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Diabetes Risk Assessment
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          Enter your health information for an AI-powered diabetes risk analysis
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pregnancies" className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                Pregnancies
              </Label>
              <Input
                id="pregnancies"
                type="number"
                min="0"
                max="20"
                value={formData.pregnancies}
                onChange={(e) => handleInputChange('pregnancies', e.target.value)}
                placeholder="Number of pregnancies"
                className="transition-all duration-200 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="glucose" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Glucose Level (mg/dL) *
              </Label>
              <Input
                id="glucose"
                type="number"
                min="0"
                max="300"
                value={formData.glucose}
                onChange={(e) => handleInputChange('glucose', e.target.value)}
                placeholder="e.g., 120"
                required
                className="transition-all duration-200 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
              <Input
                id="bloodPressure"
                type="number"
                min="0"
                max="200"
                value={formData.bloodPressure}
                onChange={(e) => handleInputChange('bloodPressure', e.target.value)}
                placeholder="e.g., 120"
                className="transition-all duration-200 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="insulin">Insulin Level (mu U/ml)</Label>
              <Input
                id="insulin"
                type="number"
                min="0"
                max="500"
                value={formData.insulin}
                onChange={(e) => handleInputChange('insulin', e.target.value)}
                placeholder="e.g., 80"
                className="transition-all duration-200 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bmi">BMI (Body Mass Index) *</Label>
              <Input
                id="bmi"
                type="number"
                min="0"
                max="60"
                step="0.1"
                value={formData.bmi}
                onChange={(e) => handleInputChange('bmi', e.target.value)}
                placeholder="e.g., 25.3"
                required
                className="transition-all duration-200 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age (years) *</Label>
              <Input
                id="age"
                type="number"
                min="0"
                max="120"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="e.g., 35"
                required
                className="transition-all duration-200 focus:ring-primary/20"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity text-lg py-6"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing Health Data...
              </div>
            ) : (
              'Analyze Diabetes Risk'
            )}
          </Button>
          
          <p className="text-sm text-muted-foreground text-center">
            * Required fields. This tool provides estimates only and should not replace professional medical advice.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default DiabetesPredictionForm;