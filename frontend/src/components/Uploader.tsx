'use client';
import { useState, useCallback } from 'react';
import api from '@/services/api';
import { UploadCloud, FileText, AlertCircle } from 'lucide-react';
import { ResultType } from '@/app/dashboard/page';

export default function Uploader({ onUploadSuccess }: { onUploadSuccess: (data: ResultType) => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileSelection(e.dataTransfer.files[0]);
        }
    }, []);

    const handleFileSelection = (selectedFile: File) => {
        setError('');
        if (!selectedFile.name.endsWith('.mht')) {
            setError('Please upload a valid .mht file format');
            return;
        }
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/upload/responses', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            onUploadSuccess(response.data);
        } catch (err: unknown) {
            const errorObj = err as { response?: { data?: { detail?: string } } };
            setError(errorObj.response?.data?.detail || 'Error uploading file');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl p-6 mx-auto bg-white rounded-xl shadow-md border border-gray-100">
            <div
                className={`relative flex flex-col items-center justify-center p-12 mt-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:bg-gray-50'
                    }`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => document.getElementById('fileUpload')?.click()}
            >
                <UploadCloud className={`w-12 h-12 mb-4 ${isDragging ? 'text-indigo-500' : 'text-gray-400'}`} />
                <p className="mb-2 text-sm font-semibold text-gray-700">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">Only .mht GOAPS response files are supported</p>

                <input
                    id="fileUpload"
                    type="file"
                    accept=".mht"
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            handleFileSelection(e.target.files[0]);
                        }
                    }}
                />
            </div>

            {file && (
                <div className="flex items-center justify-between p-4 mt-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <FileText className="w-6 h-6 text-indigo-500" />
                        <span className="text-sm font-medium text-gray-700">{file.name}</span>
                    </div>
                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Analyze Now'}
                    </button>
                </div>
            )}

            {error && (
                <div className="flex items-center mt-4 text-sm text-red-600 p-3 bg-red-50 rounded-lg">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {error}
                </div>
            )}
        </div>
    );
}
