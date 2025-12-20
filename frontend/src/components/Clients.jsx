import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendURL } from '../main';

const HappyClients = () => {
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendURL}/getclients`);
        if (res.data.success && Array.isArray(res.data.data)) {
          setClients(res.data.data);
        } else {
          setClients([]);
        }
      } catch (error) {
        console.error("Failed to fetch clients:", error);
        setClients([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading client testimonials...</p>
      </div>
    );
  }

  return (
    <section id='clients' className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Heading & Description */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Happy Clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Don’t just take our word for it—here’s what our clients say about working with us. 
            Their trust fuels our passion for excellence.
          </p>
        </div>

        {/* Testimonials Carousel */}
        {clients && clients.length > 0 ? (
          <div className="flex gap-6 overflow-x-auto pb-6 px-2 scrollbar-hide snap-mandatory snap-x">
            {clients.map((client, i) => (
              <div
                key={i}
                className="min-w-[300px] max-w-[340px] bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col snap-start transition-all duration-300 hover:shadow-lg"
              >
                {/* Client Avatar or Placeholder */}
                <div className="flex items-center mb-5">
                  {client.image ? (
                    <img
                      src={client.image}
                      alt={client.name || "Client"}
                      className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-sm"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/60x60?text=👤";
                      }}
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold">
                      {client.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                  )}
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900">{client.name || "Anonymous"}</h4>
                    <p className="text-sm text-gray-500">{client.designation || "Client"}</p>
                  </div>
                </div>

                {/* Testimonial */}
                <p className="text-gray-700 italic text-sm leading-relaxed flex-grow">
                  “{client.description || "No testimonial provided."}”
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">💬</div>
            <p className="text-gray-600">No client testimonials available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HappyClients;