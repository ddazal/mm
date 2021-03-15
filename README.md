# mm

Meeting-o-Matic es una aplicación web para facilitar la programación de reuniones entre varias personas.

No hace falta registrarse para poder crear una reunión e invitar a varios participantes.

## develop / preview

Es necesario tener instalado `docker` y `docker-compose` instalado.

```sh
$ git clone git@github.com:ddazal/mm.git
$ cd mm
$ docker-compose -f docker-compose.production.yml up --build
```

- Aplicación web: [http://localhost:8080](http://localhost:8080)
- API Explorer: [http://localhost:3000](http://localhost:3000)
- Cliente email: [http://localhost:8081](http://localhost:8081)