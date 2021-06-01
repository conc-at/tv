// Tagged union types
// 1. Type the argument and return type of the `dispatch` function.

type ActionMethod = CreatePlaylist | DeletePlaylist | UpdatePlaylist;

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

function dispatch(action: ActionMethod) {
  switch (action.type) {
    case 'create':
      return 'create new playlist';
    case 'update':
      return 'update playlist';
    case 'delete':
      return 'delete playlist';
  }
}
