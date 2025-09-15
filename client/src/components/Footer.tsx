import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Mountain, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ExternalLink,
  Shield,
  Heart
} from 'lucide-react';

interface FooterProps {
  onSubscribeNewsletter: (email: string) => void;
  onContactEmergency: (type: string) => void;
}

const footerLinks = {
  'Quick Links': [
    { label: 'Home', href: '/' },
    { label: 'Monasteries', href: '/monasteries' },
    { label: 'Trip Planner', href: '/trip-planner' },
    { label: 'Cultural Heritage', href: '/culture' },
  ],
  'Travel Info': [
    { label: 'Permits & Documentation', href: '/travel-guide#permits' },
    { label: 'Transportation', href: '/travel-guide#transport' },
    { label: 'Accommodation', href: '/travel-guide#accommodation' },
    { label: 'Weather Guide', href: '/weather' },
  ],
  'Culture & Heritage': [
    { label: 'Festival Calendar', href: '/culture#festivals' },
    { label: 'Local Traditions', href: '/culture#traditions' },
    { label: 'Monastery History', href: '/culture#history' },
    { label: 'Digital Archives', href: '/culture#archives' },
  ],
  'Support': [
    { label: 'Travel Support', href: '/support' },
    { label: 'Emergency Contacts', href: '/emergency' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
  ]
};

const emergencyContacts = [
  { type: 'Tourist Police', number: '1363', icon: Shield },
  { type: 'Emergency Services', number: '108', icon: Phone },
  { type: 'Tourism Helpline', number: '+91-3592-202425', icon: Mail },
];

const socialLinks = [
  { platform: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
  { platform: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
  { platform: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
  { platform: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' },
];

export default function Footer({ onSubscribeNewsletter, onContactEmergency }: FooterProps) {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="container mx-auto px-4">
        {/* Emergency Banner */}
        <div className="py-4 border-b">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-destructive" />
              <span className="font-medium">24/7 Emergency Support</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {emergencyContacts.map((contact) => (
                <button
                  key={contact.type}
                  onClick={() => onContactEmergency(contact.type)}
                  className="flex items-center text-sm hover:text-primary transition-colors"
                  data-testid={`emergency-${contact.type.toLowerCase().replace(' ', '-')}`}
                >
                  <contact.icon className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline mr-1">{contact.type}:</span>
                  <span className="font-medium">{contact.number}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <Mountain className="h-8 w-8 text-primary mr-2" />
                <span className="text-xl font-bold">Sikkim Monasteries</span>
              </div>
              <p className="text-muted-foreground mb-6 pr-4">
                Your comprehensive guide to exploring the sacred monasteries and rich cultural 
                heritage of Sikkim. Discover spiritual journeys, plan meaningful trips, and 
                connect with centuries-old Buddhist traditions.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Button
                    key={social.platform}
                    variant="ghost"
                    size="icon"
                    asChild
                    className={`h-10 w-10 ${social.color}`}
                  >
                    <a 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      data-testid={`social-${social.platform.toLowerCase()}`}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold mb-4">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                        data-testid={`footer-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-b">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>
            <p className="text-muted-foreground mb-4">
              Get updates on new monastery features, festival schedules, and travel tips
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="input-newsletter-email"
              />
              <Button 
                onClick={() => {
                  const email = (document.querySelector('[data-testid="input-newsletter-email"]') as HTMLInputElement)?.value;
                  if (email) onSubscribeNewsletter(email);
                }}
                data-testid="button-subscribe"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
              <p>&copy; 2024 Sikkim Monasteries. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <a href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <Separator orientation="vertical" className="h-4" />
                <a href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
                <Separator orientation="vertical" className="h-4" />
                <a href="/accessibility" className="hover:text-primary transition-colors">
                  Accessibility
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for Sikkim Heritage</span>
              <Badge variant="outline" className="ml-2">
                <ExternalLink className="w-3 h-3 mr-1" />
                Open Source
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}