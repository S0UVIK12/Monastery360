import { db } from './db';
import { monasteries, festivals, accommodations, blogs } from '@shared/schema';

const monasteryData = [
  {
    name: 'Rumtek Monastery',
    description: 'The largest monastery in Sikkim and seat of the Karmapa. This magnificent structure was built in the 1960s to house the relocated Karmapa from Tibet. Features stunning Tibetan architecture with golden roofs, intricate murals, and houses precious Buddhist artifacts including golden stupas, ancient manuscripts, and religious relics.',
    region: 'East',
    latitude: '27.3350',
    longitude: '88.5593',
    image: '/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png',
    significance: 'Seat of the 16th Karmapa - Kagyu School',
    bestTimeToVisit: 'October to May'
  },
  {
    name: 'Enchey Monastery',
    description: 'A 200-year-old monastery perched on a hilltop with panoramic views of Gangtok and surrounding mountains. Built in 1909, it belongs to the Nyingma order and is known for its beautiful murals depicting Buddhist teachings and peaceful atmosphere perfect for meditation.',
    region: 'East',
    latitude: '27.3330',
    longitude: '88.6140',
    image: '/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png',
    significance: 'Nyingma tradition - Guru Padmasambhava lineage',
    bestTimeToVisit: 'March to June'
  },
  {
    name: 'Pemayangtse Monastery',
    description: 'One of the oldest and most important monasteries in Sikkim, founded in 1705. Features a unique seven-tiered wooden sculpture representing the celestial palace of Guru Rinpoche. The monastery offers stunning views of Kanchenjunga and houses ancient murals and manuscripts.',
    region: 'West',
    latitude: '27.2060',
    longitude: '88.2470',
    image: '/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png',
    significance: 'Premier Nyingma monastery of Sikkim',
    bestTimeToVisit: 'October to May'
  },
  {
    name: 'Tashiding Monastery',
    description: 'Sacred monastery situated on a heart-shaped hilltop between Rathong and Rangeet rivers. Founded in 1717, it is famous for its sacred Bumchu ceremony and offers breathtaking panoramic views of snow-capped mountains and valleys.',
    region: 'West',
    latitude: '27.3220',
    longitude: '88.2720',
    image: '/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png',
    significance: 'Most sacred Nyingma pilgrimage site',
    bestTimeToVisit: 'Year round'
  },
  {
    name: 'Phensang Monastery',
    description: 'A serene monastery in North Sikkim known for its pristine mountain location and traditional Buddhist practices. Located at high altitude, it offers breathtaking views of snow-capped peaks and is perfect for those seeking spiritual solitude.',
    region: 'North',
    latitude: '27.7000',
    longitude: '88.5000',
    image: '/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png',
    significance: 'High altitude meditation center',
    bestTimeToVisit: 'May to September'
  },
  {
    name: 'Bon Monastery',
    description: 'Unique monastery following the ancient Bon tradition, offering insights into pre-Buddhist spiritual practices of the Himalayan region. This rare monastery preserves ancient rituals and practices that predate Buddhism in Tibet.',
    region: 'South',
    latitude: '27.1000',
    longitude: '88.4000',
    image: '/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png',
    significance: 'Ancient Bon tradition preservation',
    bestTimeToVisit: 'October to April'
  },
  {
    name: 'Dubdi Monastery',
    description: 'The oldest monastery in Sikkim, established in 1701 by Lhatsun Chempo. Located on a hilltop above Yuksom, it is considered the cradle of Buddhism in Sikkim and offers peaceful meditation spots with historical significance.',
    region: 'West',
    latitude: '27.3667',
    longitude: '88.2167',
    image: '/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png',
    significance: 'First monastery in Sikkim - Nyingma',
    bestTimeToVisit: 'March to November'
  },
  {
    name: 'Ranka Monastery',
    description: 'Also known as Lingdum Monastery, this modern monastery was built in 1998 and features contemporary Buddhist architecture. It houses a beautiful collection of Buddhist art and offers meditation programs for visitors.',
    region: 'East',
    latitude: '27.2833',
    longitude: '88.5667',
    image: '/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png',
    significance: 'Modern Kagyu monastery',
    bestTimeToVisit: 'Year round'
  }
];

const festivalData = [
  {
    name: 'Losar',
    date: 'February 2024',
    description: 'Tibetan New Year celebrated with traditional masked dances, prayers, colorful decorations, and community feasts across all monasteries. This 15-day celebration marks the most important festival in the Buddhist calendar.',
    monastery: 'All Monasteries',
    significance: 'Tibetan New Year - Most Important Buddhist Festival'
  },
  {
    name: 'Saga Dawa',
    date: 'May 2024',
    description: 'Sacred month commemorating Buddha\'s birth, enlightenment, and nirvana with special prayers, rituals, and merit-making activities. Devotees engage in circumambulation and offer prayers for world peace.',
    monastery: 'Pemayangtse Monastery',
    significance: 'Triple Blessed Day of Buddha'
  },
  {
    name: 'Pang Lhabsol',
    date: 'August 2024',
    description: 'Unique festival celebrating Mount Khangchendzonga as the guardian deity of Sikkim, featuring spectacular warrior dances and traditional ceremonies that showcase the cultural heritage of the region.',
    monastery: 'Enchey Monastery',
    significance: 'Mountain Guardian Festival'
  },
  {
    name: 'Drupka Teshi',
    date: 'July 2024',
    description: 'Celebrates Buddha\'s first sermon with special prayers, traditional performances, and teachings. Monks and devotees gather to listen to dharma teachings and participate in religious ceremonies.',
    monastery: 'Tashiding Monastery',
    significance: 'First Sermon Day'
  },
  {
    name: 'Bumchu',
    date: 'January 2024',
    description: 'Sacred water ceremony at Tashiding Monastery where the water level in a sacred pot predicts the coming year\'s fortune. This unique festival draws thousands of pilgrims.',
    monastery: 'Tashiding Monastery',
    significance: 'Sacred Water Prophecy'
  },
  {
    name: 'Dushera',
    date: 'October 2024',
    description: 'Hindu festival celebrating the victory of good over evil, widely celebrated across Sikkim with cultural performances, traditional dances, and community gatherings.',
    monastery: 'Local Communities',
    significance: 'Victory of Good over Evil'
  }
];

const accommodationData = [
  {
    name: 'Mayfair Spa Resort & Casino',
    type: 'hotel',
    location: 'Gangtok',
    price: 8000,
    rating: 5,
    amenities: ['Spa', 'Casino', 'Mountain View', 'Restaurant', 'WiFi', 'Pool'],
    image: '/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png'
  },
  {
    name: 'WelcomHotel Denzong',
    type: 'hotel',
    location: 'Gangtok',
    price: 6000,
    rating: 4,
    amenities: ['Restaurant', 'Business Center', 'WiFi', 'Room Service', 'Parking'],
    image: '/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png'
  },
  {
    name: 'Traditional Lepcha Homestay',
    type: 'homestay',
    location: 'Dzongu',
    price: 1500,
    rating: 4,
    amenities: ['Traditional Meals', 'Cultural Experience', 'Mountain View', 'Organic Garden'],
    image: '/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png'
  },
  {
    name: 'Monastery Guesthouse',
    type: 'homestay',
    location: 'Rumtek',
    price: 800,
    rating: 3,
    amenities: ['Meditation Hall', 'Vegetarian Meals', 'Peaceful Environment', 'Library'],
    image: '/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png'
  },
  {
    name: 'Bamboo Grove Eco Lodge',
    type: 'eco-lodge',
    location: 'Pelling',
    price: 3500,
    rating: 4,
    amenities: ['Eco-friendly', 'Nature Trails', 'Organic Food', 'Solar Power', 'Bird Watching'],
    image: '/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png'
  },
  {
    name: 'Mountain Retreat Eco Resort',
    type: 'eco-lodge',
    location: 'Lachung',
    price: 4000,
    rating: 4,
    amenities: ['Mountain View', 'Yoga', 'Organic Meals', 'Nature Walks', 'Clean Energy'],
    image: '/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png'
  }
];

const blogData = [
  {
    title: 'A Spiritual Journey Through Rumtek Monastery',
    content: 'Discover the profound spiritual experience of visiting one of Sikkim\'s most significant monasteries. From the early morning prayers echoing through the halls to the intricate Buddhist art adorning every surface, Rumtek offers a window into centuries-old traditions that continue to thrive in the modern world. The monastery complex houses over 300 monks and serves as a center for Buddhist learning and meditation practices. Visitors can witness daily prayer ceremonies, explore the main prayer hall with its stunning golden Buddha statue, and learn about Tibetan Buddhist philosophy from resident monks.',
    author: 'Priya Sharma',
    publishedAt: new Date('2024-01-15'),
    category: 'experiences',
    image: '/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png'
  },
  {
    title: 'Essential Tips for First-Time Visitors to Sikkim Monasteries',
    content: 'Planning your first monastery visit in Sikkim? This comprehensive guide covers everything from dress codes and photography etiquette to the best times for visits and how to participate respectfully in prayer ceremonies. Learn about the cultural significance of different rituals, understand the meaning behind colorful prayer flags, and discover practical considerations for a meaningful spiritual experience. Important tips include wearing modest clothing, removing shoes before entering prayer halls, and maintaining silence during ceremonies.',
    author: 'David Chen',
    publishedAt: new Date('2024-01-20'),
    category: 'travel-tips',
    image: '/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png'
  },
  {
    title: 'Understanding Buddhist Festivals in Sikkim',
    content: 'Explore the rich tapestry of Buddhist festivals celebrated throughout Sikkim. From the colorful masked dances of Losar to the sacred significance of Saga Dawa, each festival offers unique insights into Tibetan Buddhist culture and provides visitors with unforgettable experiences. Learn about the spiritual meaning behind different ceremonies, the role of music and dance in Buddhist traditions, and how to respectfully participate in these sacred celebrations.',
    author: 'Lama Tenzin Norbu',
    publishedAt: new Date('2024-01-25'),
    category: 'culture',
    image: '/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png'
  },
  {
    title: 'Photography Guide: Capturing the Beauty of Himalayan Monasteries',
    content: 'Learn the art of monastery photography while respecting sacred spaces. This guide covers camera settings for low-light interiors, composition techniques for architectural details, and the ethics of photographing religious ceremonies and practitioners. Discover how to capture the essence of spiritual life without disturbing the peaceful atmosphere, and understand when photography is appropriate and when it should be avoided.',
    author: 'Sarah Miller',
    publishedAt: new Date('2024-02-01'),
    category: 'guides',
    image: '/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png'
  },
  {
    title: 'The Ancient Art of Thangka Painting in Sikkim Monasteries',
    content: 'Delve into the sacred art of Thangka painting, a traditional Tibetan Buddhist art form preserved in Sikkim\'s monasteries. Learn about the spiritual significance of these intricate paintings, the materials and techniques used, and meet the master artists who continue this ancient tradition. Discover how these sacred artworks serve as both teaching tools and objects of meditation.',
    author: 'Master Karma Tashi',
    publishedAt: new Date('2024-02-05'),
    category: 'culture',
    image: '/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png'
  }
];

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await db.delete(blogs);
    await db.delete(accommodations);
    await db.delete(festivals);
    await db.delete(monasteries);

    // Insert monasteries
    console.log('📿 Seeding monasteries...');
    await db.insert(monasteries).values(monasteryData);

    // Insert festivals
    console.log('🎉 Seeding festivals...');
    await db.insert(festivals).values(festivalData);

    // Insert accommodations
    console.log('🏨 Seeding accommodations...');
    await db.insert(accommodations).values(accommodationData);

    // Insert blogs
    console.log('📝 Seeding blogs...');
    await db.insert(blogs).values(blogData);

    console.log('✅ Database seeded successfully!');
    console.log(`- ${monasteryData.length} monasteries`);
    console.log(`- ${festivalData.length} festivals`);
    console.log(`- ${accommodationData.length} accommodations`);
    console.log(`- ${blogData.length} blog posts`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly (ESM compatible)
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}