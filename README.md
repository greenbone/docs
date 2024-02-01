![Greenbone Logo](https://www.greenbone.net/wp-content/uploads/gb_new-logo_horizontal_rgb_small.png)

# Documentation for the Greenbone Community Edition

The documentation is build automatically via GitHub Actions and available at
https://greenbone.github.io/docs/

## Requirements

For a manual build locally Python >= 3.9 and [poetry] is required.

## Install Dependencies

To install poetry it is recommended to use [pipx]
```sh
python3 -m pipx install poetry
```

To install the project dependencies via [poetry] run
```sh
poetry install
```

## Manual Build

After installing [poetry] and the project's dependencies, the docs can be build with
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

[poetry]: https://python-poetry.org/
[pipx]: https://pipx.pypa.io/stable/
