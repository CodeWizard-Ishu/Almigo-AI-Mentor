import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Send a contact form submission.
 * Uses a standalone axios instance (no auth headers needed — public route).
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ContactResponse> {
  const response = await axios.post<ContactResponse>(
    `${API_BASE_URL}/api/contact`,
    data,
    {
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    }
  );
  return response.data;
}
