export interface Dealer {
  id: string;
  name: string;
  city: string;
  phone: string;
  email: string;
}

/**
 * Placeholder service for assigning a dealer based on user city and car
 */
export async function assignDealer(city: string, carId: string): Promise<Dealer> {
  console.log(`[Dealer Assignment Placeholder] Assigning dealer for city "${city}" and car "${carId}"`);
  
  // Future implementation:
  // Query dealers table matching city and car brand authorization
  // Return the closest dealer or assign using round-robin algorithm
  
  return {
    id: `dlr-${city.toLowerCase().replace(/[^a-z0-9]/g, '') || 'default'}`,
    name: `Flowzap Certified Dealer (${city})`,
    city: city,
    phone: '+1-800-555-FLOWZAP',
    email: `dealer.${city.toLowerCase().replace(/\s+/g, '')}@flowzap-cars.com`
  };
}
