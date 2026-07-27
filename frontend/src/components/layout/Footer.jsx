import React from 'react';
import { ExternalLink, Database, Sparkles, Github, Linkedin, Mail, Globe, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800 relative overflow-hidden">
      {/* Top National Tricolor Accent Strip */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-[#FFFFFF]"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      {/* UX4G 1440px Centered Container (80px top padding, 40px bottom padding) */}
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Column 1: Logo & Mission */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center border border-slate-700 shadow-xs">
                <img src="/india-emblem.png" alt="State Emblem of India" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-base text-white tracking-tight flex items-center gap-2">
                India in the World
                <img src="/india-flag.png" alt="India Flag" className="w-4 h-3 rounded-xs object-cover border border-slate-700" />
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Explore India's global rankings across economy, healthcare, education, technology, governance, environment, and more using trusted international datasets.
            </p>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-semibold text-[#10B981]">
              Verified Datasets Only
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <Link to="/" className="hover:text-white transition-colors hover:underline">Dashboard</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white transition-colors hover:underline">Categories</Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-white transition-colors hover:underline">Compare</Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-white transition-colors hover:underline">World Map</Link>
              </li>
              <li>
                <Link to="/trends" className="hover:text-white transition-colors hover:underline">Historical Trends</Link>
              </li>
              <li>
                <Link to="/ai-insights" className="hover:text-white transition-colors hover:underline">AI Insights</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Project Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <a href="https://github.com/Immanuelj15/India_Dashboard#readme" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  Documentation <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://github.com/Immanuelj15/India_Dashboard/blob/main/docs/data_sources.md" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  Data Sources <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://github.com/Immanuelj15/India_Dashboard" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  GitHub Repository <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://github.com/Immanuelj15/India_Dashboard/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  MIT License <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://github.com/Immanuelj15/India_Dashboard#readme" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  README File <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Data Sources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#2563EB]" /> Official Data Sources
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-medium">
              <li>
                <a href="https://data.worldbank.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  World Bank Open Data <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://hdr.undp.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  United Nations (UNDP) <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.who.int" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  World Health Organization <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.imf.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  International Monetary Fund <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.wipo.int/gii" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  WIPO Global Innovation <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.transparency.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  Transparency International <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://ourworldindata.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  Our World In Data <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Developer Contacts & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#2563EB]" /> Lead Developer
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5 text-xs">
              <div className="font-bold text-white text-sm">Immanuel J</div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                Full-Stack AI Developer & Data Systems Architect.
              </p>

              <div className="flex items-center gap-3 pt-1 text-slate-300">
                <motion.a
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  href="https://github.com/Immanuelj15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  href="mailto:imman@example.com"
                  className="hover:text-white transition-colors"
                  title="Email Contact"
                >
                  <Mail className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Version Strip */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-medium">
          <div>© 2026 India in the World • Made with ❤️ using React, FastAPI, PostgreSQL and AI</div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-blue-400">Version v1.0</span>
            <span>•</span>
            <span>सत्यमेव जयते</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
