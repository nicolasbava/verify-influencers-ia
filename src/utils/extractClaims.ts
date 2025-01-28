export function extractClaims(text : string) {
    // Buscar la sección donde comienzan los "Claims"
    const claimsSection = text.split("**Claims**:")[1]?.trim();
    if (!claimsSection) {
      console.error("No claims found in the text.");
      return [];
    }

    const claimsArray = claimsSection.split("-").slice(1);

    const claimsObjects = claimsArray.map((claim, index) => {
      const cleanedClaim = claim.replace(/\[\d+\]/g, "").trim();
  
      return {
        id: index + 1,
        verified: false, 
        claim: cleanedClaim, 
        trueScore: 0, 
      };
    });
  
    return claimsObjects;
}