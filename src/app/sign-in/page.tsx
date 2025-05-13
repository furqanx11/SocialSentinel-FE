'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export default function SignInPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });
     if (formData.username !== 'admin') {
    setStatus({ loading: false, error: 'Access denied: Only admin can login.', success: '' });
    return;
  }

    try {
      const res = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Login failed');

      const token = data.data;
      const { user_id } = jwtDecode<{ user_id: string }>(token);
    
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user_id); // Fix: use 'user_id' consistently

      setStatus({ loading: false, error: '', success: 'Login successful! Redirecting...' });
      window.dispatchEvent(new Event('storage'));
      router.push('/');

      setFormData({ username: '', password: '' });
    } catch (err: any) {
      setStatus({
        loading: false,
        error: err.message || 'An error occurred.',
        success: '',
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 relative -mt-36">
        <h2 className="text-2xl font-bold text-center">Sign in to Dashboard</h2>
        <p className="text-gray-500 text-center mb-4">
          Welcome back! Please sign in to continue
        </p>

        {status.error && <p className="text-red-500 mt-2">{status.error}</p>}
        {status.success && <p className="text-green-500 mt-2">{status.success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-yellow-100 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-yellow-100 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              👁️
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
            disabled={status.loading}
          >
            {status.loading ? 'Signing in...' : 'Continue →'}
          </button>
        </form>
      </div>
    </div>
  );
}
