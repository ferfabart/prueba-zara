# Prueba front-end ZARA.com


## Como instalar las dependencias

Primero tenemos que instalar las dependencias con:

### `npm install`

## Lanzar la aplicacion en modo desarrollo 

Lanzamos el siguiente comando:

### `npm start`

Abre [http://localhost:3000](http://localhost:3000) para visualizarlo en el navegador.

## Lanzar la aplicacion en modo produccion 

Lanzamos el siguiente comando:

### `npm run build`

Con este comando creamos en el directorio build una version de la aplicacion mas eficiente.

Para poder probar esta version de produccion podemos utilizar un servidor estatico como [serve](https://www.npmjs.com/package/serve)

Instalamos serve:

### `npm install -g serve`

Despues ejecutamos serve pasandole el directorio build

### `serve -s build`

Abre [http://localhost:3000](http://localhost:3000) para visualizarlo en el navegador.

