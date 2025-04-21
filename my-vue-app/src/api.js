import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Adjust to match your backend

/**
 * Updated: Generate docs based on the entire variables_fp object
 */
export async function generateDocs(variables_fp) {
  try {
    // POST the entire variables_fp to your backend
    const response = await axios.post(`${BASE_URL}/api/generate`, variables_fp);
    return response.data;
  } catch (error) {
    console.error('Error generating docs:', error);
    throw error;
  }
}
