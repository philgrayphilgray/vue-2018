import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      navToggled: false,
      albums: [
        {
          id: '1521567322',
          title: 'Space is the Place',
          artist: 'Sun Ra',
          art:
            'https://upload.wikimedia.org/wikipedia/en/6/6c/Space_Is_The_Place_album_cover.jpg',
          year: '1973',
          rating: 5
        },
        {
          id: '1521567405',
          title: 'Lanquidity',
          artist: 'Sun Ra',
          art: 'https://upload.wikimedia.org/wikipedia/en/2/22/Lanquidity.jpg',
          year: '1978',
          rating: 4
        }
      ]
    },
    getters: {
      getAllAlbums: state => {
        return state.albums;
      },
      findAlbumById: state => albumId => {
        return state.albums.filter(album => album.id === albumId);
      },
      filterBySearchQuery: state => query => {
        return state.albums.filter(album => {
          const re = new RegExp(query, 'gi');
          return album.title.match(re) || album.artist.match(re);
        });
      },
      sortByRating: state => asc => {
        if (asc) {
          return state.albums.sort((a, b) => a.rating - b.rating);
        } else {
          return state.albums.sort(album => album.rating);
        }
      },
      sortByTitle: state => asc => {
        if (asc) {
          return state.albums.sort((a, b) => {
            if (a.title > b.title) {
              return 1;
            }
            if (a.title < b.title) {
              return -1;
            }
            return 0;
          });
        } else {
          return state.albums.sort((a, b) => {
            if (a.title > b.title) {
              return -1;
            }
            if (a.title < b.title) {
              return 1;
            }
            return 0;
          });
        }
      }
    },
    mutations: {
      add(state, newAlbum) {
        state.albums.push(newAlbum);
      },
      remove(state, albumId) {
        state.albums = state.albums.filter(album => album.id !== albumId);
      },
      update(state, updatedAlbum) {
        state.albums = state.albums.filter(
          album => album.id !== updatedAlbum.id
        );
        state.albums.push(updatedAlbum);
      },
      toggleNav(state) {
        state.navToggled = !state.navToggled;
      }
    }
  });
};

export default createStore;
