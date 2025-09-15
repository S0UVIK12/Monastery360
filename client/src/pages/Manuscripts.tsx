import { useLocation } from 'wouter';
import { Badge } from '@/components/ui/badge';

const manuscripts = [
  {
    id: '1',
    title: 'Palm-leaf Buddhist Manuscript',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Buddhist_Manuscript%2C_Nepal%2C_11th_century_AD%2C_Palm-leaf%2C_Sanskrit_in_Nepalese_script%2C_British_Museum.jpg/320px-Buddhist_Manuscript%2C_Nepal%2C_11th_century_AD%2C_Palm-leaf%2C_Sanskrit_in_Nepalese_script%2C_British_Museum.jpg',
    summary: 'An 11th-century palm-leaf manuscript in Sanskrit, preserved in a Himalayan monastery. Contains sacred Buddhist texts and prayers.'
  },
  {
    id: '2',
    title: 'Tibetan Illuminated Manuscript',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Tibetan_Illuminated_Manuscript.jpg/320px-Tibetan_Illuminated_Manuscript.jpg',
    summary: 'A beautifully illustrated Tibetan manuscript featuring Buddhist iconography and teachings, dating to the 14th century.'
  }
];

export default function Manuscripts() {
  const [, navigate] = useLocation();
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Manuscript Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {manuscripts.map((m) => (
          <button
            key={m.id}
            className="bg-background rounded-lg shadow p-6 flex flex-col items-start hover:bg-accent/30 transition cursor-pointer text-left"
            onClick={() => navigate(`/manuscripts/${m.id}`)}
            aria-label={`View ${m.title}`}
          >
            <img src={m.image} alt={m.title} className="w-full h-40 object-cover rounded mb-4" />
            <h2 className="text-xl font-semibold mb-2">{m.title}</h2>
            <p className="text-muted-foreground mb-2 text-sm">{m.summary}</p>
            <Badge variant="outline">View Details</Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
