import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Rocket, Target } from 'lucide-react';

const PortfolioReturnDisplay = ({ series }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isPositive, setIsPositive] = useState(true);

  let totalReturn = null;
  const portfolioArr = series.find((s) => s.name === 'Portfolio')?.values;
  
  if (portfolioArr && portfolioArr.length > 1) {
    const lastFactor = portfolioArr[portfolioArr.length - 1];
    totalReturn = (lastFactor - 1) * 100;
  }

  useEffect(() => {
    if (totalReturn !== null) {
      setIsPositive(totalReturn >= 0);
      let start = 0;
      const steps = 50;
      const increment = totalReturn / steps;
      const timer = setInterval(() => {
        if (start < totalReturn) {
          start += increment;
          setAnimatedValue(start);
        } else {
          setAnimatedValue(totalReturn);
          clearInterval(timer);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [totalReturn]);

  if (totalReturn === null) return null;

  const getReturnColor = () => {
    if (totalReturn >= 20) return 'text-green-600';
    if (totalReturn >= 0) return 'text-green-500';
    if (totalReturn >= -10) return 'text-red-400';
    return 'text-red-600';
  };

  const getBackgroundGradient = () => {
    return isPositive 
      ? 'bg-gradient-to-br from-green-50 to-blue-50'
      : 'bg-gradient-to-br from-red-50 to-orange-50';
  };

  const getIcon = () => {
    if (totalReturn >= 20) return <Rocket className="w-8 h-8 text-green-600" />;
    if (totalReturn >= 0) return <TrendingUp className="w-8 h-8 text-green-500" />;
    return <TrendingDown className="w-8 h-8 text-red-500" />;
  };

  return (
    <div className={`rounded-xl shadow-lg p-8 mt-8 ${getBackgroundGradient()} transition-all duration-500`}>
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Your 10-Year Portfolio Journey
          </h2>
        </div>
        
        <div className="flex flex-col items-center">
          <div className={`text-5xl sm:text-6xl font-bold ${getReturnColor()} transition-colors duration-500`}>
            {animatedValue.toFixed(2)}%
          </div>
          <p className="text-gray-600 mt-2 text-lg">Total Return</p>
        </div>

        <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-blue-500" />
              <p className="text-gray-700">
                {isPositive ? 'Outperforming' : 'Underperforming'} initial investment
              </p>
            </div>
            <p className="text-sm text-gray-600">
              {isPositive 
                ? `Your investment has grown by ${totalReturn.toFixed(2)}% over the past decade` 
                : `Your investment has decreased by ${Math.abs(totalReturn).toFixed(2)}% over the past decade`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioReturnDisplay;