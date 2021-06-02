<<<<<<< HEAD
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

function dispatch(action: CreatePlaylist | DeletePlaylist | UpdatePlaylist) {
  switch (action.type) {
  case 'create':
    return 'create new playlist';
  case 'update':
    return 'update playlist';
  case 'delete':
    return 'delete playlist';
  }
}
=======
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

function dispatch(action: CreatePlaylist | DeletePlaylist | UpdatePlaylist) {
  switch (action.type) {
  case 'create':
    return 'create new playlist';
  case 'update':
    return 'update playlist';
  case 'delete':
    return 'delete playlist';
  }
}
>>>>>>> bfce3b6188278d24bc8b012453a8836d95c87a6e
