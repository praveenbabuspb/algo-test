import React, { useState, useEffect } from 'react';
import { OrderBookPanel } from './components/OrderBookPanel';
import { TradingControls } from './components/TradingControls';
import { PositionsPanel } from './components/PositionsPanel';
import { OrderHistory } from './components/OrderHistory';
import { AlertsPanel } from './components/AlertsPanel';
import type { OrderBook, Position, Order, Alert } from './types/trading';

// Mock data for demonstration
const mockOrderBook: OrderBook = {
  instrument: 'NIFTY50',
  bids: [
    { price: 19250.50, quantity: 100 },
    { price: 19249.75, quantity: 150 },
    { price: 19249.00, quantity: 200 },
  ],
  asks: [
    { price: 19251.25, quantity: 75 },
    { price: 19252.00, quantity: 125 },
    { price: 19252.75, quantity: 175 },
  ],
  ltp: 19250.75,
};

const mockPositions: Position[] = [
  {
    instrument: 'NIFTY50',
    quantity: 100,
    averagePrice: 19245.50,
    currentPrice: 19250.75,
    pnl: 525,
  },
];

const mockOrders: Order[] = [
  {
    id: '1',
    instrument: 'NIFTY50',
    type: 'BUY',
    quantity: 100,
    price: 19245.50,
    status: 'FILLED',
    timestamp: new Date().toISOString(),
  },
];

function App() {
  const [isTrading, setIsTrading] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const handleToggleTrading = () => {
    const newStatus = !isTrading;
    setIsTrading(newStatus);
    
    const alert: Alert = {
      id: Date.now().toString(),
      type: newStatus ? 'success' : 'warning',
      message: newStatus ? 'Trading algorithm started' : 'Trading algorithm stopped',
      timestamp: new Date().toISOString(),
    };
    
    setAlerts(prev => [alert, ...prev]);
  };

  const handleDismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  // Auto-refresh mock data every 5 seconds
  useEffect(() => {
    if (!isTrading) return;

    const interval = setInterval(() => {
      // In a real application, this would fetch new data from API
      console.log('Refreshing data...');
    }, 5000);

    return () => clearInterval(interval);
  }, [isTrading]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Trading Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor and control your algorithmic trading activities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TradingControls
              isTrading={isTrading}
              onToggleTrading={handleToggleTrading}
            />
            <OrderBookPanel orderBook={mockOrderBook} />
          </div>
          
          <div className="space-y-6">
            <PositionsPanel positions={mockPositions} />
            <OrderHistory orders={mockOrders} />
          </div>
        </div>

        <AlertsPanel
          alerts={alerts}
          onDismiss={handleDismissAlert}
        />
      </div>
    </div>
  );
}

export default App;
