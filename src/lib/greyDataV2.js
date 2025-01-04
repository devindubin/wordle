export const characters = [{}];

export const generateCharacter = () => {
  return characters[Math.floor(Math.random() * characters.length)];
};

export const dataSourceCount = characters.length;
