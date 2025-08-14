![Greenbone Logo](https://www.greenbone.net/wp-content/uploads/greenbone-logo-2025-300x77.png)

# Documentation for the Greenbone Community Edition

The documentation is build automatically via GitHub Actions and available at
[https://greenbone.github.io/docs/](https://greenbone.github.io/docs/)

## Requirements

For a manual build locally Python >= 3.9 and [uv] is required.

## Install uv

The project requires [uv]. See [https://docs.astral.sh/uv/getting-started/installation/](https://docs.astral.sh/uv/getting-started/installation/)
for detailed instructions for installing uv.

A simple method to install uv is to use [pipx]. pipx can be installed with
the following command on Debian based systems:

```sh
sudo apt install pipx
```

Install uv using pipx

```sh
python3 -m pipx install uv
```

## Manual Build

After installing [uv], the docs can be built with:

```sh
uv run make html
```

To open the generated HTML docs with Firefox you can run:

```sh
firefox _build/html/index.html
```

## Auto Rebuild

Alternatively it is possible to start a local HTTP server that automatically
rebuilds the docs on every file change:

```sh
uv run make livehtml
```

To open the served docs with Firefox you can run:

```sh
firefox http://127.0.0.1:8000
```

## Writing Content

The documentation uses [Sphinx](https://www.sphinx-doc.org/) in conjunction with
[myst](https://myst-parser.readthedocs.io) to create the HTML content. Each
document uses [Markdown](https://en.wikipedia.org/wiki/Markdown) with
[extended syntax](https://myst-parser.readthedocs.io/en/latest/intro.html#extend-markdown-with-myst-syntax)
to integrate with Docutils and Sphinx. All Markdown files are in the [src](./src) folder or one of its sub-folders.

The entry point is the [index.md](./src/index.md) file. It contains a [toctree directive](https://myst-parser.readthedocs.io/en/latest/syntax/organising_content.html#using-toctree-to-include-other-documents-as-children)
to reference and include other Markdown files.

When a Pull Request is reviewed and merged, the HTML content is built
automatically and published afterwards to [https://greenbone.github.io/docs/](https://greenbone.github.io/docs/)
via a GitHub Actions [workflow](.github/workflows/github-pages.yml).

For viewing the HTML content during development, please take a look at the
[auto rebuild](#auto-rebuild) and/or [manual build](#manual-build) sections in
this README.

[uv]: https://docs.astral.sh/uv/
[pipx]: https://pipx.pypa.io/stable/
