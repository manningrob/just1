import React from 'react';
import { Toaster } from 'react-hot-toast';
import { DesignPrompt } from './components/DesignPrompt';
import { ProcessingStep } from './components/ProcessingStep';
import { ProductLink } from './components/ProductLink';
import { useDesignForm } from './hooks/useDesignForm';
import { TshirtDisplay } from './components/TshirtDisplay';
import { Header } from './components/Header';
import { SideMenu } from './components/SideMenu';

export default function App() {
  const { 
    step, 
    error,
    shopifyUrl, 
    handleDesignSubmit, 
    handleUserInfoSubmit,
    handleRetry
  } = useDesignForm();

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      <Header />
      <SideMenu />
      <TshirtDisplay />

      <main className="relative flex items-center justify-center px-4 h-[calc(100%-6rem)] mt-24">
        <div className="max-w-xl mx-auto text-center z-10">
          <h2 className="text-5xl font-bold mb-6 text-gray-900">
            Dream it. Wear it.
          </h2>
          <p className="text-xl text-gray-800 mb-8">
            Experience the future of fashion—where your creativity is exclusively yours. No copies. No compromises. Just One. 
          </p>

          {step === 'pending' && <DesignPrompt onSubmit={handleDesignSubmit} />}
          {step === 'processing' && (
            <ProcessingStep 
              onSubmit={handleUserInfoSubmit} 
              error={error}
              onRetry={handleRetry}
            />
          )}
          {step === 'product-ready' && <ProductLink url={shopifyUrl} onRetry={handleRetry} />}
        </div>
      </main>

    </div>
  );
}