import React from 'react';
import { Check } from 'lucide-react';
import { PRICING_TIERS } from '../constants';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Simple, transparent pricing</h2>
          <p className="text-slate-400 text-lg">Start for free, scale indefinitely.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_TIERS.map((tier, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-3xl border transition-all duration-300 flex flex-col ${
                tier.highlighted
                  ? 'bg-gradient-to-b from-white/10 to-transparent border-cyan-500/50 shadow-2xl shadow-cyan-900/20'
                  : 'bg-dark/40 border-white/10 hover:border-white/20'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                {tier.price !== 'Custom' && <span className="text-slate-500 ml-2">/month</span>}
              </div>
              <p className="text-slate-400 mb-8 text-sm">{tier.description}</p>

              <ul className="flex-1 space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                    <Check className="w-5 h-5 text-cyan-400 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  tier.highlighted
                    ? 'bg-white text-dark hover:bg-slate-100'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                Choose {tier.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;