
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

    // Get airport details from the database
    const airportInfo = airportData.find(a => a.wiki === pageTitle);
    
    // Get more accurate location data from our airport database
    if (airportInfo && airportInfo.locationData) {
      return {
        code: airportInfo.code || '',
        city: city,
        image: image,
        province: airportInfo.locationData.province || 'Unknown',
        country: airportInfo.locationData.country || 'Unknown',
        continent: airportInfo.locationData.continent || 'Unknown',
        name: name,
      };
    }

    return {
      code: airportInfo?.code || '',
      city: city,
      image: image,
      province: 'Unknown',
      country: airportInfo?.country || 'Unknown',
      continent: airportInfo?.continent || 'Unknown',
      name: name,
    };
  } catch (error) {
    console.error('Error fetching Wikipedia data:', error);
    throw error;
  }
};

export const airportData = [
  { 
    code: 'JFK', 
    wiki: 'John_F._Kennedy_International_Airport', 
    country: 'United States',
    continent: 'North America',
    locationData: { province: 'New York', country: 'United States', continent: 'North America' }
  },
  { 
    code: 'LHR', 
    wiki: 'Heathrow_Airport', 
    country: 'United Kingdom',
    continent: 'Europe',
    locationData: { province: 'England', country: 'United Kingdom', continent: 'Europe' }
  },
  { 
    code: 'CDG', 
    wiki: 'Charles_de_Gaulle_Airport', 
    country: 'France',
    continent: 'Europe',
    locationData: { province: 'Île-de-France', country: 'France', continent: 'Europe' }
  },
  { 
    code: 'DXB', 
    wiki: 'Dubai_International_Airport', 
    country: 'United Arab Emirates',
    continent: 'Asia',
    locationData: { province: 'Dubai', country: 'United Arab Emirates', continent: 'Asia' }
  },
  { 
    code: 'HND', 
    wiki: 'Haneda_Airport', 
    country: 'Japan',
    continent: 'Asia',
    locationData: { province: 'Tokyo', country: 'Japan', continent: 'Asia' }
  },
  { 
    code: 'SIN', 
    wiki: 'Singapore_Changi_Airport', 
    country: 'Singapore',
    continent: 'Asia',
    locationData: { province: 'Singapore', country: 'Singapore', continent: 'Asia' }
  },
  { 
    code: 'LAX', 
    wiki: 'Los_Angeles_International_Airport', 
    country: 'United States',
    continent: 'North America',
    locationData: { province: 'California', country: 'United States', continent: 'North America' }
  },
  { 
    code: 'AMS', 
    wiki: 'Amsterdam_Airport_Schiphol', 
    country: 'Netherlands',
    continent: 'Europe',
    locationData: { province: 'North Holland', country: 'Netherlands', continent: 'Europe' }
  },
];

export const cityOptions = [
  'New York', 'London', 'Paris', 'Dubai',
  'Tokyo', 'Singapore', 'Los Angeles', 'Amsterdam',
  'Frankfurt', 'Hong Kong', 'Seoul', 'Sydney'
];
