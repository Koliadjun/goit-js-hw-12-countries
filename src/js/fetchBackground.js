export default function fetchBackground(searchQuery) {
    return fetch(`https://pixabay.com/api/?key=21859893-eed1f1d786560e2667ad1f26b&q=${searchQuery}&orientation=horizontal&category=buildings&image_type=photo&pretty=true`).then(r => r.json());
};