const listeners = new Set();

let route = { page: 'splash', game: null };

export function navigate(page, game = null) {
  route = { page, game };
  document.body.style.overflow = '';
  window.scrollTo(0, 0);
  listeners.forEach((fn) => fn(route));
}

export function getRoute() {
  return route;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}