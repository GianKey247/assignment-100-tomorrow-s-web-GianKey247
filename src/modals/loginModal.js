import React, { useState } from 'react';
import "./loginModal.css";
import Portal from "../components/Portal/Portal";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
);

// Convert username to email format required by Supabase
const usernameToEmail = (username) => `${username}@gmail.com`;

function LoginModal({ isOpen, setIsOpen, setUser }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            newErrors.username = 'Username can only contain letters, numbers, and underscores';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!isLogin && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setMessage('');

        const email = usernameToEmail(formData.username);

        try {
            if (isLogin) {
                // SIGN IN - Must use email
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,  // ✅ Use synthetic email
                    password: formData.password,
                });

                if (error) {
                    setMessage(error.message.includes('Invalid') ? 'Invalid username or password' : error.message);
                    throw error;
                }

                // Fetch the profile to get the username
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('username,saved_builds',)
                    .eq('id', data.user.id)
                    .single();

                setMessage('Login successful!');
                setUser({
                    id: data.user.id,
                    UserName: profile?.username || formData.username,
                    SavedBuilds:profile.saved_builds
                });

                setTimeout(() => {
                    setIsOpen(false);
                    setFormData({ username: '', password: '', confirmPassword: '' });
                    setMessage('');
                }, 1500);

            } else {
                // SIGN UP - Pass username in metadata
                const { data, error } = await supabase.auth.signUp({
                    email: email,  // ✅ Use synthetic email
                    password: formData.password,
                    options: {
                        data: {
                            username: formData.username, // Stored in raw_user_meta_data
                        }
                    }
                });

                if (error) {
                    setMessage(error.message.includes('already') ? 'Username already exists' : error.message);
                    throw error;
                }

                // ✅ REMOVE manual profile creation - your SQL trigger handles this automatically
                // This prevents race conditions and duplicate entries

                setMessage('Account created! Please login.');
                setIsLogin(true);
                setFormData({ username: '', password: '', confirmPassword: '' });
            }
        } catch (error) {
            console.error('Auth error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Portal>
            <div className="login-page">
                <button onClick={() => setIsOpen(false)} aria-label="Close">X</button>
                <img src={`${process.env.PUBLIC_URL}/images/Manufacturers/ALLMIND.png`} alt="ALLMIND Logo"/>
                <h4>The Mercenary Support System</h4>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-Username">
                        <label className="UserName-Label">
                            <span className="UserName-Span">Username:</span>
                            <input
                                type="text"
                                name="username"
                                className="input-Username"
                                onChange={handleChange}
                                value={formData.username}
                                required
                                disabled={loading}
                                autoComplete="username"
                            />
                        </label>
                        {errors.username && <span className="error-text">{errors.username}</span>}
                    </div>

                    <div className="form-Password">
                        <label className="Password-Label">
                            <span className="Password-Span">Password:</span>
                            <input
                                type="password"
                                name="password"
                                className="input-Password"
                                onChange={handleChange}
                                value={formData.password}
                                required
                                disabled={loading}
                                autoComplete={isLogin ? "current-password" : "new-password"}
                            />
                        </label>
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    {!isLogin && (
                        <div className="form-ConfirmPassword">
                            <label className="Password-Label">
                                <span className="Password-Span">Confirm Password:</span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="input-Password"
                                    onChange={handleChange}
                                    value={formData.confirmPassword}
                                    required
                                    disabled={loading}
                                    autoComplete="new-password"
                                />
                            </label>
                            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                        </div>
                    )}

                    <button className="submit-button" type="submit" disabled={loading}>
                        {loading ? "Processing..." : isLogin ? "Login" : "Sign up"}
                    </button>

                    {message && (
                        <h5 className={message.includes("Error") || message.includes("failed") ? "error" : "success"}>
                            {message}
                        </h5>
                    )}

                    <div className="auth-switch">
                        <span>{isLogin ? "Not registered?" : "Already have an account?"}</span>
                        <button
                            type="button"
                            className="switch-button"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setErrors({});
                                setMessage('');
                            }}
                            disabled={loading}
                        >
                            {isLogin ? "Sign up" : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </Portal>
    );
}

export default LoginModal;