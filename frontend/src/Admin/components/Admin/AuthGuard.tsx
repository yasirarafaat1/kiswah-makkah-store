import AdminLogin from './AdminLogin';
import { useAdminAuth } from '../../../context/AdminAuthContext';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAdminLoggedIn } = useAdminAuth();

    // If admin is not logged in, show login page
    if (!isAdminLoggedIn) {
        return <AdminLogin />;
    }

    // If admin is logged in, show admin panel
    return <>{children}</>;
}