import { useLocation, useParams } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ManuscriptDetail() {
  const params = useParams();
  const [, navigate] = useLocation();

  // Only show manuscript if id is '1', else show empty state
  let manuscript = null;
  if (params.id === '1') {
    manuscript = {
      id: '1',
      title: 'Palm-leaf Buddhist Manuscript',
      image: '/generated_images/1.jpeg',
      description: 'An 11th-century palm-leaf manuscript in Sanskrit, preserved in a Himalayan monastery. Such manuscripts contain sacred Buddhist texts, prayers, and teachings. The intricate script and preservation techniques reflect the region’s deep spiritual and scholarly traditions.',
      details: 'This manuscript is written in Nepalese script and is a rare example of early Buddhist literature. The palm leaves are carefully inscribed and bound together, often wrapped in cloth for protection. These documents are invaluable for understanding the transmission of Buddhist philosophy and ritual across the Himalayas.'
    };
  } else if (params.id === '2') {
    manuscript = {
      id: '2',
      title: 'Tibetan Illuminated Manuscript',
      image: '/generated_images/2.jpeg',
      description: 'A beautifully illustrated Tibetan manuscript featuring Buddhist iconography and teachings, dating to the 14th century.',
      details: 'This manuscript showcases intricate Buddhist art and calligraphy, reflecting the spiritual and artistic traditions of Tibetan culture. Illuminated manuscripts like this are treasured for their historical and religious significance.'
    };
  }

  if (!manuscript) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h2 className="text-2xl font-bold mb-4">No manuscript is present right now.</h2>
        <Button variant="outline" onClick={() => navigate('/manuscripts')}>Back to Manuscripts</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <Button variant="outline" className="mb-6" onClick={() => navigate('/manuscripts')}>← Back to Manuscripts</Button>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <img src={manuscript.image} alt={manuscript.title} className="w-full md:w-1/2 h-80 object-cover rounded-lg" />
        <div className="flex-1">
          <Badge variant="secondary" className="mb-2">Sanskrit • 11th Century</Badge>
          <h1 className="text-3xl font-bold mb-4">{manuscript.title}</h1>
          <p className="mb-4 text-muted-foreground text-lg">{manuscript.description}</p>
          <div className="text-base leading-7">{manuscript.details}</div>
        </div>
      </div>
    </div>
  );
}
