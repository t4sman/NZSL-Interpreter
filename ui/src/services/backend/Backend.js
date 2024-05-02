export function getNumberOfSigns() {
  return fetch('/numsigns')
    .then(res => res.text());
}

export function search(query) {
  return fetch(`/search?q=${query}`)
    .then(res => res.json());
}

export function getTopics() {
  return fetch('/listtopics')
    .then(res => res.json());
}

export function getSignProfiles() {
  return fetch('/sign_profile')
    .then(res => res.json());
}


