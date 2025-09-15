import { useParams, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

export default function BlogDetail() {
  const params = useParams();
  const [, navigate] = useLocation();

  // Mock blog content for demo; wire to API later
  const blog = {
    id: params.id,
    title: 'A Spiritual Journey Through Rumtek Monastery',
    author: 'Priya Sharma',
    publishedAt: new Date('2024-01-15T00:00:00Z'),
    content:
      "Discover the profound spiritual experience of visiting Rumtek. From early morning prayers to intricate Buddhist art, Rumtek offers a window into centuries-old traditions.",
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <Button variant="outline" className="mb-6" onClick={() => navigate('/')}>← Back</Button>
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <div className="text-sm text-muted-foreground mb-6">
        By {blog.author} · {blog.publishedAt.toLocaleDateString()}
      </div>
      <p className="leading-7 text-lg">{blog.content}</p>
    </div>
  );
}
