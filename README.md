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

[uv]: https://docs.astral.sh/uv/
[pipx]: https://pipx.pypa.io/stable/
