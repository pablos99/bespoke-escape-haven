
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <section className="container max-w-6xl mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <h1 className="heading-lg mb-4">Our Story</h1>
            <p className="paragraph-lg max-w-3xl mx-auto text-muted-foreground">
              Discover how a passion for travel and authentic experiences led to the creation of Serene Stays.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="heading-md mb-4">From Travelers to Hosts</h2>
              <p className="paragraph mb-4">
                What began as a personal journey across Southeast Asia and Latin America evolved into a vision to create spaces where travelers could truly connect with local cultures and communities.
              </p>
              <p className="paragraph mb-4">
                After falling in love with Bali and Tulum, we decided to establish roots in these magical destinations and share their beauty with like-minded travelers seeking authentic experiences beyond the typical tourist path.
              </p>
              <p className="paragraph">
                Today, Serene Stays represents our commitment to sustainable tourism, cultural preservation, and creating memorable experiences that benefit both visitors and local communities.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Founders in Bali" 
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1582610116397-edb318620f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Local community" 
                className="w-full h-auto"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="heading-md mb-4">Our Philosophy</h2>
              <p className="paragraph mb-4">
                At Serene Stays, we believe that travel should be transformative – not just for guests, but for local communities as well. That's why we built our business on three core principles:
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                  <span className="paragraph"><strong>Authentic Experiences:</strong> We curate properties and services that reflect the true essence of each destination.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                  <span className="paragraph"><strong>Community Impact:</strong> We partner with local artisans, guides, and businesses to ensure tourism benefits the local economy.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                  <span className="paragraph"><strong>Sustainable Practices:</strong> We implement eco-friendly practices in all our properties and encourage guests to explore responsibly.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className="bg-accent/10 py-16">
          <div className="container max-w-6xl mx-auto px-4 text-center">
            <h2 className="heading-md mb-8">Ready to Experience the Difference?</h2>
            <p className="paragraph max-w-3xl mx-auto mb-8">
              Join us for a stay that goes beyond accommodation – an immersive journey into the heart and soul of Bali and Tulum.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/properties">Browse Properties</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
