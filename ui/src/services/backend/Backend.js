const backend = {
  getNumberOfSigns() {
    return fetch('/numsigns').then(res => res.text());
  },

  Search(query) {
    return fetch(`/search?q=${query}`).then(res => res.json());
  },

  getTopics() {
    return fetch('/listtopics').then(res => res.json());
  },

  getSignProfile(id) {
    return fetch(`/sign_profile/${id}`).then(res => res.json());
  },

  saveLearnVideo(videoInfo) {
    return fetch('/save-learn-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoInfo }),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to save learn video information');
      }
      return res.json();
    });
  },

  saveLearntVideo(videoInfo) {
    return fetch('/save-learnt-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoInfo }),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to save learnt video information');
      }
      return res.json();
    });
  }
};

export default backend;
