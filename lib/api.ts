const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface House {
  id?: number;
  slug: string;
  image: string;
  images: string[];
  title: string;
  description: string;
  location?: string;
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
  hasPool?: boolean;
  isFurnished?: boolean;
  status?: string;
  style?: string;
  yearDelivery?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FilterParams {
  location?: string;
  minArea?: string;
  bedrooms?: string;
  bathrooms?: string;
  hasPool?: string;
  isFurnished?: string;
  status?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface HousesResponse {
  data: House[];
  pagination: PaginationMeta;
}

export async function getHouses(filters?: FilterParams, page: number = 1): Promise<HousesResponse> {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('page', String(page));

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'Todas') queryParams.append(key, value);
      });
    }

    const url = `${API_URL}/api/houses?${queryParams.toString()}`;
    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch houses');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching houses:', error);
    return { data: [], pagination: { page: 1, limit: 12, total: 0, totalPages: 0 } };
  }
}

export async function getHouseBySlug(slug: string): Promise<House | null> {
  try {
    const response = await fetch(`${API_URL}/api/houses/${slug}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching house:', error);
    return null;
  }
}

export async function getAllHouses(): Promise<House[]> {
  try {
    const response = await fetch(`${API_URL}/api/houses?limit=1000`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch all houses');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching all houses:', error);
    return [];
  }
}

export async function createHouse(
  data: Omit<House, 'id' | 'createdAt' | 'updatedAt'>
): Promise<House> {
  try {
    const response = await fetch(`${API_URL}/api/houses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let error;
      try {
        error = await response.json();
      } catch (e) {
        error = { error: `HTTP ${response.status}: ${response.statusText}` };
      }
      throw new Error(error.error || 'Failed to create house');
    }

    return response.json();
  } catch (error) {
    console.error('Error creating house:', error);
    throw error;
  }
}

export async function updateHouse(
  slug: string,
  data: Partial<Omit<House, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<House> {
  try {
    const response = await fetch(`${API_URL}/api/houses/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let error;
      try {
        error = await response.json();
      } catch (e) {
        error = { error: `HTTP ${response.status}: ${response.statusText}` };
      }
      throw new Error(error.error || 'Failed to update house');
    }

    return response.json();
  } catch (error) {
    console.error('Error updating house:', error);
    throw error;
  }
}

export async function deleteHouse(slug: string): Promise<{ success: boolean }> {
  try {
    const response = await fetch(`${API_URL}/api/houses/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete house');
    }

    return response.json();
  } catch (error) {
    console.error('Error deleting house:', error);
    throw error;
  }
}

export async function isSlugAvailable(slug: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/api/houses/${slug}`, {
      cache: 'no-store',
    });
    return !response.ok;
  } catch (error) {
    console.error('Error checking slug availability:', error);
    return true;
  }
}

export async function submitContact(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }

    return response.json();
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}
