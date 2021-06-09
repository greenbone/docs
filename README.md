# Documentation for the Greenbone Source Edition

The documentation is build automatically via GitHub Actions and available at
https://greenbone.github.io/docs/

For a manual build locally [poetry](https://python-poetry.org/) is required.

First install poetry and the project dependencies with
```sh
python3 -m pip install poetry
poetry install
```

Afterwards the docs can be build with
```sh
poetry run make html
```

To open the generated HTML docs with Firefox you can run

```sh
firefox _build/html/index.html
```
