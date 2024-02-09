![Greenbone Logo](https://www.greenbone.net/wp-content/uploads/gb_new-logo_horizontal_rgb_small.png)

# Documentation for the Greenbone Community Edition

The documentation is build automatically via GitHub Actions and available at
https://greenbone.github.io/docs/

## Requirements

For a manual build locally Python >= 3.9 and [poetry] is required.

## Install Poetry

To install poetry it is recommended to use [pipx]. pipx can be installed with
the following command on Debian based systems:

```sh
sudo apt install pipx
```

Install poetry using pipx

```sh
python3 -m pipx install poetry
```

## Install and Upgrade Dependencies

When building the docs you should ensure that all the dependencies are installed
and up to date. To install for the first time or to update the project
dependencies via [poetry] run

```sh
poetry install --no-root
```

You should run this command once a week to install the latest dependencies.

## Manual Build

After installing [poetry] and the project's dependencies, the docs can be built with
```sh
poetry run make html
```

To open the generated HTML docs with Firefox you can run

```sh
firefox _build/html/index.html
```

## Auto Rebuild

Alternatively it is possible to start a local HTTP server that automatically
rebuilds the docs on every file change

```sh
poetry run make livehtml
```

To open the served docs with Firefox you can run

```sh
firefox http://127.0.0.1:8000
```

## Starting From Scratch

If something is wrong with your dependencies or you just want to re-start from
a clean environment you need to remove the [virtual environment](https://docs.python.org/3/library/venv.html).
First of all ensure that poetry's virtual environment is placed within the
project.

```sh
poetry config virtualenvs.in-project true
```

Afterwards the virtual environment including all installed dependencies can be
deleted.

```sh
rm -rf .venv
```

[poetry]: https://python-poetry.org/
[pipx]: https://pipx.pypa.io/stable/
