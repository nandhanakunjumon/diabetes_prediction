import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';

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

interface PredictionResultsProps {
  data: PredictionData;
  result: PredictionResult;
  onReset: () => void;
}

const PredictionResults: React.FC<PredictionResultsProps> = ({ data, result, onReset }) => {
  const getRiskLevel = (percentage: number) => {
    if (percentage >= 70) return { level: 'High', color: 'text-destructive', bgColor: 'bg-destructive/10' };
    if (percentage >= 50) return { level: 'Moderate', color: 'text-warning', bgColor: 'bg-warning/10' };
    if (percentage >= 30) return { level: 'Low-Moderate', color: 'text-warning', bgColor: 'bg-warning/10' };
    return { level: 'Low', color: 'text-success', bgColor: 'bg-success/10' };
  };

  const risk = getRiskLevel(result.riskPercentage);

  const getIcon = () => {
    if (result.riskPercentage >= 50) return <AlertTriangle className="h-8 w-8 text-destructive" />;
    if (result.riskPercentage >= 30) return <AlertCircle className="h-8 w-8 text-warning" />;
    return <CheckCircle className="h-8 w-8 text-success" />;
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (data.glucose >= 126) {
      recommendations.push("Your glucose levels are elevated. Consult a healthcare provider immediately.");
    } else if (data.glucose >= 100) {
      recommendations.push("Monitor glucose levels regularly and maintain a balanced diet.");
    }

    if (data.bmi >= 30) {
      recommendations.push("Consider weight management strategies and increase physical activity.");
    } else if (data.bmi >= 25) {
      recommendations.push("Maintain current weight and consider light exercise routines.");
    }

    if (data.bloodPressure >= 140) {
      recommendations.push("High blood pressure detected. Monitor regularly and consult a doctor.");
    }

    if (data.age >= 45) {
      recommendations.push("Regular health screenings are recommended for your age group.");
    }

    if (recommendations.length === 0) {
      recommendations.push("Maintain your current healthy lifestyle with regular exercise and balanced diet.");
    }

    return recommendations;
  };

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      {/* Main Result Card */}
      <Card className="relative overflow-hidden" style={{ boxShadow: 'var(--shadow-result)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5" />
        <CardHeader className="text-center relative">
          <div className="flex items-center justify-center mb-4">
            <div className={`p-4 rounded-full ${risk.bgColor}`}>
              {getIcon()}
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            Diabetes Risk Analysis
          </CardTitle>
          <div className="space-y-4 mt-6">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {result.riskPercentage}%
              </div>
              <div className={`text-xl font-semibold ${risk.color}`}>
                {risk.level} Risk
              </div>
            </div>
            <div className="max-w-md mx-auto">
              <Progress value={result.riskPercentage} className="h-3" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative">
          <div className="text-center mb-6">
            <p className="text-lg">
              {result.isDiabetic ? (
                <span className="text-destructive font-semibold">
                  Based on the provided data, there is an elevated risk of diabetes.
                </span>
              ) : (
                <span className="text-success font-semibold">
                  Based on the provided data, the diabetes risk appears to be within normal range.
                </span>
              )}
            </p>
            <p className="text-muted-foreground mt-2">
              This assessment is for informational purposes only and should not replace professional medical consultation.
            </p>
          </div>

          <Button 
            onClick={onReset}
            variant="outline"
            className="w-full mb-6"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Perform Another Analysis
          </Button>
        </CardContent>
      </Card>

      {/* Input Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Your Health Data Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="font-semibold">Pregnancies</div>
              <div className="text-2xl font-bold text-primary">{data.pregnancies}</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="font-semibold">Glucose</div>
              <div className="text-2xl font-bold text-primary">{data.glucose} mg/dL</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="font-semibold">Blood Pressure</div>
              <div className="text-2xl font-bold text-primary">{data.bloodPressure} mmHg</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="font-semibold">Insulin</div>
              <div className="text-2xl font-bold text-primary">{data.insulin} mu U/ml</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="font-semibold">BMI</div>
              <div className="text-2xl font-bold text-primary">{data.bmi}</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="font-semibold">Age</div>
              <div className="text-2xl font-bold text-primary">{data.age} years</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Health Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {getRecommendations().map((recommendation, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm">{recommendation}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
            <p className="text-sm font-medium text-primary mb-2">Important Disclaimer:</p>
            <p className="text-sm text-muted-foreground">
              This prediction tool is designed for educational and informational purposes only. 
              It should not be used as a substitute for professional medical advice, diagnosis, or treatment. 
              Please consult with a qualified healthcare provider for personalized medical guidance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionResults;