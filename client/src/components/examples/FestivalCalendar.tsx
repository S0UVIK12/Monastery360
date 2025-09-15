import { useState } from 'react';
import FestivalCalendar from '../FestivalCalendar';
import { Festival } from '@shared/schema';

export default function FestivalCalendarExample() {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);

  const mockFestivals = [
    {
      id: '1',
      name: 'Losar',
      date: 'February 2024',
      description: 'Tibetan New Year celebrated with traditional dances, prayers, and colorful decorations across all monasteries.',
      monastery: 'Rumtek Monastery',
      significance: 'New Year Celebration'
    },
    {
      id: '2',
      name: 'Pang Lhabsol',
      date: 'August 2024',
      description: 'A unique festival celebrating Mount Khangchendzonga, with warrior dances and traditional ceremonies.',
      monastery: 'Enchey Monastery',
      significance: 'Mountain Guardian Festival'
    },
    {
      id: '3',
      name: 'Saga Dawa',
      date: 'May 2024',
      description: 'Sacred month commemorating Buddha\'s birth, enlightenment, and nirvana with prayers and rituals.',
      monastery: 'Pemayangtse Monastery',
      significance: 'Buddha Day'
    },
    {
      id: '4',
      name: 'Drupka Teshi',
      date: 'July 2024',
      description: 'Celebrates Buddha\'s first sermon with special prayers and traditional performances.',
      monastery: 'Tashiding Monastery',
      significance: 'First Sermon Day'
    },
    {
      id: '5',
      name: 'Dasain',
      date: 'October 2024',
      description: 'Hindu festival celebrating the victory of good over evil, widely celebrated across Sikkim.',
      monastery: 'Local Communities',
      significance: 'Victory Festival'
    }
  ];

  return (
    <FestivalCalendar
      festivals={mockFestivals}
      onFestivalSelect={(festival) => {
        setSelectedFestival(festival);
        console.log('Selected festival:', festival.name);
      }}
      selectedMonth="February"
    />
  );
}