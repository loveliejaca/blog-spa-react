export const routes = {
  home                : '/',
  postCreate          : '/create-post',
  post                : '/post/:id',
  postEdit            : '/post/:id/edit',
  pageNotFound        : '/page-not-found'
}

export const route = (r, data) => {
  let paths = r.split('/');

  paths.forEach((path, i) => {
    if (path.charAt(0) === ':') {
      paths[i] = data[path.replace(':', '')];
    }
  });

  return paths.join('/');
}
