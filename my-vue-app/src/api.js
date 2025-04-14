import axios from 'axios'

const BASE_URL = 'http://localhost:8000' // Adjust to match your backend

/**
 * Example: Generate docs based on job link & cover letter choice
 */
export async function generateDocs(jobLink, includeCoverLetter) {
  try {
    const response = await axios.post(`${BASE_URL}/api/generate`, {
      jobLink,
      includeCoverLetter,
    })
    return response.data
  } catch (error) {
    console.error('Error generating docs:', error)
    throw error
  }
}