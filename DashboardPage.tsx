import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { ResponseDisplay } from './components/ResponseDisplay';
import { PlaneIcon } from './components/icons/PlaneIcon';
import { getTravelComparison } from './services/geminiService';
import type { ComparisonResult } from './types';

export const DashboardPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const comparisonResult = await getTravelComparison(query);
      setResult(comparisonResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-blue-200 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-2">
            <PlaneIcon className="w-12 h-12 text-indigo-500" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                BookSmart
            </h1>
            </div>
            <p className="text-lg text-gray-600">
            Your AI-powered travel comparison assistant.
            </p>
        </header>

        <main className="space-y-8">
          <InputForm
            query={query}
            setQuery={setQuery}
            onCompare={handleCompare}
            isLoading={isLoading}
          />
          <ResponseDisplay
            result={result}
            isLoading={isLoading}
            error={error}
          />
        </main>
        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Powered by Gemini. All prices are estimates.</p>
        </footer>
      </div>
    </div>
  );
};
