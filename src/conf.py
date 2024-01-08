# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------

project = "Greenbone Community Documentation"
copyright = "2021–2024, Greenbone AG"
author = "Greenbone AG"


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    "sphinx.ext.githubpages",
    "sphinx.ext.napoleon",
    "myst_parser",
    "sphinx_copybutton",
    "sphinx_tabs.tabs",
    "sphinxext.opengraph",
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ["_templates"]

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = [
    "_build",
    "Thumbs.db",
    ".DS_Store",
    ".venv",
    ".vscode",
    "dist",
]

source_suffix = {
    ".rst": "restructuredtext",
    ".md": "markdown",
}

# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = "furo"
html_title = project

html_favicon = "favicon.png"

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ["_static"]
html_css_files = ["custom.css"]
html_logo = "_static/logo.svg"

repo_url = "https://github.com/greenbone/docs/"
html_theme_options = {
    "source_repository": repo_url,
    "source_branch": "main",
    "source_directory": "src/",
    "light_css_variables": {
        "color-content-foreground": "#4D4D4D",
        "color-foreground-primary": "4D4D4D",
        "color-foreground-secondary": "#808080",
        "color-code-background": "#333333",
        "color-code-foreground": "#E6E6E6",
        "color-admonition-title--note": "#11AB51",
        "admonition-font-size": "0.9rem",
        "color-background-primary": "#FFFFFF",
        "color-background-secondary": "#F5F5F5",
        "color-sidebar-background": "#F5F5F5",
    },
    "dark_css_variables": {
        "color-content-foreground": "#F5F5F5",
        "color-foreground-primary": "F5F5F5",
        "color-foreground-secondary": "#E6E6E6",
        "color-code-background": "#333333",
        "color-code-foreground": "#E6E6E6",
        "color-admonition-title--note": "#11AB51",
        "admonition-font-size": "0.9rem",
        "color-background-primary": "#171717",
        "color-background-secondary": "#4D4D4D",
        "color-sidebar-background": "#333333",
    },
    "footer_icons": [
        {
            "name": "GitHub",
            "url": repo_url,
            "html": """
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
            """,
            "class": "",
        },
    ],
}

myst_html_meta = {
    "description lang=en": "Greenbone Community Edition – Documentation",
    "description lang=de": "Greenbone Community Edition – Dokumentation",
    "keywords": "OpenVAS, Greenbone, Community, Greenbone Community Edition, GVM, Container, Docker, Documentation",
    "property=og:locale": "en_US",
}

# https://myst-parser--467.org.readthedocs.build/en/467/syntax/optional.html#auto-generated-header-anchors
myst_heading_anchors = 3

myst_enable_extensions = ["colon_fence", "deflist"]

pygments_style = "zenburn"

suppress_warnings = ["myst.header"]

# settings for sphinxext-opengraph
# it automagically adds Open Graph meta tags to your site’s generated HTML.
# The Open Graph protocol is used by social media websites to determine how to
# present a page when a link is posted, and by search engines as a criterion
# toward ranking.  https://github.com/wpilibsuite/sphinxext-opengraph
ogp_site_url = "http://greenbone.github.io/docs/latest/"
ogp_image = "https://greenbone.github.io/docs/latest/_images/greenbone-banner.png"


copybutton_selector = "div:not(.no-copybutton) > div.highlight > pre"
