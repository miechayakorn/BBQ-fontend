# Hcare - frontend

## Build Hcare Project by Docker
```
docker build --pull --no-cache -t hcare_frontend .
docker run -d -p 80:80 --name frontend --env-file ./hcare/.env --restart=always hcare_frontend
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
