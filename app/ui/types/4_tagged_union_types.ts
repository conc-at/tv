// Tagged union types
// 1. Type the argument and return type of the `dispatch` function.

type CreatePlaylist = {
  type: 'create';
  name: string;
};

type DeletePlaylist = {
  type: 'delete';
};

type UpdatePlaylist = {
  type: 'update';
  name: string;
};

type Playlist = CreatePlaylist | UpdatePlaylist | DeletePlaylist;

function dispatch(action: Playlist): Playlist {
  switch (action.type) {
    case 'create':
      return { type: 'create', name: 'asdf' };
    case 'update':
      return { type: 'update', name: 'asdf2' };
    case 'delete':
      return { type: 'delete' };
  }
}
