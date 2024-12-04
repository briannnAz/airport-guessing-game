export const fetchWikipediaData = async (pageTitle: string) => {
  try {
    const contentUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&titles=${pageTitle}&origin=*`;
    const contentResponse = await fetch(contentUrl);
    const contentData = await contentResponse.json();
    const pageId = Object.keys(contentData.query.pages)[0];
    const extract = contentData.query.pages[pageId].extract;

    const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${pageTitle}&pithumbsize=1000&origin=*`;
    const imageResponse = await fetch(imageUrl);
    const imageData = await imageResponse.json();
    const image = imageData.query.pages[pageId].thumbnail?.source || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05';

    const cityMapping: { [key: string]: string } = {
      'John_F._Kennedy_International_Airport': 'New York',
      'Heathrow_Airport': 'London',
      'Charles_de_Gaulle_Airport': 'Paris',
      'Dubai_International_Airport': 'Dubai',
      'Haneda_Airport': 'Tokyo',
      'Singapore_Changi_Airport': 'Singapore',
      'Los_Angeles_International_Airport': 'Los Angeles',
      'Amsterdam_Airport_Schiphol': 'Amsterdam',
    };

    return {
      code: airportData.find(a => a.wiki === pageTitle)?.code || '',
      city: cityMapping[pageTitle] || '',
      image: image,
      province: 'Various',
      country: 'Various',
      continent: 'Various',
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