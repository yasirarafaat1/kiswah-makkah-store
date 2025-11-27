import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import AuthGuard from './components/Admin/AuthGuard';
import AdminPageHeader from './components/Admin/AdminPageHeader';

export default function AdminPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine active tab based on current route
    const getActiveTab = () => {
        if (location.pathname === '/admin/products') {
            return 'products';
        } else if (location.pathname === '/admin/orders') {
            return 'orders';
        } else {
            return 'upload'; // default to upload for /admin
        }
    };

    const activeTab = getActiveTab();

    const handleTabChange = (tab: 'upload' | 'products' | 'orders') => {
        switch (tab) {
            case 'upload':
                navigate('/admin');
                break;
            case 'products':
                navigate('/admin/products');
                break;
            case 'orders':
                navigate('/admin/orders');
                break;
        }
    };

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <AdminPageHeader />
                    <div className="flex gap-2 border-b border-gray-200">
                        <button
                            onClick={() => handleTabChange('upload')}
                            className={`px-6 py-3 font-medium transition-colors ${activeTab === 'upload'
                                    ? 'text-amber-700 border-b-2 border-amber-700'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                Upload Product
                            </div>
                        </button>
                        <button
                            onClick={() => handleTabChange('products')}
                            className={`px-6 py-3 font-medium transition-colors ${activeTab === 'products'
                                    ? 'text-amber-700 border-b-2 border-amber-700'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                Products List
                            </div>
                        </button>
                        <button
                            onClick={() => handleTabChange('orders')}
                            className={`px-6 py-3 font-medium transition-colors ${activeTab === 'orders'
                                    ? 'text-amber-700 border-b-2 border-amber-700'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Orders
                            </div>
                        </button>
                    </div>

                    <div className="mt-6">
                        {/* Render nested routes */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}