import { useState, useEffect } from 'react';
import { Mail, ArrowRight, CheckCircle, RefreshCw, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { login, verifyCode, isAuthenticated, user } = useAuth();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [resendTimer, setResendTimer] = useState(0);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const navigate = useNavigate();

    // Redirect authenticated users to home page
    useEffect(() => {
        if (isAuthenticated && user) {
            navigate('/');
        }
    }, [isAuthenticated, user, navigate]);

    // Timer effect for resend button
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer(prev => {
                    if (prev <= 1) {
                        setIsResendDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [resendTimer]);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email.trim()) {
            setError('Email is required');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        try {
            await login(email);
            setSuccess('OTP sent! Please check your email.');
            setStep('otp');
            setResendTimer(60);
            setIsResendDisabled(true);
        } catch (err: unknown) {
            const error = err as { message?: string };
            setError(error.message || 'Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!otp.trim()) {
            setError('OTP is required');
            return;
        }

        if (otp.length !== 6) {
            setError('OTP must be 6 digits');
            return;
        }

        setIsLoading(true);
        try {
            await verifyCode(email, otp);
            setSuccess('Login successful! Redirecting...');
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (err: unknown) {
            const error = err as { message?: string };
            setError(error.message || 'Invalid OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToEmail = () => {
        setStep('email');
        setOtp('');
        setError('');
        setSuccess('');
        setResendTimer(0);
        setIsResendDisabled(false);
    };

    const handleResendOtp = async () => {
        if (isResendDisabled) return;

        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            await login(email);
            setSuccess('OTP resent! Please check your email.');
            setResendTimer(60);
            setIsResendDisabled(true);
        } catch (err: unknown) {
            const error = err as { message?: string };
            setError(error.message || 'Failed to resend OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Format time for display
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Don't show the login page if user is already authenticated
    if (isAuthenticated) {
        return <div>Redirecting...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {step === 'email' ? 'Login / Register' : 'Enter OTP'}
                        </h1>
                        <p className="text-gray-600">
                            {step === 'email'
                                ? 'Enter your email to get started'
                                : 'We sent a 6-digit code to your email'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2">
                            <CheckCircle size={20} className="text-emerald-600" />
                            <p className="text-emerald-600 text-sm">{success}</p>
                        </div>
                    )}

                    {step === 'email' ? (
                        <form onSubmit={handleEmailSubmit} className="space-y-6">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Mail size={16} />
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none"
                                    placeholder="your.email@example.com"
                                    disabled={isLoading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-amber-700 hover:bg-amber-800 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg disabled:transform-none"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Sending OTP...
                                    </>
                                ) : (
                                    <>
                                        Send OTP
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleOtpSubmit} className="space-y-6">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Key size={16} />
                                    6-Digit OTP *
                                </label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none text-center text-2xl tracking-widest"
                                    placeholder="••••••"
                                    disabled={isLoading}
                                    maxLength={6}
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    Enter the 6-digit code sent to <strong>{email}</strong>
                                </p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={isLoading || otp.length !== 6}
                                    className="w-full bg-amber-700 hover:bg-amber-800 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Verifying...
                                        </>
                                    ) : (
                                        'Verify OTP'
                                    )}
                                </button>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        disabled={isLoading || isResendDisabled}
                                        className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <RefreshCw size={18} />
                                        Resend
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleBackToEmail}
                                        disabled={isLoading}
                                        className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                                    >
                                        Change Email
                                    </button>
                                </div>

                                {/* Timer display when resend is disabled */}
                                {isResendDisabled && (
                                    <div className="text-center text-sm text-gray-500">
                                        Resend available in {formatTime(resendTimer)}
                                    </div>
                                )}
                            </div>
                        </form>
                    )}

                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 w-full text-gray-600 hover:text-amber-700 transition-colors text-sm"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}