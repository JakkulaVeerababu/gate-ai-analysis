import Link from 'next/link';
import Footer from '@/components/Footer';
import { ChevronRight, UploadCloud, BarChart2, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              GateScope
            </span>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Predict your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">GATE Rank</span><br /> in seconds.
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Upload your official GOAPS response sheet and instantly get your raw score, detailed accuracy analytics, and data-driven All India Rank prediction.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/dashboard" className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-transform hover:scale-105 shadow-lg w-full sm:w-auto">
              Analyze My Response
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
                <UploadCloud className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Parsing</h3>
              <p className="text-gray-500">
                Securely upload your .mht response file. Our deterministic parser extracts your selected options and questions without storing sensitive data.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
                <BarChart2 className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Deep Analytics</h3>
              <p className="text-gray-500">
                Visualize your performance. We calculate exact raw scores factoring in negative marking rules and provide an accuracy breakdown.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ML Rank Predictor</h3>
              <p className="text-gray-500">
                Leverage historical GATE trends. Our machine learning model estimates your All India Rank and percentile based on past statistics.
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
