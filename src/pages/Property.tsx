
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { AnimatedImage } from '@/components/ui/AnimatedImage';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { MapPin, Calendar, Wifi, Utensils, Bath, Car, Coffee, Award } from 'lucide-react';

// Temporary mock data - in a real app would come from API/backend
const properties = {
  'bali-villa': {
    id: 'bali-villa',
    title: 'Beachfront Villa',
    location: 'Canggu, Bali',
    description: 'A stunning beachfront villa with panoramic ocean views, infinity pool, and lush tropical gardens. Perfect for a luxury getaway in paradise.',
    longDescription: `Experience the ultimate Bali getaway in this exquisite beachfront villa. Located in the sought-after area of Canggu, this property offers direct access to the beach and panoramic ocean views that will take your breath away.

The villa features four spacious bedrooms, each with an ensuite bathroom and ocean or garden views. The master suite includes a private terrace, perfect for watching Bali's famous sunsets.

The open-plan living area seamlessly blends indoor and outdoor living, with floor-to-ceiling glass doors that open onto the expansive terrace and infinity pool. The fully equipped gourmet kitchen is perfect for preparing meals or having our private chef create a memorable dining experience.

Outside, the lush tropical garden provides privacy and tranquility, while the infinity pool appears to merge with the ocean beyond. A separate pool pavilion offers a shaded relaxation area.`,
    mainImage: 'https://images.unsplash.com/photo-1570737209810-87a8e7245f88?q=80&w=2532&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1615880484562-a1c5f5450b3b?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602343168117-bb8a12b7b9fa?q=80&w=2425&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1575403071235-5dcd06cbf169?q=80&w=2670&auto=format&fit=crop'
    ],
    amenities: [
      { name: 'Free WiFi', icon: Wifi },
      { name: 'Gourmet Kitchen', icon: Utensils },
      { name: 'Infinity Pool', icon: Bath },
      { name: 'Private Parking', icon: Car },
      { name: 'Daily Breakfast', icon: Coffee },
      { name: 'Concierge Service', icon: Award }
    ],
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    rating: 4.9,
    price: 350,
    reviews: [
      {
        name: 'Sophie Williams',
        location: 'London, UK',
        date: 'March 2023',
        rating: 5,
        content: 'Our stay at the Bali villa was absolutely magical. The staff were attentive, the property stunning, and the bespoke experiences arranged for us made this trip unforgettable.'
      },
      {
        name: 'Michael Johnson',
        location: 'Toronto, Canada',
        date: 'February 2023',
        rating: 5,
        content: 'This villa exceeded all our expectations. The location is perfect - private yet close to everything. The pool and garden are beautiful, and the staff went above and beyond.'
      }
    ]
  },
  'tulum-retreat': {
    id: 'tulum-retreat',
    title: 'Jungle Retreat',
    location: 'Tulum, Mexico',
    description: 'Nestled in the lush jungle just minutes from Tulum\'s pristine beaches. Features a private cenote, open-air living, and sustainable design.',
    longDescription: `Immerse yourself in the magic of Tulum at this exclusive jungle retreat. Thoughtfully designed to balance luxury with sustainability, this property offers a unique experience that connects you with the natural beauty of the Yucatán Peninsula.

Located just a short bike ride from Tulum's famous white sand beaches, this retreat offers the best of both worlds - peaceful seclusion and easy access to the vibrant beach scene.

The property features three beautifully appointed bedrooms with sustainable luxury at their core. Each room has been designed with locally sourced materials and features artisanal furnishings made by Mexican craftspeople.

The heart of the home is the open-air living area, where soaring ceilings and retractable glass walls create a seamless indoor-outdoor experience. The fully equipped kitchen features high-end appliances alongside traditional Mexican cooking tools.

Perhaps the most extraordinary feature is the private cenote - a natural limestone swimming hole fed by the underground river system. This sacred Mayan water source is yours to enjoy in complete privacy.`,
    mainImage: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2670&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1647878081446-1e111af6ba34?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572241280520-a6a069004901?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?q=80&w=2476&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551927336-09d50efd69cd?q=80&w=2569&auto=format&fit=crop'
    ],
    amenities: [
      { name: 'Free WiFi', icon: Wifi },
      { name: 'Chef\'s Kitchen', icon: Utensils },
      { name: 'Private Cenote', icon: Bath },
      { name: 'Bicycles Included', icon: Car },
      { name: 'Organic Breakfast', icon: Coffee },
      { name: 'Concierge Service', icon: Award }
    ],
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    rating: 4.8,
    price: 295,
    reviews: [
      {
        name: 'James Rodriguez',
        location: 'New York, USA',
        date: 'January 2023',
        rating: 5,
        content: 'The Tulum retreat exceeded all expectations. The jungle setting was serene yet we were just minutes from the beach. The local guide recommended to us was incredibly knowledgeable.'
      },
      {
        name: 'Elise Martin',
        location: 'Paris, France',
        date: 'April 2023',
        rating: 4,
        content: 'A beautiful property that truly embraces the Tulum spirit. The private cenote was magical. The only thing to note is that it gets quite warm during the day, but the evenings are perfectly cool.'
      }
    ]
  }
};

// Mock related services
const relatedServices = {
  'bali-villa': [
    {
      id: 'balinese-massage',
      title: 'Traditional Balinese Massage',
      description: 'Experience the healing touch of Balinese massage in the comfort of your villa, performed by skilled local therapists.',
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2670&auto=format&fit=crop',
      price: 85,
      category: 'activities'
    },
    {
      id: 'bali-cooking',
      title: 'Balinese Cooking Class',
      description: 'Learn to prepare authentic Balinese dishes with a private chef using fresh local ingredients from the morning market.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2670&auto=format&fit=crop',
      price: 120,
      category: 'activities'
    },
    {
      id: 'balinese-craft',
      title: 'Handcrafted Balinese Textiles',
      description: 'Authentic hand-woven textiles made by local Balinese artisans using traditional techniques passed down through generations.',
      image: 'https://images.unsplash.com/photo-1621812956658-78796291dc2e?q=80&w=2670&auto=format&fit=crop',
      price: 120,
      category: 'products'
    }
  ],
  'tulum-retreat': [
    {
      id: 'cenote-dive',
      title: 'Private Cenote Diving Experience',
      description: 'Exclusive guided diving tour of hidden cenotes near Tulum with a professional diver. Explore crystal clear waters and unique cave formations.',
      image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2670&auto=format&fit=crop',
      price: 180,
      category: 'activities'
    },
    {
      id: 'mayan-guide',
      title: 'Mayan Heritage Tour with Local Guide',
      description: 'Discover the rich cultural history of Tulum with a knowledgeable local guide of Mayan descent. Visit ancient ruins and sacred sites.',
      image: 'https://images.unsplash.com/photo-1605217613423-0aea4fb32906?q=80&w=2670&auto=format&fit=crop',
      price: 150,
      category: 'guides'
    },
    {
      id: 'tulum-pottery',
      title: 'Artisanal Mexican Pottery',
      description: 'Beautiful handmade pottery crafted by local Mexican artisans, featuring traditional designs and techniques.',
      image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2669&auto=format&fit=crop',
      price: 95,
      category: 'products'
    }
  ]
};

const Property = () => {
  const { id } = useParams<{ id: string }>();
  const property = id ? properties[id as keyof typeof properties] : null;
  const services = id ? relatedServices[id as keyof typeof relatedServices] : [];
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Property Not Found</h1>
            <p className="paragraph text-muted-foreground mb-6">The property you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/properties">View All Properties</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative h-[70vh]">
          <div className="absolute inset-0">
            <AnimatedImage
              src={property.mainImage}
              alt={property.title}
              className="h-full w-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
              <div className="inline-block mb-4 animate-fade-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
                <span className="bg-background/80 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded">
                  {property.location}
                </span>
              </div>
              <h1 className="heading-xl text-white mb-4 animate-fade-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
                {property.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 animate-fade-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
                <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
                  <MapPin size={16} className="mr-2" />
                  <span>{property.location}</span>
                </div>
                <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2">
                  ${property.price} <span className="text-sm">/ night</span>
                </div>
                <div className="ml-auto">
                  <Button asChild className="animate-fade-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]" size="lg">
                    <Link to={`/booking?property=${property.id}`}>Book Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Property Details */}
        <section className="py-12 px-6 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="mb-10">
                  <h2 className="heading-md mb-6">About This Property</h2>
                  <p className="paragraph text-muted-foreground whitespace-pre-line">
                    {property.longDescription}
                  </p>
                </div>
                
                {/* Amenities */}
                <div className="mb-10">
                  <h2 className="heading-sm mb-6">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <amenity.icon size={20} className="mr-3 text-primary" />
                        <span>{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Gallery */}
                <div className="mb-10">
                  <h2 className="heading-sm mb-6">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {property.galleryImages.map((image, index) => (
                      <div 
                        key={index} 
                        className="rounded-xl overflow-hidden aspect-square"
                      >
                        <AnimatedImage
                          src={image}
                          alt={`${property.title} - Image ${index + 1}`}
                          className="h-full w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Reviews */}
                <div>
                  <h2 className="heading-sm mb-6">Guest Reviews</h2>
                  <div className="space-y-6">
                    {property.reviews.map((review, index) => (
                      <ReviewCard
                        key={index}
                        {...review}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-sand-light p-6 rounded-xl mb-8">
                    <h3 className="text-xl font-medium mb-4">Property Details</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bedrooms</span>
                        <span className="font-medium">{property.bedrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bathrooms</span>
                        <span className="font-medium">{property.bathrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Max Guests</span>
                        <span className="font-medium">{property.maxGuests}</span>
                      </div>
                      <div className="border-t border-border pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Price per night</span>
                          <span className="text-xl font-medium">${property.price}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button asChild className="w-full">
                        <Link to={`/booking?property=${property.id}`} className="flex items-center justify-center">
                          <Calendar size={18} className="mr-2" />
                          Check Availability
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-ocean-light p-6 rounded-xl">
                    <h3 className="text-xl font-medium mb-4">Need Help?</h3>
                    <p className="paragraph-sm text-muted-foreground mb-4">
                      Have questions about this property or want to customize your stay? Our concierge team is here to help.
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/contact">Contact Concierge</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Services */}
        <section className="py-16 px-6 md:px-8 lg:px-12 bg-sand-light">
          <div className="max-w-7xl mx-auto">
            <h2 className="heading-md mb-8">Enhance Your Stay</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  {...service}
                />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild>
                <Link to="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Property;
