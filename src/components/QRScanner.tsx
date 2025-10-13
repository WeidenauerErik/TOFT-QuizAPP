import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { MaterialCard } from './MaterialCard';
import { MaterialButton } from './MaterialButton';
import { X, QrCode } from 'lucide-react';

interface QRScannerProps {
  onScan: (quizId: string) => void;
  onClose: () => void;
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;

    const scanner = new Html5Qrcode('qr-reader');
    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const startScanning = async () => {
    if (!scannerRef.current) return;

    try {
      setError(null);
      setIsScanning(true);

      await scannerRef.current.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          onScan(decodedText);
          stopScanning();
        },
        () => {}
      );
    } catch (err) {
      setError('Kamera konnte nicht gestartet werden');
      setIsScanning(false);
      console.error('Error starting scanner:', err);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current?.isScanning) {
      try {
        await scannerRef.current.stop();
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
    setIsScanning(false);
  };

  const handleClose = async () => {
    await stopScanning();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <MaterialCard className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">QR-Code scannen</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <div
            id="qr-reader"
            className="rounded-lg overflow-hidden"
            style={{ minHeight: isScanning ? '300px' : '0' }}
          />

          {!isScanning && (
            <div className="text-center py-8">
              <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Scanne einen QR-Code, um ein Quiz zu starten
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>

        {!isScanning ? (
          <MaterialButton onClick={startScanning} fullWidth>
            Scanner starten
          </MaterialButton>
        ) : (
          <MaterialButton onClick={stopScanning} variant="outlined" fullWidth>
            Scanner stoppen
          </MaterialButton>
        )}
      </MaterialCard>
    </div>
  );
}
