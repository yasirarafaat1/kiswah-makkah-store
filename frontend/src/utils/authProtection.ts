import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook to protect routes that require authentication
 * Redirects to login page if user is not authenticated
 * @param redirectTo Path to redirect to if not authenticated (default: '/log')
 */
export const useAuthProtection = (redirectTo: string = '/log') => {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate(redirectTo);
        }
    }, [isAuthenticated, isLoading, redirectTo, navigate]);

    return { isAuthenticated, isLoading };
};