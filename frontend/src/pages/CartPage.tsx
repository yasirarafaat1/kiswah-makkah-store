import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface CartPageProps {
    onBack?: () => void;
}

export default function CartPage({ onBack }: CartPageProps) {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        getTotalItems,
    } = useCart();
    const [productStocks, setProductStocks] = useState<Record<number, number>>({});
    const [loadingStocks, setLoadingStocks] = useState(false);
    const navigate = useNavigate();

    const total = getTotalPrice();

    // Fetch stock information for cart items
    useEffect(() => {
        const fetchStocks = async () => {
            setLoadingStocks(true);
            const stocks: Record<number, number> = {};

            for (const item of cartItems) {
                try {
                    const response = await productAPI.getProductById(item.id);
                    if (response.data.status === 200 && response.data.data && response.data.data.length > 0) {
                        const product = response.data.data[0];
                        stocks[item.id] = product.quantity || 0;
                    } else {
                        stocks[item.id] = 0;
                    }
                } catch (error) {
                    console.error(`Failed to fetch stock for product ${item.id}:`, error);
                    stocks[item.id] = item.stock || 0;
                }
            }

            setProductStocks(stocks);

            // Auto-adjust quantities and remove out-of-stock items
            for (const item of cartItems) {
                const availableStock = stocks[item.id] ?? item.stock ?? 0;
                if (availableStock < 1) {
                    // Remove out-of-stock items
                    removeFromCart(item.id);
                } else if (item.quantity > availableStock) {
                    // Adjust quantity to available stock
                    updateQuantity(item.id, availableStock);
                }
            }

            setLoadingStocks(false);
        };

        if (cartItems.length > 0) {
            fetchStocks();
        }
    }, [cartItems, removeFromCart, updateQuantity]);

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate('/');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-gray-600 hover:text-amber-700 transition-colors mb-8"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-medium">Continue Shopping</span>
                    </button>

                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <ShoppingBag size={80} className="mx-auto text-gray-300 mb-6" />
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                            <p className="text-gray-600 mb-8">
                                Looks like you haven't added anything to your cart yet.
                            </p>
                            <button
                                onClick={handleBack}
                                className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Start Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-700 transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    <span className="font-medium">Continue Shopping</span>
                </button>

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                    <span className="text-gray-600">
                        {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                    </span>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row gap-6"
                            >
                                <div className="flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            {item.name}
                                        </h3>
                                        <p className="text-2xl font-bold text-amber-700 mb-2">
                                            ${item.price}
                                        </p>
                                        {productStocks[item.id] !== undefined && (
                                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${productStocks[item.id] >= 1
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {productStocks[item.id] >= 1
                                                    ? `In Stock`
                                                    : 'Out of Stock'
                                                }
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center border border-gray-300 rounded-lg">
                                                <button
                                                    onClick={() => {
                                                        if (item.quantity > 1) {
                                                            updateQuantity(item.id, item.quantity - 1);
                                                        }
                                                    }}
                                                    disabled={item.quantity <= 1}
                                                    className="px-4 py-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="px-6 py-2 font-semibold min-w-[3rem] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        const availableStock = productStocks[item.id] ?? item.stock ?? 0;
                                                        if (availableStock >= 1 && item.quantity < availableStock) {
                                                            updateQuantity(item.id, item.quantity + 1);
                                                        }
                                                    }}
                                                    disabled={
                                                        loadingStocks ||
                                                        !productStocks[item.id] ||
                                                        productStocks[item.id] < 1 ||
                                                        item.quantity >= (productStocks[item.id] ?? item.stock ?? 0)
                                                    }
                                                    className="px-4 py-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            {(productStocks[item.id] !== undefined && productStocks[item.id] < 1) && (
                                                <p className="text-red-600 text-xs">Out of stock</p>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-semibold">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span className="font-semibold">$0.00</span>
                                </div>
                                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                            >
                                Proceed to Checkout
                                <Check size={20} />
                            </button>

                            <p className="text-gray-500 text-xs text-center mt-4">
                                or continue shopping
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}