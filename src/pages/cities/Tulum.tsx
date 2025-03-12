
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { AnimatedImage } from '@/components/ui/AnimatedImage';
import { ArrowRight, MapPin } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const tulumProperties = [
  {
    id: 'tulum-retreat',
    title: 'Jungle Retreat',
    location: 'Tulum, Mexico',
    description: 'Nestled in the lush jungle just minutes from Tulum\'s pristine beaches. Features a private cenote, open-air living, and sustainable design.',
    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2670&auto=format&fit=crop',
    rating: 4.8,
    price: 295
  },
  {
    id: 'tulum-beachfront',
    title: 'Beachfront Cabana',
    location: 'Tulum Beach, Mexico',
    description: 'Steps from the turquoise Caribbean waters, this eco-friendly cabana offers barefoot luxury with stunning ocean views and a private beach area.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2670&auto=format&fit=crop',
    rating: 4.9,
    price: 320
  }
];

const tulumActivities = [
  {
    id: 'cenote-dive',
    title: 'Private Cenote Diving Experience',
    description: 'Exclusive guided diving tour of hidden cenotes near Tulum with a professional diver. Explore crystal clear waters and unique cave formations.',
    image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2670&auto=format&fit=crop',
    price: 180,
    category: 'activities' as const
  },
  {
    id: 'mayan-guide',
    title: 'Mayan Heritage Tour with Local Guide',
    description: 'Discover the rich cultural history of Tulum with a knowledgeable local guide of Mayan descent. Visit ancient ruins and sacred sites.',
    image: 'https://images.unsplash.com/photo-1605217613423-0aea4fb32906?q=80&w=2670&auto=format&fit=crop',
    price: 150,
    category: 'guides' as const
  },
  {
    id: 'tulum-textiles',
    title: 'Mexican Textile Workshop',
    description: 'Learn traditional Mexican weaving techniques and create your own textile piece with guidance from local artisans.',
    image: 'https://images.unsplash.com/photo-16106316837266-56f41801b7e4?q=80&w=2670&auto=format&fit=crop',
    price: 90,
    category: 'products' as const
  }
];

const tulumHighlights = [
  {
    title: 'Tulum Ruins',
    description: 'Ancient Mayan walled city serving as a major port. The ruins sit on 12-meter tall cliffs along the east coast of the Yucatán Peninsula.',
    image: 'https://images.unsplash.com/photo-1605217613423-0aea4fb32906?q=80&w=2670&auto=format&fit=crop'
  },
  {
    title: 'Gran Cenote',
    description: 'Crystal clear natural swimming hole connected to an underground river system. Perfect for swimming, snorkeling, and diving.',
    image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2670&auto=format&fit=crop'
  },
  {
    title: 'Sian Ka\'an Biosphere Reserve',
    description: 'UNESCO World Heritage site containing tropical forests, mangroves, marshes, and a large marine section intersected by a barrier reef.',
    image: 'https://images.unsplash.com/photo-1581265364812-8f130fabf92a?q=80&w=2668&auto=format&fit=crop'
  },
  {
    title: 'Tulum Beach',
    description: 'Pristine white sand beaches with turquoise waters along the Caribbean coast. Known for its bohemian atmosphere and eco-friendly resorts.',
    image: 'https://images.unsplash.com/photo-1502555287590-1c5fdf944ca5?q=80&w=2574&auto=format&fit=crop'
  }
];

export default function Tulum() {
  const { t } = useApp();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero 
          title={t('cities.tulum.title')}
          subtitle={t('cities.tulum.subtitle')}
          backgroundImage="https://images.unsplash.com/photo-1517436073-3b3ee1ee4915?q=80&w=2670&auto=format&fit=crop"
        />
        
        {/* About Tulum Section */}
        <section className="py-20 px-6 md:px-8 lg:px-12" id="about-tulum">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="heading-lg mb-6">Riviera Maya's Jewel</h2>
                <p className="paragraph text-muted-foreground mb-6">
                  Tulum offers a unique blend of beach, jungle, and ancient culture. Once a walled Mayan city, today it's known for its well-preserved ruins, white-sand beaches, and crystal-clear cenotes.
                </p>
                <p className="paragraph text-muted-foreground mb-8">
                  With its bohemian atmosphere, eco-conscious accommodations, and thriving wellness scene, Tulum has become a haven for travelers seeking a more mindful approach to luxury.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <a href="#tulum-properties">View Properties</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="#tulum-experiences">Explore Experiences</a>
                  </Button>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="grid grid-cols-2 gap-4">
                  <AnimatedImage
                    src="https://images.unsplash.com/photo-1635239381733-ece45d0caf57?q=80&w=2574&auto=format&fit=crop"
                    alt="Tulum Ruins"
                    className="rounded-xl aspect-[3/4] object-cover w-full"
                    hoverEffect="glow"
                  />
                  <AnimatedImage
                    src="https://images.unsplash.com/photo-1580935769126-a813a7637ca8?q=80&w=2574&auto=format&fit=crop"
                    alt="Tulum Beach"
                    className="rounded-xl aspect-[3/4] object-cover w-full"
                    hoverEffect="glow"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Properties Section */}
        <section className="py-20 px-6 md:px-8 lg:px-12 bg-ocean-light" id="tulum-properties">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <h2 className="heading-lg mb-4">Our Tulum Retreats</h2>
                <p className="paragraph text-muted-foreground">
                  Sustainably designed properties that blend with Tulum's natural beauty.
                </p>
              </div>
              <div className="mt-6 md:mt-0">
                <Button asChild variant="outline">
                  <Link to="/properties" className="flex items-center">
                    {t('button.exploreProperties')}
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tulumProperties.map((property) => (
                <PropertyCard 
                  key={property.id}
                  {...property}
                  className="animate-fade-up opacity-0 [animation-fill-mode:forwards]"
                  style={{ animationDelay: `${tulumProperties.indexOf(property) * 100}ms` }}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Experiences Section */}
        <section className="py-20 px-6 md:px-8 lg:px-12" id="tulum-experiences">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-lg mb-4">Tulum Experiences</h2>
              <p className="paragraph text-muted-foreground">
                Connect with the rich Mayan culture and natural wonders of the Yucatán Peninsula.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tulumActivities.map((activity) => (
                <ServiceCard 
                  key={activity.id}
                  {...activity}
                  className="animate-fade-up opacity-0 [animation-fill-mode:forwards]"
                  style={{ animationDelay: `${tulumActivities.indexOf(activity) * 100}ms` }}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild>
                <Link to="/services" className="flex items-center justify-center">
                  Explore All Services
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Highlights Section */}
        <section className="py-20 px-6 md:px-8 lg:px-12 bg-terra-light" id="tulum-highlights">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-lg mb-4">Tulum Highlights</h2>
              <p className="paragraph text-muted-foreground">
                Must-visit attractions and natural wonders in and around Tulum.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tulumHighlights.map((highlight, index) => (
                <div 
                  key={index}
                  className="bg-background rounded-xl overflow-hidden shadow-md flex flex-col"
                >
                  <div className="h-64 overflow-hidden">
                    <AnimatedImage
                      src={highlight.image}
                      alt={highlight.title}
                      className="w-full h-full object-cover"
                      hoverEffect="zoom"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{highlight.title}</h3>
                    <p className="text-muted-foreground">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-20 px-6 md:px-8 lg:px-12" id="tulum-map">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-lg mb-4">Discover Tulum</h2>
              <p className="paragraph text-muted-foreground">
                Our properties are located in the most desirable areas of Tulum.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-muted rounded-xl overflow-hidden aspect-[4/3] relative">
                <MapPin className="text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={32} />
                <div className="absolute inset-0">
                  <img 
                    src="https://images.unsplash.com/photo-1580935769126-a813a7637ca8?q=80&w=2574&auto=format&fit=crop"
                    alt="Tulum map"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              </div>
              <div>
                <h3 className="heading-md mb-4">Our Locations</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin size={20} className="mr-2 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Tulum Beach Road</h4>
                      <p className="text-muted-foreground">
                        The iconic beach road lined with boutique hotels, yoga retreats, and beachfront cabanas. Our beachfront properties offer direct access to the Caribbean.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <MapPin size={20} className="mr-2 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Tulum Jungle</h4>
                      <p className="text-muted-foreground">
                        Just a short distance from the beach, our jungle retreats offer privacy and tranquility surrounded by lush tropical vegetation.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <MapPin size={20} className="mr-2 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Tulum Town</h4>
                      <p className="text-muted-foreground">
                        The vibrant pueblo with local restaurants, shops, and authentic Mexican culture. Our town properties offer convenience and a glimpse into local life.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
