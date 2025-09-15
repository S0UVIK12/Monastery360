import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  FileText, 
  Car, 
  Bed, 
  Shield, 
  Clock, 
  MapPin, 
  Phone, 
  AlertTriangle,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface TravelEssentialsProps {
  onBookAccommodation?: (type: string) => void;
  onApplyPermit?: (permitType: string) => void;
}

const permits = [
  {
    type: 'ILP',
    fullName: 'Inner Line Permit',
    description: 'Required for all non-Sikkimese Indians visiting protected areas',
    validity: '15 days (extendable)',
    cost: '₹50',
    requiredFor: ['Tsomgo Lake', 'Nathula Pass', 'Gurudongmar Lake'],
    documents: ['Valid ID proof', ' 2 passport photos', 'Application form'],
    processingTime: '1-3 days'
  },
  {
    type: 'RAP',
    fullName: 'Restricted Area Permit',
    description: 'For foreigners visiting border areas and restricted zones',
    validity: '7-30 days',
    cost: '$10-50',
    requiredFor: ['Tsomgo Lake', 'Nathula Pass', 'North Sikkim'],
    documents: ['Passport', 'Visa', '4 passport photos', 'Travel itinerary'],
    processingTime: '3-7 days'
  },
  {
    type: 'PAP',
    fullName: 'Protected Area Permit',
    description: 'Special permit for sensitive border areas',
    validity: '7-15 days',
    cost: 'Variable',
    requiredFor: ['Nathu La Pass', 'Jelep La Pass', 'Cho Lhamo Lake'],
    documents: ['Valid permits', 'Security clearance', 'Guide arrangement'],
    processingTime: '7-14 days'
  }
];

const transportOptions = [
  {
    type: 'Shared Jeep',
    description: 'Most common and economical option',
    routes: ['Gangtok-Rumtek', 'Gangtok-Tsomgo Lake', 'Pelling-Yuksom'],
    cost: '₹50-200 per person',
    duration: '30 mins - 3 hours',
    pros: ['Affordable', 'Frequent service', 'Local experience'],
    cons: ['Can be crowded', 'Fixed timings']
  },
  {
    type: 'Private Taxi',
    description: 'Comfortable and flexible travel option',
    routes: ['Any destination', 'Custom itineraries', 'Airport transfers'],
    cost: '₹2000-5000 per day',
    duration: 'Flexible',
    pros: ['Comfort', 'Flexibility', 'Privacy'],
    cons: ['Higher cost', 'Need advance booking']
  },
  {
    type: 'Public Bus',
    description: 'Budget-friendly for longer routes',
    routes: ['Gangtok-Darjeeling', 'Gangtok-Kalimpong', 'Inter-state travel'],
    cost: '₹30-150',
    duration: '2-8 hours',
    pros: ['Very cheap', 'Regular service'],
    cons: ['Slower', 'Limited monastery access']
  }
];

const accommodationTypes = [
  {
    type: 'Hotels',
    priceRange: '₹1500-8000/night',
    features: ['Modern amenities', 'Room service', 'Tourist facilities'],
    bestFor: 'Comfort seekers',
    examples: ['Mayfair Spa Resort', 'WelcomHotel Denzong']
  },
  {
    type: 'Homestays',
    priceRange: '₹800-2500/night',
    features: ['Local experience', 'Home-cooked meals', 'Cultural immersion'],
    bestFor: 'Cultural enthusiasts',
    examples: ['Traditional Lepcha homes', 'Monastery guesthouses']
  },
  {
    type: 'Eco-lodges',
    priceRange: '₹2000-4000/night',
    features: ['Sustainable practices', 'Nature proximity', 'Unique experiences'],
    bestFor: 'Nature lovers',
    examples: ['Forest rest houses', 'Mountain eco-resorts']
  }
];

export default function TravelEssentials({ onBookAccommodation, onApplyPermit }: TravelEssentialsProps) {
  return (
    <div className="space-y-8">
      {/* Permits Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center mb-2">
            <FileText className="w-6 h-6 mr-2" />
            Permits & Documentation
          </h2>
          <p className="text-muted-foreground">
            Essential permits required for visiting Sikkim's monasteries and protected areas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {permits.map((permit) => (
            <Card key={permit.type} className="hover-elevate">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{permit.type}</CardTitle>
                  <Badge variant="outline">{permit.cost}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{permit.fullName}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{permit.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Valid for: {permit.validity}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Shield className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Processing: {permit.processingTime}</span>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="details" className="border-none">
                    <AccordionTrigger className="text-sm py-2">
                      View Requirements
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div>
                        <h5 className="font-medium text-sm mb-2">Required For:</h5>
                        <div className="space-y-1">
                          {permit.requiredFor.map((place, index) => (
                            <div key={index} className="flex items-center text-xs">
                              <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                              {place}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm mb-2">Documents:</h5>
                        <div className="space-y-1">
                          {permit.documents.map((doc, index) => (
                            <div key={index} className="flex items-center text-xs">
                              <FileText className="w-3 h-3 mr-2 text-muted-foreground" />
                              {doc}
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button 
                  className="w-full" 
                  onClick={() => onApplyPermit?.(permit.type)}
                  data-testid={`apply-permit-${permit.type.toLowerCase()}`}
                >
                  Apply for {permit.type}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Transport Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center mb-2">
            <Car className="w-6 h-6 mr-2" />
            Transportation Options
          </h2>
          <p className="text-muted-foreground">
            Various transport modes to reach monasteries and explore Sikkim
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {transportOptions.map((transport, index) => (
            <Card key={index} className="hover-elevate">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Car className="w-5 h-5 mr-2" />
                  {transport.type}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{transport.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Cost:</span>
                  <Badge variant="secondary">{transport.cost}</Badge>
                </div>

                <div>
                  <h5 className="font-medium text-sm mb-2">Popular Routes:</h5>
                  <div className="space-y-1">
                    {transport.routes.slice(0, 3).map((route, idx) => (
                      <div key={idx} className="flex items-center text-xs">
                        <MapPin className="w-3 h-3 mr-2 text-muted-foreground" />
                        {route}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h6 className="text-xs font-medium text-green-600 mb-1">Pros:</h6>
                    {transport.pros.map((pro, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground">
                        • {pro}
                      </div>
                    ))}
                  </div>
                  <div>
                    <h6 className="text-xs font-medium text-orange-600 mb-1">Cons:</h6>
                    {transport.cons.map((con, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground">
                        • {con}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Accommodation Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center mb-2">
            <Bed className="w-6 h-6 mr-2" />
            Accommodation Options
          </h2>
          <p className="text-muted-foreground">
            Choose from hotels, homestays, and eco-lodges near monasteries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accommodationTypes.map((accommodation, index) => (
            <Card key={index} className="hover-elevate">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  {accommodation.type}
                  <Badge variant="outline">{accommodation.priceRange}</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Best for: {accommodation.bestFor}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h5 className="font-medium text-sm mb-2">Features:</h5>
                  <div className="space-y-1">
                    {accommodation.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-sm mb-2">Examples:</h5>
                  <div className="space-y-1">
                    {accommodation.examples.map((example, idx) => (
                      <div key={idx} className="text-sm text-muted-foreground">
                        • {example}
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onBookAccommodation?.(accommodation.type)}
                  data-testid={`book-${accommodation.type.toLowerCase()}`}
                >
                  View {accommodation.type}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Emergency Information */}
      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-800 dark:text-orange-400">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Emergency Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h5 className="font-medium text-sm mb-2">Emergency Services</h5>
            <div className="space-y-1 text-sm">
              <div className="flex items-center">
                <Phone className="w-3 h-3 mr-2" />
                Police: 100
              </div>
              <div className="flex items-center">
                <Phone className="w-3 h-3 mr-2" />
                Medical: 108
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-sm mb-2">Tourist Helpline</h5>
            <div className="space-y-1 text-sm">
              <div className="flex items-center">
                <Phone className="w-3 h-3 mr-2" />
                Sikkim Tourism: 1363
              </div>
              <div className="flex items-center">
                <Phone className="w-3 h-3 mr-2" />
                24/7 Support: +91-3592-202425
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-medium text-sm mb-2">Medical Facilities</h5>
            <div className="space-y-1 text-sm">
              <div>STNM Hospital, Gangtok</div>
              <div>District Hospital, Namchi</div>
            </div>
          </div>

          <div>
            <h5 className="font-medium text-sm mb-2">Important Contacts</h5>
            <div className="space-y-1 text-sm">
              <div>Tourism Dept: 03592-202434</div>
              <div>Transport Dept: 03592-202438</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}