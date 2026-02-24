'use client';
import { useState } from 'react';
import Uploader from '@/components/Uploader';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import Footer from '@/components/Footer';

export interface ResultType {
    raw_score: number;
    predicted_rank: number;
    percentile: number;
    correct_count: number;
    wrong_count: number;
    unattempted: number;
}

export default function Dashboard() {
    const [result, setResult] = useState<ResultType | null>(null);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                            GateScope
                        </span>
                        <span className="text-xs font-semibold px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">PRO</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-start p-6 md:p-12 mb-12">
                <div className="max-w-4xl w-full text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        Analyze Your GATE Performance
                    </h1>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                        Upload your official GOAPS response sheet (.mht file) to instantly calculate your raw score, analyze your accuracy, and predict your All India Rank.
                    </p>
                </div>

                {!result ? (
                    <Uploader onUploadSuccess={(data) => setResult(data)} />
                ) : (
                    <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="w-full max-w-5xl flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Your Results</h2>
                            <button
                                onClick={() => setResult(null)}
                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                Analyze Another File
                            </button>
                        </div>
                        <AnalyticsDashboard result={result} />
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
