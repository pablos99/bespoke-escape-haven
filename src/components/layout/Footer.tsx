
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Map } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-sand-light text-primary py-16 px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-medium mb-4">Serene Stays</h3>
            <p className="text-muted-foreground max-w-xs">
              Exclusive luxury properties in Bali and Tulum with bespoke services and experiences.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-primary hover:text-accent-foreground transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary hover:text-accent-foreground transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary hover:text-accent-foreground transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="hover:text-accent-foreground transition-colors">Home</Link>
              <Link to="/properties" className="hover:text-accent-foreground transition-colors">Properties</Link>
              <Link to="/services" className="hover:text-accent-foreground transition-colors">Bespoke Services</Link>
              <Link to="/booking" className="hover:text-accent-foreground transition-colors">Book a Stay</Link>
              <Link to="/about" className="hover:text-accent-foreground transition-colors">About Us</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Mail size={18} />
                <span>hello@serenestays.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Map size={18} className="mt-1 flex-shrink-0" />
                <div>
                  <p>Bali: Jalan Pantai Batu Bolong No.12, Canggu</p>
                  <p>Tulum: Carretera Tulum-Boca Paila Km.7</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-sand-dark mt-12 pt-8 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Serene Stays. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
