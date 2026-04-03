const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const request = async (path, options = {}) => {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, options);
  } catch {
    throw new Error(
      `Unable to reach the backend at ${API_BASE_URL}. Make sure the Express server is running and accessible.`
    );
  }

  if (!response.ok) {
    let message = "Request failed.";

    try {
      const payload = await response.json();
      message = payload.error || message;
    } catch {
      message = response.statusText || message;
    }

    throw new Error(message);
  }

  return response;
};

export const uploadLogFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await request("/upload", {
    method: "POST",
    body: formData
  });

  return response.json();
};

export const getTimeline = async (incidentId) => {
  const response = await request(`/timeline/${incidentId}`);
  return response.json();
};

export const getReportDownloadUrl = (incidentId) => `${API_BASE_URL}/report/${incidentId}`;

export const getReportMarkdown = async (incidentId) => {
  const response = await request(`/report/${incidentId}`);
  return response.text();
};

export const getHealth = async () => {
  const response = await request("/health");
  return response.json();
};
