export function generateUUID() {
    return () => {
      const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
      return template.replace(/[xy]/g, (char) => {
        const random = Math.random() * 16 | 0;
        const value = char === 'x' ? random : (random & 0x3) | 0x8;
        return value.toString(16);
      });
    };
  }
  