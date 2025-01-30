import { Claim } from "../interfaces/Research";

export const formatRevenue = (revenue: number): string => {
    if (revenue >= 1_000_000) {
      return (revenue / 1_000_000).toFixed(1) + 'M';
    } else if (revenue >= 1_000) {
      return (revenue / 1_000).toFixed(1) + 'k';
    } else {
      return revenue.toString();
    }
};

export const calculateTotalTrustScore = (claims: Claim[]): number => {
    if (claims.length === 0) return 0;
    const totalTrustScore = claims.reduce((acc, claim) => acc + claim.trustScore, 0);
    return totalTrustScore / claims.length;
};

export const getUniqueCategories = (claims: Claim[]): string[] => {
    const categories = claims.map(claim => claim.category);
    
    const uniqueCategories = [...new Set(categories)];
    
    return uniqueCategories.slice(0, 10);
};

export const getStatusColor = (number: number): string => {
    if (number >= 90 && number <= 100) {
      return '#34d097';
    } else if (number >= 33 && number < 89) {
      return '#f7ca14';
    } else if (number >= 0 && number < 33) {
      return '#f23838';
    }
    return '';
};