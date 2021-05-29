# socket-io-template

## Requirements

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [GNU/Make](https://www.gnu.org/software/make/)

## Clone

```console
$ git clone https://github.com/aminnairi/socket-io-template.git
$ cd socket-io-template
```

## Start

*Start the server on http://127.0.0.1:8080 and listen for connections.*

```console
$ make
```

Or

```console
$ make start
```

## Dependencies installation

*Install all dependencies listed in the [`package.json`](./package.json) file. This is run automatically when using `make` or `make start`.*

```console
$ make install
```
