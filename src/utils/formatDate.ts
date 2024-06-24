export function convertIsoToDate(isoDate: string): string {
    const date = new Date(isoDate);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses são baseados em zero
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };