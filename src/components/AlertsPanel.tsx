import React from 'react';
import { Bell, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import type { Alert } from '../types/trading';

interface AlertsPanelProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

export function AlertsPanel({ alerts, onDismiss }: AlertsPanelProps) {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 space-y-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg shadow-lg flex items-start ${
            alert.type === 'success' ? 'bg-green-50' :
            alert.type === 'warning' ? 'bg-yellow-50' :
            alert.type === 'error' ? 'bg-red-50' :
            'bg-blue-50'
          }`}
        >
          <div className="flex-shrink-0 mr-3">
            {getAlertIcon(alert.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${
              alert.type === 'success' ? 'text-green-800' :
              alert.type === 'warning' ? 'text-yellow-800' :
              alert.type === 'error' ? 'text-red-800' :
              'text-blue-800'
            }`}>
              {alert.message}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {new Date(alert.timestamp).toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={() => onDismiss(alert.id)}
            className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}