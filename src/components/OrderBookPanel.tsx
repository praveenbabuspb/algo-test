import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import type { OrderBook } from '../types/trading';

interface OrderBookPanelProps {
  orderBook: OrderBook;
}

export function OrderBookPanel({ orderBook }: OrderBookPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Order Book</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Bids</h3>
          <div className="space-y-1">
            {orderBook.bids.map((bid, index) => (
              <div key={index} className="flex items-center justify-between text-green-600">
                <span className="flex items-center">
                  <ArrowUpCircle className="w-4 h-4 mr-1" />
                  ₹{bid.price.toFixed(2)}
                </span>
                <span>{bid.quantity}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Asks</h3>
          <div className="space-y-1">
            {orderBook.asks.map((ask, index) => (
              <div key={index} className="flex items-center justify-between text-red-600">
                <span className="flex items-center">
                  <ArrowDownCircle className="w-4 h-4 mr-1" />
                  ₹{ask.price.toFixed(2)}
                </span>
                <span>{ask.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">LTP</span>
          <span className="text-lg font-semibold">₹{orderBook.ltp.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
