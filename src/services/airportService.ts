import airportsData from '../data/airports.json';

export interface Airport {
  id?: number;
  iata_code: string;
  name: string;
  city: string;
  country: string;
  location: {
    latitude: number;
    longitude: number;
  };
  wiki_url: string;
}

export const getRandomAirport = async (): Promise<Airport> => {
  const airports = airportsData.airports;
  const randomIndex = Math.floor(Math.random() * airports.length);
  return airports[randomIndex];
};

export const getRandomAirportCodes = async (excludeCode: string, count: number = 4): Promise<string[]> => {
  const airports = airportsData.airports
    .filter(airport => airport.iata_code !== excludeCode)
    .map(airport => airport.iata_code);
  
  const result: string[] = [];
  const tempAirports = [...airports];
  
  while (result.length < count && tempAirports.length > 0) {
    const randomIndex = Math.floor(Math.random() * tempAirports.length);
    result.push(tempAirports[randomIndex]);
    tempAirports.splice(randomIndex, 1);
  }
  
  return result;
};