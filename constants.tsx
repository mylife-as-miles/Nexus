import React from 'react';
import { Cpu, Globe, Shield, Zap, BarChart3, Layers } from 'lucide-react';
import { Feature, PricingTier, Testimonial } from './types';

export const NAV_LINKS = [
  { name: 'Product', href: '#features' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Company', href: '#footer' },
];

export const FEATURES: Feature[] = [
  {
    title: 'Global Edge Network',
    description: 'Deploy your applications to 300+ edge locations worldwide with a single click.',
    icon: <Globe className="w-6 h-6 text-cyan-400" />,
  },
  {
    title: 'Neural Shield Security',
    description: 'AI-driven threat detection that adapts to new attack vectors in real-time.',
    icon: <Shield className="w-6 h-6 text-purple-400" />,
  },
  {
    title: 'Quantum Processing',
    description: 'Leverage our proprietary quantum-emulation layer for complex calculations.',
    icon: <Cpu className="w-6 h-6 text-blue-400" />,
  },
  {
    title: 'Instant Scaling',
    description: 'Horizontal auto-scaling that responds to traffic spikes in milliseconds.',
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
  },
  {
    title: 'Deep Analytics',
    description: 'Granular observability into every request, function, and database query.',
    icon: <BarChart3 className="w-6 h-6 text-green-400" />,
  },
  {
    title: 'Unified API',
    description: 'One SDK to rule them all. Manage infrastructure as code with TypeScript.',
    icon: <Layers className="w-6 h-6 text-pink-400" />,
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Starter',
    price: '$0',
    description: 'Perfect for side projects and learning.',
    features: ['Up to 3 projects', 'Global Edge Deployment', 'Community Support', '1GB Storage'],
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For professional developers and scaling startups.',
    features: ['Unlimited projects', 'DDoS Protection', 'Priority Support', '50GB Storage', 'Analytics Dashboard'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Dedicated infrastructure for mission-critical apps.',
    features: ['SLA 99.99%', 'Dedicated Account Manager', 'SSO & Audit Logs', 'Unlimited Storage', 'Custom Contracts'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Nexus completely revolutionized how we deploy our AI models. The latency reduction is insane.",
    author: "Sarah Chen",
    role: "CTO",
    company: "HyperMind",
  },
  {
    quote: "The developer experience is unmatched. It feels like living in the future of cloud computing.",
    author: "Marcus Rodriguez",
    role: "Lead Engineer",
    company: "StreamLine",
  },
  {
    quote: "Security used to be our biggest headache. With Neural Shield, we sleep soundly at night.",
    author: "Elena Volkov",
    role: "VP of Engineering",
    company: "FinTech One",
  },
];