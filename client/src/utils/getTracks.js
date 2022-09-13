
const getTrack = (data) => {
  if (data) {
    return {
      iconUrl: `/images/coat-of-arms/${data.house}.png`,
      iconSize: [70, 70],
      coordinate: [data.x, data.y],
      title: `Name: ${data.hero}, House: ${data.house}`,
      hero: data.hero,
    };
  }

  return null;
};

export default getTrack;
