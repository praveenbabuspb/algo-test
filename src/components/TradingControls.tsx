import React from 'react';
import { Play, Pause, AlertTriangle } from 'lucide-react';

interface TradingControlsProps {
  isTrading: boolean;
  onToggleTrading: () => void;
}

export function TradingControls({ isTrading, onToggleTrading }: TradingControlsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-lg font-semibold mr-2">Trading Status</span>
          <span className={`px-2 py-1 rounded-full text-sm ${
            isTrading ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isTrading ? 'Active' : 'Inactive'}
          </span>
        </div>
        <button
          onClick={onToggleTrading}
          className={`flex items-center px-4 py-2 rounded-lg text-white ${
            isTrading 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isTrading ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Stop Trading
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start Trading
            </>
          )}
        </button>
      </div>
      {isTrading && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-700">
            Algorithm is actively trading. Monitor positions carefully.
          </p>
        </div>
      )}
    </div>
  );
}