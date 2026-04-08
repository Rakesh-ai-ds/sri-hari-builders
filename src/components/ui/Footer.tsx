"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-charcoal text-off-white pt-20 pb-10 border-t border-white/10 mt-32">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="mb-6 inline-block group">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gold/30 bg-white p-1 transition-transform duration-500 group-hover:scale-110 shadow-lg shadow-gold/10">
                <Image 
                  src="/logo.png" 
                  alt="SHB Logo" 
                  fill 
                  className="object-contain p-0 scale-[1.7]" 
                />
              </div>
              <div>
                <span className="text-2xl font-serif font-bold text-gold uppercase">SRI HARI</span>
                <span className="block text-[10px] uppercase tracking-widest text-off-white/80">Builders & Promoters</span>
              </div>
            </div>
          </Link>
          <p className="text-off-white/80 text-sm leading-relaxed mb-6">
            Sri Hari Builder & Promoters (SHB) is Coimbatore&apos;s premier engineering house. Since 1995, we have been building generational legacies through <span className="text-white font-bold">architectural beauty</span> and <span className="text-white font-bold">structural precision</span>.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/share/1NkGcyHxAX/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 rounded-full hover:border-gold transition-colors"><Facebook size={16} /></a>
            <a href="https://youtube.com/@sriharibuildershb?si=vPAGA8UogVz84N-P" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 rounded-full hover:border-gold transition-colors flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/srihari_buildercbe?igsh=MTFjbGU5aXA3dmlzcQ==" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 rounded-full hover:border-gold transition-colors"><Instagram size={16} /></a>
            <a href="https://share.google/DyjsYyYXRiFtDiqUV" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 rounded-full hover:border-gold transition-colors"><MapPin size={16} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-serif text-gold mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
          <ul className="space-y-4 text-sm text-off-white/80">
            <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            <li><Link href="/projects" className="hover:text-gold transition-colors">Our Projects</Link></li>
            <li><Link href="/services" className="hover:text-gold transition-colors">Services</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-serif text-gold mb-6 uppercase tracking-widest text-sm">Our Services</h4>
          <ul className="space-y-4 text-sm text-off-white/80">
            <li><Link href="/services" className="hover:text-gold transition-colors">Turnkey Projects</Link></li>
            <li><Link href="/services" className="hover:text-gold transition-colors">Architecture Design</Link></li>
            <li><Link href="/services" className="hover:text-gold transition-colors">Civil Engineering</Link></li>
            <li><Link href="/services" className="hover:text-gold transition-colors">Interior Solutions</Link></li>
            <li><Link href="/services" className="hover:text-gold transition-colors">Property Development</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-serif text-gold mb-6 uppercase tracking-widest text-sm">Connect</h4>
          <ul className="space-y-4 text-sm text-off-white/80">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-gold" />
              <span>No 133, Near Ramanis Appartment,<br />Amarar Jevanatham Road, 7th Street Ext,<br />Coimbatore, Tamil Nadu 641012</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-gold" />
              <span>+91 97870 81184, 90470 35184</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-gold" />
              <span>sriharibuilder7@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-white/10 text-center text-xs text-off-white/40 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} Sri Hari Builder & Promoters. Crafted with Excellence.</p>
      </div>
    </footer>
  );
};
