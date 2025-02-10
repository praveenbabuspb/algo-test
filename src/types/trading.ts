export interface OrderBook {
  instrument: string;
  bids: Array<{
    price: number;
    quantity: number;
  }>;
  asks: Array<{
    price: number;
    quantity: number;
  }>;
  ltp: number;
}


export interface Position {
  instrument: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  pnl: number;
}

export interface Order {
  id: string;
  instrument: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  status: 'PENDING' | 'FILLED' | 'CANCELLED';
  timestamp: string;
}

export interface Alert {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
}
