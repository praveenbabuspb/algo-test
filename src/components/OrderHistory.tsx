import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { Order } from '../types/trading';

interface OrderHistoryProps {
  orders: Order[];
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'FILLED':
        return <CheckCircle className="w-4 h-5 text-green-500" />;
      case 'CANCELLED':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'PENDING':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Order History</h2>
      <div className="space-y-2">
        {orders.map((order) => (
          <div key={order.id} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {getStatusIcon(order.status)}
                <span className="ml-2 font-medium">{order.instrument}</span>
              </div>
              <span className={`text-sm font-medium ${
                order.type === 'BUY' ? 'text-green-600' : 'text-red-600'
              }`}>
                {order.type}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <span className="block text-gray-500">Quantity</span>
                <span>{order.quantity}</span>
              </div>
              <div>
                <span className="block text-gray-500">Price</span>
                <span>₹{order.price.toFixed(2)}</span>
              </div>
              <div>
                <span className="block text-gray-500">Time</span>
                <span>{new Date(order.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No orders yet
          </div>
        )}
      </div>
    </div>
  );
}
