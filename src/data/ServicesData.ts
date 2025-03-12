
// Mock data for services - in a real app would come from API/backend
export const services = {
  products: [
    {
      id: 'balinese-craft',
      title: 'Handcrafted Balinese Textiles',
      description: 'Authentic hand-woven textiles made by local Balinese artisans using traditional techniques passed down through generations.',
      image: 'https://images.unsplash.com/photo-1621812956658-78796291dc2e?q=80&w=2670&auto=format&fit=crop',
      price: 120,
      category: 'products' as const,
      location: 'bali'
    },
    {
      id: 'tulum-pottery',
      title: 'Artisanal Mexican Pottery',
      description: 'Beautiful handmade pottery crafted by local Mexican artisans, featuring traditional designs and techniques.',
      image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2669&auto=format&fit=crop',
      price: 95,
      category: 'products' as const,
      location: 'tulum'
    },
    {
      id: 'bali-woodcarving',
      title: 'Traditional Balinese Wood Carvings',
      description: 'Exquisite hand-carved wooden sculptures and decorative items created by skilled Balinese woodcarvers.',
      image: 'https://images.unsplash.com/photo-1584283092092-a9c90507cb65?q=80&w=2670&auto=format&fit=crop',
      price: 150,
      category: 'products' as const,
      location: 'bali'
    },
    {
      id: 'tulum-dreamcatcher',
      title: 'Mayan Dream Catchers',
      description: 'Handcrafted dream catchers made by local Mayan artisans using traditional techniques and natural materials.',
      image: 'https://images.unsplash.com/photo-1514047413421-005d8841293e?q=80&w=2574&auto=format&fit=crop',
      price: 75,
      category: 'products' as const,
      location: 'tulum'
    }
  ],
  activities: [
    {
      id: 'balinese-massage',
      title: 'Traditional Balinese Massage',
      description: 'Experience the healing touch of Balinese massage in the comfort of your villa, performed by skilled local therapists.',
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2670&auto=format&fit=crop',
      price: 85,
      category: 'activities' as const,
      location: 'bali'
    },
    {
      id: 'bali-cooking',
      title: 'Balinese Cooking Class',
      description: 'Learn to prepare authentic Balinese dishes with a private chef using fresh local ingredients from the morning market.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2670&auto=format&fit=crop',
      price: 120,
      category: 'activities' as const,
      location: 'bali'
    },
    {
      id: 'cenote-dive',
      title: 'Private Cenote Diving Experience',
      description: 'Exclusive guided diving tour of hidden cenotes near Tulum with a professional diver. Explore crystal clear waters and unique cave formations.',
      image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2670&auto=format&fit=crop',
      price: 180,
      category: 'activities' as const,
      location: 'tulum'
    },
    {
      id: 'tulum-yoga',
      title: 'Beachfront Yoga Session',
      description: 'Start your day with a private yoga session on the beach, led by experienced local instructors against the backdrop of the Caribbean Sea.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2622&auto=format&fit=crop',
      price: 65,
      category: 'activities' as const,
      location: 'tulum'
    }
  ],
  guides: [
    {
      id: 'mayan-guide',
      title: 'Mayan Heritage Tour with Local Guide',
      description: 'Discover the rich cultural history of Tulum with a knowledgeable local guide of Mayan descent. Visit ancient ruins and sacred sites.',
      image: 'https://images.unsplash.com/photo-1605217613423-0aea4fb32906?q=80&w=2670&auto=format&fit=crop',
      price: 150,
      category: 'guides' as const,
      location: 'tulum'
    },
    {
      id: 'bali-temple-guide',
      title: 'Sacred Temples Tour with Balinese Guide',
      description: 'Explore Bali\'s most significant temples with a local guide who will explain the cultural and spiritual significance of each site.',
      image: 'https://images.unsplash.com/photo-1604922824961-87cefb9dc1ce?q=80&w=2574&auto=format&fit=crop',
      price: 130,
      category: 'guides' as const,
      location: 'bali'
    },
    {
      id: 'tulum-foodie-tour',
      title: 'Tulum Culinary Explorer',
      description: 'A guided tour of Tulum\'s best local eateries and food markets with a culinary expert who will introduce you to authentic Mexican flavors.',
      image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=2535&auto=format&fit=crop',
      price: 110,
      category: 'guides' as const,
      location: 'tulum'
    },
    {
      id: 'bali-art-tour',
      title: 'Ubud Art and Craft Villages Tour',
      description: 'Visit the artistic heart of Bali with a guide who will take you to the best galleries, workshops, and craft villages around Ubud.',
      image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2670&auto=format&fit=crop',
      price: 120,
      category: 'guides' as const,
      location: 'bali'
    }
  ]
};

// Helper function to filter services based on category and location
export const getFilteredServices = (category: string, locationFilter: string) => {
  // Start with all services from the selected category (or all categories)
  const categoryServices = category === 'all' 
    ? [...services.products, ...services.activities, ...services.guides]
    : services[category as keyof typeof services];
  
  // Apply location filter if not "all"
  return locationFilter === 'all' 
    ? categoryServices 
    : categoryServices.filter(service => service.location === locationFilter);
};
