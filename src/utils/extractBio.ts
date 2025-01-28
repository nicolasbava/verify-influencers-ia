export function extractBiography(text : string) {
  // Dividir el texto en dos partes usando "**Claims**"
  const biography = text.split("**Claims**")[0]?.trim();
  
  if (!biography) {
    console.error("No biography found in the text.");
    return "";
  }

  return biography;
}