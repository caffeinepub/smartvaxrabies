import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function Register() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    vaccinationCentre: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const vaccinationCentres = [
    'Thiruvananthapuram Veterinary Hospital',
    'Kochi Animal Care Centre',
    'Kozhikode Pet Vaccination Centre',
    'Thrissur Animal Welfare Centre',
    'Kollam Veterinary Clinic',
    'Palakkad Pet Care Centre',
    'Malappuram Animal Hospital',
    'Kannur Veterinary Services',
    'Alappuzha Pet Clinic',
    'Kottayam Animal Care',
  ];

  const registerMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.registerUser(
        formData.name,
        formData.email,
        formData.phone,
        formData.location,
        formData.vaccinationCentre
      );
    },
    onSuccess: () => {
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        vaccinationCentre: '',
      });
      setTimeout(() => setShowSuccess(false), 5000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Register for Vaccination</h1>
          <p className="text-lg text-gray-600">
            Register your pet with a Kerala vaccination centre for professional care
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 flex-shrink-0" />
            <p className="text-emerald-800 font-medium">
              Registration successful! We'll contact you soon with vaccination details.
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="+91 1234567890"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="City, District"
              />
            </div>

            <div>
              <label htmlFor="vaccinationCentre" className="block text-sm font-semibold text-gray-700 mb-2">
                Select Vaccination Centre
              </label>
              <select
                id="vaccinationCentre"
                name="vaccinationCentre"
                value={formData.vaccinationCentre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
              >
                <option value="">Choose a centre...</option>
                {vaccinationCentres.map((centre) => (
                  <option key={centre} value={centre}>
                    {centre}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {registerMutation.isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Registering...
                </>
              ) : (
                'Complete Registration'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
