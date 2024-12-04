export const fetchWikipediaData = async (pageTitle: string) => {
  try {
    const contentUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&titles=${pageTitle}&origin=*`;
    const contentResponse = await fetch(contentUrl);
    const contentData = await contentResponse.json();
    const pageId = Object.keys(contentData.query.pages)[0];
    const extract = contentData.query.pages[pageId].extract;

    // Check if it's a commercial airport by looking for key indicators in the extract
    const commercialKeywords = [
      'passenger',
      'airline',
      'terminal',
      'commercial',
      'international'
    ];

    const isCommercial = commercialKeywords.some(keyword => 
      extract.toLowerCase().includes(keyword.toLowerCase())
    );

    if (!isCommercial) {
      throw new Error('Not a commercial airport');
    }

    const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${pageTitle}&pithumbsize=1000&origin=*`;
    const imageResponse = await fetch(imageUrl);
    const imageData = await imageResponse.json();
    const image = imageData.query.pages[pageId].thumbnail?.source || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05';

    // Extract city name from the first sentence of the extract
    const firstSentence = extract.split('.')[0];
    const cityMatch = firstSentence.match(/(?:is\s+(?:an?\s+)?(?:international\s+)?airport\s+(?:serving|in|near)\s+)([^,\.]+)/i);
    const city = cityMatch ? cityMatch[1].trim() : pageTitle.split('_')[0];

    // Extract airport name from the page title and format it
    const name = pageTitle.replace(/_/g, ' ');

    return {
      code: airportData.find(a => a.wiki === pageTitle)?.code || '',
      city: city,
      image: image,
      province: 'Various',
      country: 'Various',
      continent: 'Various',
      name: name,
    };
  } catch (error) {
    console.error('Error fetching Wikipedia data:', error);
    throw error;
  }
};

export const airportData = [
  { code: 'JFK', wiki: 'John_F._Kennedy_International_Airport' },
  { code: 'LHR', wiki: 'Heathrow_Airport' },
  { code: 'CDG', wiki: 'Charles_de_Gaulle_Airport' },
  { code: 'DXB', wiki: 'Dubai_International_Airport' },
  { code: 'HND', wiki: 'Haneda_Airport' },
  { code: 'SIN', wiki: 'Singapore_Changi_Airport' },
  { code: 'LAX', wiki: 'Los_Angeles_International_Airport' },
  { code: 'AMS', wiki: 'Amsterdam_Airport_Schiphol' },
];

export const cityOptions = [
  'New York', 'London', 'Paris', 'Dubai',
  'Tokyo', 'Singapore', 'Los Angeles', 'Amsterdam',
  'Frankfurt', 'Hong Kong', 'Seoul', 'Sydney'
];