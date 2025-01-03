import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Position } from '../types/trading';

interface PositionsPanelProps {
  positions: Position[];
}

export function PositionsPanel({ positions }: PositionsPanelProps) {
  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Live Positions</h2>
        <div className={`flex items-center ${
          totalPnL >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          <span className="text-sm font-medium mr-1">Net P&L:</span>
          <span className="text-lg font-semibold">
            ₹{Math.abs(totalPnL).toFixed(2)}
            {totalPnL >= 0 ? (
              <TrendingUp className="w-4 h-4 inline ml-1" />
            ) : (
              <TrendingDown className="w-4 h-4 inline ml-1" />
            )}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {positions.map((position, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">{position.instrument}</span>
              <span className={`${
                position.pnl >= 0 ? 'text-green-600' : 'text-red-600'
              } font-semibold`}>
                ₹{Math.abs(position.pnl).toFixed(2)}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <span className="block text-gray-500">Quantity</span>
                <span>{position.quantity}</span>
              </div>
              <div>
                <span className="block text-gray-500">Avg. Price</span>
                <span>₹{position.averagePrice.toFixed(2)}</span>
              </div>
              <div>
                <span className="block text-gray-500">Current</span>
                <span>₹{position.currentPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
        {positions.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No open positions
          </div>
        )}
      </div>
    </div>
  );
}