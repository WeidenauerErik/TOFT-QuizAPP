import { useState, FormEvent } from 'react';
import { MaterialCard } from '../components/MaterialCard';
import { MaterialInput } from '../components/MaterialInput';
import { MaterialButton } from '../components/MaterialButton';
import { User } from 'lucide-react';

interface NameSetupProps {
  onNameSet: (name: string) => void;
}

export function NameSetup({ onNameSet }: NameSetupProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Bitte geben Sie einen Namen ein');
      return;
    }

    if (name.trim().length < 2) {
      setError('Der Name muss mindestens 2 Zeichen lang sein');
      return;
    }

    onNameSet(name.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <MaterialCard className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Willkommen!</h1>
          <p className="text-gray-600">Bitte geben Sie Ihren Namen ein, um zu beginnen</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <MaterialInput
            label="Ihr Name"
            placeholder="Max Mustermann"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            error={error}
            autoFocus
          />

          <MaterialButton type="submit" fullWidth>
            Los geht's
          </MaterialButton>
        </form>
      </MaterialCard>
    </div>
  );
}
