import BlogSection from '../BlogSection';
import heroImage from '@assets/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png';
import rumtekImage from '@assets/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png';

export default function BlogSectionExample() {
  const mockBlogs = [
    {
      id: '1',
      title: 'A Spiritual Journey Through Rumtek Monastery',
      content: 'Discover the profound spiritual experience of visiting one of Sikkim\'s most significant monasteries. From the early morning prayers echoing through the halls to the intricate Buddhist art adorning every surface, Rumtek offers a window into centuries-old traditions that continue to thrive in the modern world.',
      author: 'Priya Sharma',
      publishedAt: new Date('2024-01-15T00:00:00Z'),
      category: 'experiences',
      image: rumtekImage
    },
    {
      id: '2',
      title: 'Essential Tips for First-Time Visitors to Sikkim Monasteries',
      content: 'Planning your first monastery visit in Sikkim? This comprehensive guide covers everything from dress codes and photography etiquette to the best times for visits and how to participate respectfully in prayer ceremonies. Learn about the cultural significance and practical considerations for a meaningful experience.',
      author: 'David Chen',
      publishedAt: new Date('2024-01-20T00:00:00Z'),
      category: 'travel-tips',
      image: heroImage
    },
    {
      id: '3',
      title: 'Understanding Buddhist Festivals in Sikkim',
      content: 'Explore the rich tapestry of Buddhist festivals celebrated throughout Sikkim. From the colorful masked dances of Losar to the sacred significance of Saga Dawa, each festival offers unique insights into Tibetan Buddhist culture and provides visitors with unforgettable experiences.',
      author: 'Tenzin Norbu',
      publishedAt: new Date('2024-01-25T00:00:00Z'),
      category: 'culture',
      image: rumtekImage
    },
    {
      id: '4',
      title: 'Photography Guide: Capturing the Beauty of Himalayan Monasteries',
      content: 'Learn the art of monastery photography while respecting sacred spaces. This guide covers camera settings for low-light interiors, composition techniques for architectural details, and the ethics of photographing religious ceremonies and practitioners.',
      author: 'Sarah Miller',
      publishedAt: new Date('2024-02-01T00:00:00Z'),
      category: 'guides',
      image: heroImage
    }
  ];

  const featuredBlog = mockBlogs[0];

  return (
    <BlogSection
      blogs={mockBlogs}
      onReadMore={(blog) => console.log('Read more about:', blog.title)}
      featuredBlog={featuredBlog}
    />
  );
}