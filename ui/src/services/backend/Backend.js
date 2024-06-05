export function getNumberOfSigns() {
  return fetch('/numsigns')
    .then(res => res.text());
}

export function Search(query) {
  return fetch(`/search?q=${query}`)
    .then(res => res.json());
}

export function getTopics() {
  return fetch('/listtopics')
    .then(res => res.json());
}

export function getSignProfile(id) {
  return fetch(`/sign_profile/${id}`)
    .then(res => res.json());
}





export default {getSignProfile, getNumberOfSigns, getTopics, Search};





