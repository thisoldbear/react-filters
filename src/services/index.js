const fetchAlbums = () =>
  fetch('data/data.json')
    .then(data => data.json())
    .then(({ results }) => results);

export { fetchAlbums };
