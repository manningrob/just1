const FORM_ID = '1FAIpQLSeD2NZH41GHxPPaGiwfP0esT8iVfjqtbzygIU-mx-7yon--NQ';

interface FormData {
  'entry.1413634810': string; // design prompt
  'entry.1492333111': string; // name
  'entry.1358412767': string; // email
}

export async function submitToGoogleForm(data: FormData): Promise<Response> {
  const formUrl = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
  
  const formBody = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    formBody.append(key, value);
  });

  return fetch(formUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  });
}