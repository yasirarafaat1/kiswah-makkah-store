import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import BestSellers from './components/BestSellers';
import NewArrivals from './components/NewArrivals';
import ProductGrid from './components/Product/ProductGrid';
import Features from './components/Features';
import Footer from './components/Footer/Footer';
import Login from './pages/Login';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import MyOrdersPage from './pages/MyOrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/Category/CategoryPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ReturnsPage from './pages/ReturnsPage';
import SettingsPage from './pages/SettingsPage';
import ShippingInfoPage from './pages/ShippingInfoPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import AuthCallback from './pages/AuthCallback';
import AdminPage from './Admin/AdminPage';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import ProductUploadForm from './Admin/components/Product/ProductUploadForm';
import ProductsList from './Admin/components/Product/ProductsList';
import OrdersList from './Admin/components/Order/OrdersList';

// Wrapper components to provide props to pages that require them
const OrderDetailsWrapper = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  if (!orderId) {
    return <div>Order not found</div>;
  }

  return <OrderDetailsPage orderId={orderId} onBack={() => navigate(-1)} />;
};

const ProductDetailsWrapper = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  if (!productId) {
    return <div>Product not found</div>;
  }

  const productIdNum = parseInt(productId, 10);
  if (isNaN(productIdNum)) {
    return <div>Invalid product ID</div>;
  }

  return <ProductDetailsPage productId={productIdNum} onBack={() => navigate(-1)} />;
};

const ContactPageWrapper = () => {
  const navigate = useNavigate();
  return <ContactPage onBack={() => navigate(-1)} />;
};

const FAQPageWrapper = () => {
  const navigate = useNavigate();
  return <FAQPage onBack={() => navigate(-1)} />;
};

const PrivacyPolicyPageWrapper = () => {
  const navigate = useNavigate();
  return <PrivacyPolicyPage onBack={() => navigate(-1)} />;
};

const ReturnsPageWrapper = () => {
  const navigate = useNavigate();
  return <ReturnsPage onBack={() => navigate(-1)} />;
};

const SettingsPageWrapper = () => {
  const navigate = useNavigate();
  return <SettingsPage onBack={() => navigate(-1)} />;
};

const ShippingInfoPageWrapper = () => {
  const navigate = useNavigate();
  return <ShippingInfoPage onBack={() => navigate(-1)} />;
};

const TermsOfServicePageWrapper = () => {
  const navigate = useNavigate();
  return <TermsOfServicePage onBack={() => navigate(-1)} />;
};

// Component to handle admin auth and auto-logout
const AdminAuthHandler = () => {
  const { isAdminLoggedIn, logout } = useAdminAuth();
  const location = useLocation();

  // Auto-logout when leaving admin routes
  if (isAdminLoggedIn && !location.pathname.startsWith('/admin')) {
    logout();
  }

  return null;
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <AdminAuthProvider>
        <AdminAuthHandler />
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/admin/*" element={null} />
            <Route path="*" element={<Navbar onSearchChange={setSearchQuery} />} />
          </Routes>

          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <BestSellers />
                <NewArrivals />
                <ProductGrid searchQuery={searchQuery} />
                <Features />
              </>
            } />
            <Route path="/log" element={<Login />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<MyOrdersPage />} />
            <Route path="/order/:orderId" element={<OrderDetailsWrapper />} />
            <Route path="/product/:productId" element={<ProductDetailsWrapper />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/contact" element={<ContactPageWrapper />} />
            <Route path="/faq" element={<FAQPageWrapper />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPageWrapper />} />
            <Route path="/returns" element={<ReturnsPageWrapper />} />
            <Route path="/settings" element={<SettingsPageWrapper />} />
            <Route path="/shipping-info" element={<ShippingInfoPageWrapper />} />
            <Route path="/terms-of-service" element={<TermsOfServicePageWrapper />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminPage />}>
              <Route index element={<ProductUploadForm />} />
              <Route path="products" element={<ProductsList />} />
              <Route path="orders" element={<OrdersList />} />
            </Route>
          </Routes>

          <Routes>
            <Route path="/admin/*" element={null} />
            <Route path="*" element={<Footer />} />
          </Routes>
        </div>
      </AdminAuthProvider>
    </Router>
  );
}