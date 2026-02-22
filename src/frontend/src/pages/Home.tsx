import { Link } from '@tanstack/react-router';
import { Syringe, Heart, ShoppingBag, Calendar, MessageCircle, Upload } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Syringe,
      title: 'Vaccination Registration',
      description: 'Register with the nearest Kerala vaccination centre for your pet',
      link: '/register',
      color: 'from-emerald-500 to-green-600',
    },
    {
      icon: Heart,
      title: 'Stray Dog Support',
      description: 'Upload images of stray dogs to help find them shelter and care',
      link: '/stray-dogs/submit',
      color: 'from-green-500 to-teal-600',
    },
    {
      icon: ShoppingBag,
      title: 'Dog Supplies Shop',
      description: 'Browse and purchase quality dog food, toys, and accessories',
      link: '/shop',
      color: 'from-teal-500 to-cyan-600',
    },
    {
      icon: Calendar,
      title: 'Charity Events',
      description: 'Join concerts and events supporting animal welfare',
      link: '/events',
      color: 'from-emerald-600 to-green-700',
    },
    {
      icon: MessageCircle,
      title: 'Community Chat',
      description: 'Connect with other pet owners and share experiences',
      link: '/community',
      color: 'from-green-600 to-emerald-700',
    },
    {
      icon: Upload,
      title: 'View Stray Dogs',
      description: 'Browse submitted stray dog images and help find them homes',
      link: '/stray-dogs/gallery',
      color: 'from-teal-600 to-green-700',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600">
        <div className="absolute inset-0 bg-[url('/assets/generated/hero-dog.dim_1200x600.png')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to SmartVaxRabies
            </h1>
            <p className="text-xl md:text-2xl text-emerald-50 mb-8">
              Kerala's comprehensive platform for pet vaccination, stray dog welfare, and community support
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Register Now
              </Link>
              <Link
                to="/stray-dogs/submit"
                className="px-8 py-4 bg-emerald-800 text-white rounded-xl font-semibold hover:bg-emerald-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Help Stray Dogs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to care for your pets and support animal welfare in Kerala
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.link}
                to={feature.link}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 border border-emerald-100"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Vaccination Section */}
      <section className="bg-gradient-to-r from-emerald-100 to-green-100 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Protect Your Pets with Vaccination
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Register with Kerala's trusted vaccination centres to ensure your pets receive timely and
                professional care. Our network of centres across Kerala provides comprehensive vaccination services.
              </p>
              <Link
                to="/register"
                className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg"
              >
                Register Your Pet
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/assets/generated/vaccination-dog.dim_800x600.png"
                alt="Pet Vaccination"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stray Care Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/assets/generated/stray-care.dim_600x400.png"
              alt="Stray Dog Care"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Help Stray Dogs Find Homes</h2>
            <p className="text-lg text-gray-700 mb-6">
              Upload photos of stray dogs you encounter to help connect them with shelters and caring families. Every
              submission makes a difference in giving these animals a chance at a better life.
            </p>
            <Link
              to="/stray-dogs/submit"
              className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all shadow-lg"
            >
              Submit Stray Dog Photo
            </Link>
          </div>
        </div>
      </section>

      {/* Kerala Branding Section */}
      <section className="bg-gradient-to-r from-green-100 to-emerald-100 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Proudly Serving Kerala</h2>
              <p className="text-lg text-gray-700 mb-6">
                SmartVaxRabies is dedicated to improving animal welfare across Kerala. Our platform connects pet
                owners, animal lovers, and vaccination centres throughout the state to create a safer, healthier
                environment for all animals.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white rounded-xl px-6 py-3 shadow-md">
                  <p className="text-2xl font-bold text-emerald-600">Kerala-wide</p>
                  <p className="text-sm text-gray-600">Coverage</p>
                </div>
                <div className="bg-white rounded-xl px-6 py-3 shadow-md">
                  <p className="text-2xl font-bold text-green-600">Trusted</p>
                  <p className="text-sm text-gray-600">Network</p>
                </div>
                <div className="bg-white rounded-xl px-6 py-3 shadow-md">
                  <p className="text-2xl font-bold text-teal-600">Community</p>
                  <p className="text-sm text-gray-600">Driven</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/assets/generated/kerala-dog.dim_700x500.png"
                alt="Kerala Dog"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
