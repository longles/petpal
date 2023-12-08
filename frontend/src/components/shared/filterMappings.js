export const statusOptions = ['Any', 'Adopted', 'Available'];
export const breedOptions = ['Any', 'Ragdoll', 'Labrador', 'Parrot'];
export const sizeOptions = ['Any', 'Small', 'Medium', 'Large'];
export const colourOptions = ['Any', 'Yellow', 'Black', 'White', 'Brown', 'Grey', 'Red', 'Blue', 'Green'];
export const sexOptions = ['Any', 'Male', 'Female'];

export const filterValueMap = {
  status: {
    adopted: 1,
    available: 2,
  },
  sex: {
    unknown: 0,
    male: 1,
    female: 2,
  },
  size: {
    large: 1,
    medium: 2,
    small: 3,
  },
  colour: {
    unknown: 0,
    yellow: 1,
    black: 2,
    white: 3,
    brown: 4,
    grey: 5,
    red: 6,
    blue: 7,
    green: 8,
  },
  species: {
    unknown: 0,
    dog: 1,
    cat: 2,
    bird: 3,
  },
  breed: {
    unknown: '0',
    ragdoll: '1',
    labrador: '2',
    parrot: '3',
  },
};