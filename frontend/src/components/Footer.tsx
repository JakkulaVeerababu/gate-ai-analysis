import Link from 'next/link';
import { Github, Instagram, Linkedin, Code } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                    <div className="flex flex-col items-center md:items-start">
                        <p className="text-base text-gray-500 font-medium tracking-wide">
                            Built by <span className="text-indigo-600 font-semibold">veerababu jakkula</span>
                        </p>
                        <p className="mt-1 text-sm text-gray-400">
                            GateScope - GATE Response Analyzer & Rank Predictor
                        </p>
                    </div>

                    <div className="flex space-x-6">
                        <Link href="https://www.instagram.com/thflashz?igsh=MTUxeTF6czd5bmE1Mw==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
                            <span className="sr-only">Instagram</span>
                            <Instagram className="h-6 w-6" />
                        </Link>

                        <Link href="https://leetcode.com/u/veerababu9z/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors">
                            <span className="sr-only">LeetCode 1</span>
                            <Code className="h-6 w-6" />
                        </Link>

                        <Link href="https://leetcode.com/u/veerababu_jakkula/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-600 transition-colors">
                            <span className="sr-only">LeetCode 2</span>
                            <Code className="h-6 w-6" />
                        </Link>

                        <Link href="https://codeforces.com/profile/jakkulaveerababu?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPNTY3MDY3MzQzMzUyNDI3AAGn8CQREmyamOsIbQVOYXinvbuIQ9dR-yhwHlMiqBH81EySflX33i45mytZlDE_aem_ikJ7D5-zYd3VCxzh4Xn3Xw" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                            <span className="sr-only">Codeforces</span>
                            <Github className="h-6 w-6" /> {/* Using Github icon for Codeforces placeholder */}
                        </Link>

                        <Link href="https://www.linkedin.com/in/veerababu9z?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors">
                            <span className="sr-only">LinkedIn</span>
                            <Linkedin className="h-6 w-6" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
