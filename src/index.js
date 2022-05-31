import { Code, CodeApp } from '../Code.js/Code';

const links = [
  { linkname: 'Homepage', pathname: '/' },
  { linkname: 'About us', pathname: '/about' },
  { linkname: 'Contacts', pathname: '/contacts' },
];

const NavMenu = () => {
  return links.map((link) => {
    return Code.createNavLink({
      content: link.linkname,
      attrs: [
        { href: link.pathname }, 
        { style: 'padding: 5px' }
      ],
    });
  });
};

const Header = () => {
  return Code.createElement({
    tag: 'h3',
    content: 'Header',
    attrs: { className: 'header' },
    events: [
      { click: () => console.log('hahaha') },
      { mouseover: () => console.log('hohoho') },
    ],
  });
};

const Footer = () => {
  return Code.createElement({
    tag: 'div',
    content: `Footer ${Header()}`,
    attrs: { className: 'footer' },
  });
};

const Routes = Code.createRouter([{ pathname: '/', element: Header() }]);

const App = Code.createElement({
  tag: 'div',
  content: [NavMenu(), Routes, '<h4>Div</h4>', Footer()],
  attrs: [
    { id: 'hi' }, 
    { className: 'hello' }
  ],
});

CodeApp.render(App, document.querySelector('#root'));
