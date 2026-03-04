import { Property } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern 4 Bedroom Villa in Karen',
    description: 'A stunning contemporary villa located in the heart of Karen. Features include a private pool, spacious garden, and high-end finishes throughout.',
    price: 85000000,
    location: 'Karen, Nairobi',
    type: 'House',
    listingType: 'Sale',
    bedrooms: 4,
    bathrooms: 4,
    area: '4500 sqft',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Swimming Pool', 'Garden', 'Gated Community', 'Solar Power'],
    agent: {
      name: 'Sarah Kamau',
      phone: '+254 712 345 678',
      image: 'https://i.pravatar.cc/150?u=sarah'
    }
  },
  {
    id: '2',
    title: 'Luxury Apartment with Ocean View',
    description: 'Experience coastal living at its finest. This 3-bedroom apartment offers breathtaking views of the Indian Ocean and direct beach access.',
    price: 150000,
    location: 'Nyali, Mombasa',
    type: 'Apartment',
    listingType: 'Rent',
    bedrooms: 3,
    bathrooms: 3,
    area: '2200 sqft',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Ocean View', 'Gym', 'Elevator', 'Beach Access'],
    agent: {
      name: 'John Mutua',
      phone: '+254 723 456 789',
      image: 'https://i.pravatar.cc/150?u=john'
    }
  },
  {
    id: '3',
    title: 'Prime 1/2 Acre Land in Runda',
    description: 'Residential plot in the prestigious Runda estate. Ready for development with all utilities on site.',
    price: 45000000,
    location: 'Runda, Nairobi',
    type: 'Land',
    listingType: 'Sale',
    area: '0.5 Acres',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Ready Title', 'Fenced', 'Red Soil', 'Water & Electricity'],
    agent: {
      name: 'Grace Wanjiru',
      phone: '+254 734 567 890',
      image: 'https://i.pravatar.cc/150?u=grace'
    }
  },
  {
    id: '4',
    title: 'Commercial Office Space in Westlands',
    description: 'Modern office space in a prime business hub. High-speed internet, ample parking, and 24/7 security.',
    price: 250000,
    location: 'Westlands, Nairobi',
    type: 'Commercial',
    listingType: 'Rent',
    area: '1500 sqft',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Parking', 'Backup Generator', 'High-speed Internet', 'Security'],
    agent: {
      name: 'David Omondi',
      phone: '+254 745 678 901',
      image: 'https://i.pravatar.cc/150?u=david'
    }
  },
  {
    id: '5',
    title: '3 Bedroom Townhouse in Lavington',
    description: 'Elegant townhouse in a quiet cul-de-sac. Features a modern kitchen, wooden floors, and a small private garden.',
    price: 35000000,
    location: 'Lavington, Nairobi',
    type: 'House',
    listingType: 'Sale',
    bedrooms: 3,
    bathrooms: 3,
    area: '2800 sqft',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Private Garden', 'Wooden Floors', 'DSQ', 'Borehole'],
    agent: {
      name: 'Sarah Kamau',
      phone: '+254 712 345 678',
      image: 'https://i.pravatar.cc/150?u=sarah'
    }
  }
];

export const INQUIRIES = [
  {
    id: '1',
    propertyId: '1',
    propertyName: 'Modern 4 Bedroom Villa in Karen',
    userName: 'Alice Wambui',
    userEmail: 'alice@example.com',
    userPhone: '+254 700 111 222',
    message: 'I am interested in viewing this property this weekend. Is it still available?',
    date: '2026-03-01',
    status: 'New'
  },
  {
    id: '2',
    propertyId: '5',
    propertyName: '3 Bedroom Townhouse in Lavington',
    userName: 'Mark Otieno',
    userEmail: 'mark@example.com',
    userPhone: '+254 711 222 333',
    message: 'What is the lowest price for cash buyers?',
    date: '2026-03-02',
    status: 'Contacted'
  }
];
