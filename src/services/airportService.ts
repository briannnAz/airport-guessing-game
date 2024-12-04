import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export interface Airport {
  id: number;
  iata_code: string;
  name: string;
  city: string;
  country: string;
  wiki_url: string;
}

export const getRandomAirport = async (): Promise<Airport> => {
  const { data, error } = await supabase
    .from('airports')
    .select('*')
    .order('random()')
    .limit(1)
    .single();

  if (error) throw error;
  return data;
};

export const getRandomAirportCodes = async (excludeCode: string, count: number = 4): Promise<string[]> => {
  const { data, error } = await supabase
    .from('airports')
    .select('iata_code')
    .neq('iata_code', excludeCode)
    .order('random()')
    .limit(count);

  if (error) throw error;
  return data.map(airport => airport.iata_code);
};