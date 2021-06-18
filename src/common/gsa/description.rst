The Greenbone Security Assistant (GSA) sources consist of two parts. A web
server named gsad and the actual web application GSA. The web server gsad is
written in the C programming language. It serves static content like images and
provides an API for the web application. Internally it talks with gvmd using
:term:`GMP`. The web application is written in JavaScript and uses the
`react framework <https://reactjs.org/>`_. It requires
`nodejs <https://nodejs.org/>`_ for building the application and yarn (or npm)
for maintaining the JavaScript dependencies.
