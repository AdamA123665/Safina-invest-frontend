import React, { useState, useEffect, useCallback } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { logAnalyticsEvent } from './analytics'; // or wherever your analytics is

const EmailPopup = ({ onSuccess, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [, setIsFocused] = useState(false);

  // Subscription status
  // 'idle', 'loading', 'success', or 'error'
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Wrap handleClose in useCallback so it doesn't trigger an ESLint dependency warning
  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (onClose) onClose();
  }, [onClose]);

  // Close popup on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleClose]);

  // Basic email validation
  const validateEmail = (emailValue) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Quick front-end check
    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }
    setIsValid(true);

    try {
      setStatus('loading');

      // Log click event
      await logAnalyticsEvent('button_click', 'subscribe_button');

      // Send to your backend
      const response = await fetch('https://safinabackend.azurewebsites.net/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if the error says "already subscribed"
        if (data.detail && data.detail.toLowerCase().includes('already subscribed')) {
          // Treat as success
          console.warn(`User is already subscribed: ${email}`);
        } else {
          // Otherwise, throw a "real" error
          throw new Error(data.detail || 'Subscription failed');
        }
      }

      // We reach here if response is OK *or* it was "already subscribed"
      await logAnalyticsEvent('successful_subscription', 'subscribe_button', `Email: ${email}`);
      setStatus('success');
      setIsSubmitted(true);

      // Close after a short delay
      setTimeout(() => {
        handleClose();
        if (onSuccess) onSuccess(); // e.g. proceed to the next step
      }, 1500);

      // Clear the input
      setEmail('');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  // If closed, render nothing
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl relative">
        {/* Icon with deep-teal gradient */}
        <div
          className="mx-auto mb-6 bg-gradient-to-br from-deep-teal to-deep-teal/80
            w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
        >
          <Mail className="h-8 w-8 text-white" />
        </div>

        {/* Title + Description */}
        <div className="text-center space-y-4 mb-8">
          <h2
            className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600
                       bg-clip-text text-transparent"
          >
            Enter Your Email to Continue
          </h2>
          <p className="text-gray-500 text-sm">
            We'll send you updates and exclusive content
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsValid(true);
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`w-full px-6 py-4 rounded-xl border
                ${
                  isValid
                    ? 'border-gray-200 focus:border-deep-teal'
                    : 'border-red-500'
                }
                outline-none transition-all duration-300 bg-white
                focus:ring-4 focus:ring-deep-teal/20`}
            />

            {/* Validation error */}
            {!isValid && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid email address
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'loading' || isSubmitted}
            className={`w-full flex items-center justify-center space-x-2
              ${
                isSubmitted
                  ? 'bg-green-500'
                  : 'bg-gradient-to-r from-deep-teal to-deep-teal/80 hover:from-deep-teal hover:to-deep-teal'
              }
              text-white py-4 rounded-xl transition-all duration-300
              hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]`}
          >
            {status === 'loading' ? (
              <span>Subscribing...</span>
            ) : isSubmitted ? (
              <span>Thanks for subscribing!</span>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          {/* Show server error if any */}
          {status === 'error' && (
            <div className="text-red-500 text-sm text-center mt-2">
              {errorMessage}
            </div>
          )}
        </form>

        {/* Footer note */}
        <p className="text-gray-400 text-xs text-center mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default EmailPopup;
