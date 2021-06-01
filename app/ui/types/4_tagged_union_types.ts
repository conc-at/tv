// Tagged union types
// 1. Type the argument and return type of the `dispatch` function.

type CreatePlaylist = {
  type: 'create';
  name: string;
}

type DeletePlaylist = {
  type: 'delete';
}

type UpdatePlaylist = {
  type: 'update';
  name: string;
}

type PlaylistAction = CreatePlaylist | DeletePlaylist | UpdatePlaylist;

function dispatch(action: PlaylistAction) {
  switch (action.type) {
    case 'create':
      return 'create new playlist'
    case 'update':
      return 'update playlist'
    case 'delete':
      return 'delete playlist'
  }
}