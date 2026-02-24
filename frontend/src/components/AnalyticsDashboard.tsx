'use client';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Trophy, Target, AlertTriangle, HelpCircle } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

import { ResultType } from '@/app/dashboard/page';

interface ResultProps {
    result: ResultType;
}

export default function AnalyticsDashboard({ result }: ResultProps) {
    const accuracy = result.correct_count / (result.correct_count + result.wrong_count) * 100 || 0;

    const accuracyData = {
        labels: ['Correct', 'Incorrect', 'Unattempted'],
        datasets: [
            {
                data: [result.correct_count, result.wrong_count, result.unattempted],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)', // Green
                    'rgba(239, 68, 68, 0.8)', // Red
                    'rgba(156, 163, 175, 0.8)' // Gray
                ],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="w-full max-w-5xl mx-auto mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Metric Cards */}
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                    <div className="p-3 bg-indigo-50 rounded-full mb-4">
                        <Trophy className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Raw Score</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{result.raw_score.toFixed(2)}</p>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                    <div className="p-3 bg-blue-50 rounded-full mb-4">
                        <Target className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Predicted Rank</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-1">~ {result.predicted_rank}</p>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                    <div className="p-3 bg-green-50 rounded-full mb-4">
                        <AlertTriangle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Percentile</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{result.percentile.toFixed(1)} %</p>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                    <div className="p-3 bg-purple-50 rounded-full mb-4">
                        <HelpCircle className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Accuracy</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{accuracy.toFixed(1)} %</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Attempt Accuracy Breakdown</h3>
                    <div className="h-64 flex items-center justify-center">
                        <Doughnut
                            data={accuracyData}
                            options={{ maintainAspectRatio: false, cutout: '70%' }}
                        />
                    </div>
                </div>

                {/* Placeholder for future Score vs Rank Trend integration */}
                <div className="p-6 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl shadow-sm text-white flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-2">You&apos;re doing great!</h3>
                    <p className="text-indigo-200 mb-6">Your score puts you in the top {result.percentile.toFixed(1)}% of candidates based on historical trends.</p>
                    <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                        <div className="flex justify-between items-center text-sm">
                            <span>Goal: Top 100</span>
                            <span className="font-semibold text-green-400">Keep Grinding</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                            <div className="bg-green-400 h-2 rounded-full" style={{ width: `${result.percentile}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
