import { GraduationCap, Heart, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src="/assets/generated/about-hero.dim_1200x400.png"
          alt="About SmartVaxRabies"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-green-900/80 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About SmartVaxRabies</h1>
            <p className="text-xl md:text-2xl text-emerald-100">
              Protecting Kerala's Communities, One Vaccination at a Time
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              SmartVaxRabies is dedicated to creating a safer Kerala by providing accessible vaccination
              services, supporting stray dog welfare, and building a compassionate community that cares
              for all animals. We believe that through technology and community engagement, we can
              prevent rabies and ensure the well-being of both pets and stray animals across Kerala.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-xl shadow-md border border-emerald-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Compassionate Care</h3>
              <p className="text-gray-600">
                Providing loving care and support for all animals in our community
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md border border-emerald-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Driven</h3>
              <p className="text-gray-600">
                Building a network of caring individuals across Kerala
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md border border-emerald-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <GraduationCap className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Education First</h3>
              <p className="text-gray-600">
                Raising awareness about rabies prevention and animal welfare
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creators Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-green-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Creators</h2>
              <p className="text-lg text-gray-700">
                SmartVaxRabies was created by passionate students from Excelsior English School
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Creator 1 */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-emerald-200 hover:border-emerald-400 transition-all">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full mb-4">
                    <span className="text-3xl font-bold text-white">SS</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Shreya Salu</h3>
                  <div className="flex items-center justify-center gap-2 text-emerald-700 mb-4">
                    <GraduationCap className="h-5 w-5" />
                    <span className="font-medium">Excelsior English School</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Passionate about animal welfare and technology, Shreya co-created SmartVaxRabies
                    to make a positive impact on Kerala's communities and protect animals from rabies.
                  </p>
                </div>
              </div>

              {/* Creator 2 */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-emerald-200 hover:border-emerald-400 transition-all">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full mb-4">
                    <span className="text-3xl font-bold text-white">BK</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Bella Ann Kurian</h3>
                  <div className="flex items-center justify-center gap-2 text-emerald-700 mb-4">
                    <GraduationCap className="h-5 w-5" />
                    <span className="font-medium">Excelsior English School</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Dedicated to creating solutions for social good, Bella co-created SmartVaxRabies
                    to help communities across Kerala care for animals and prevent rabies.
                  </p>
                </div>
              </div>
            </div>

            {/* School Recognition */}
            <div className="mt-12 text-center p-8 bg-white rounded-xl shadow-md border border-emerald-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Excelsior English School</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We are proud students of Excelsior English School, where we learned the values of
                compassion, innovation, and community service. This project represents our commitment
                to using technology to solve real-world problems and make Kerala a safer place for
                both people and animals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
          <p className="text-lg text-gray-700 mb-8">
            Together, we can create a safer Kerala for all. Register your pet, report stray dogs,
            participate in community events, and help us build a compassionate network of animal lovers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/register"
              className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-md"
            >
              Register Now
            </a>
            <a
              href="/community"
              className="px-8 py-3 bg-white text-emerald-600 border-2 border-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors shadow-md"
            >
              Join Community
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
