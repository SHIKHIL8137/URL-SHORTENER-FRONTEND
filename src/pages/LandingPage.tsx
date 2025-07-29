import { BarChart3, Link, Menu, User, X } from "lucide-react";
import { useState } from "react";
import Button from "../components/Button";
import type { LandingPageProps } from "../interfaces/data.interfaces";

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white">

      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                <Link className="w-6 h-6 text-sky-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                URL Shortener
              </h1>
            </div>


            <div className="hidden md:block">
              <Button onClick={onGetStarted}>Get Started</Button>
            </div>


            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>


          {menuOpen && (
            <div className="md:hidden pb-4">
              <Button onClick={onGetStarted} className="w-full">
                Get Started
              </Button>
            </div>
          )}
        </div>
      </header>


      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Link className="w-12 h-12 text-sky-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Shorten URLs with
              <span className="text-sky-600 block">Style & Analytics</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform long, complex URLs into short, shareable links. Track clicks, 
              manage your links, and get detailed analytics — all in one place.
            </p>
            <Button onClick={onGetStarted} className="text-lg px-8 py-4">
              Start Shortening URLs
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to manage your links
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to help you share and track your URLs effectively
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Link className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Instant Shortening
              </h3>
              <p className="text-gray-600">
                Convert long URLs into short, memorable links in seconds.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Detailed Analytics
              </h3>
              <p className="text-gray-600">
                Track clicks and performance with real-time analytics.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                Your links are protected and accessible only by you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-sky-600 to-sky-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start shortening?
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            Join thousands of users who trust us with their links every day.
          </p>
          <Button
            onClick={onGetStarted}
            variant="secondary"
            className="bg-white text-sky-600 hover:bg-gray-50 text-lg px-8 py-4"
          >
            Get Started for Free
          </Button>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center">
              <Link className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">URL Shortener</span>
          </div>
          <p className="text-gray-400">
            © 2025 URL Shortener. Built with React and Nest.js.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
