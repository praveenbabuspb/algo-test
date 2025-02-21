import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { Order } from '../types/trading';

interface OrderHistoryProps {
  orders: Order[];
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  const statusIconMap: Record<string, JSX.Element> = {
    'FILLED': <CheckCircle className="w-5 h-5 text-green-500" />,
    'CANCELLED': <XCircle className="w-5 h-5 text-red-500" />,
    'PENDING': <Clock className="w-5 h-5 text-yellow-500" />,
  };

  const getStatusIcon = (status: Order['status']) => statusIconMap[status] || <AlertCircle className="w-5 h-5 text-gray-500" />;

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 text-center py-4 text-gray-500">
        No orders yet
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Order History</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {getStatusIcon(order.status)}
                <span className="ml-3 text-md font-medium">{order.instrument}</span>
              </div>
              <span className={`text-sm font-semibold ${order.type === 'BUY' ? 'text-green-600' : 'text-red-600'}`}>
                {order.type}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-4 text-sm text-gray-600">
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
      </div>
    </div>
  );
}
