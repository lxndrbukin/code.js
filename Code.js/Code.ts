// CREATING A CODE ELEMENT

interface CodeElement {
  tag: string;
  attrs?: Object | Object[];
  content?: string | (string | HTMLElement | HTMLElement[])[];
  events?: Object | Object[];
}

function createElement(element: CodeElement): HTMLElement {
  const { tag, content, attrs, events } = element;
  const el = document.createElement(tag);
  if (typeof content === 'string') {
    // const textNode = document.createTextNode(content);
    // el.append(textNode);
    el.innerHTML += content;
  } else if (content instanceof Array) {
    content.map((container) => {
      if (container instanceof HTMLElement) {
        el.append(container);
      } else if (container instanceof Array) {
        container.map((content) => {
          el.append(content);
        });
      } else if (typeof container === 'string') {
        const textNode = document.createTextNode(container);
        el.append(textNode);
      }
    });
  }
  addAttributes(el, attrs);
  addEventListener(el, events);
  return el;
}

function addAttributes(el: HTMLElement, attrs: Object | Object[]) {
  if (attrs && attrs instanceof Array) {
    attrs.map((attr) => {
      el.setAttribute(
        Object.keys(attr)[0] === 'className' ? 'class' : Object.keys(attr)[0],
        attr[Object.keys(attr)[0]]
      );
    });
  }
}

function addEventListener(el: HTMLElement, events: Object | Object[]) {
  if (events) {
    if (events instanceof Array) {
      events.map((event) => {
        el.addEventListener(
          Object.keys(event)[0],
          event[Object.keys(event)[0]]
        );
      });
    } else {
      el.addEventListener(
        Object.keys(events)[0],
        events[Object.keys(events)[0]]
      );
    }
  }
}

// ROUTER AND NAVIGATION

interface RouterPath {
  pathname: string;
  element: HTMLElement;
}

function createRouter(paths: RouterPath[]): HTMLElement[] {
  paths.map((path) => {
    const { pathname, element } = path;
    const events = ['DOMContentLoaded', 'popstate'];
    events.map((event) => {
      window.addEventListener(event, () => {
        if (pathname && pathname === location.pathname) {
          element.style.display = 'block';
        } else if (pathname && pathname !== location.pathname) {
          element.style.display = 'none';
        }
      });
    });
  });
  return paths.map((path) => {
    return path.element;
  });
}

interface NavLinkElement {
  attrs?: Object[];
  content?: string | (HTMLElement | HTMLElement[])[];
  events?: Object[];
}

function createNavLink(element: NavLinkElement): HTMLElement {
  const { attrs, content, events } = element;
  const a = createElement({
    tag: 'a',
    content: content,
    events: events,
    attrs: attrs,
  });
  a.addEventListener('click', (e) => {
    e.preventDefault();
    for (let i = 0; i < attrs.length; i++) {
      if (attrs[i]['href']) {
        history.pushState(
          {},
          attrs[i]['href'],
          location.origin + attrs[i]['href']
        );
      }
    }
  });
  return a;
}

export const Code = {
  createElement,
  createRouter,
  createNavLink,
};

// DOM

function render(appElement: HTMLElement, rootElement: HTMLElement): void {
  rootElement.append(appElement);
}

export const CodeApp = {
  render,
};
