# Guía para utilizar una API en la parte cliente

En esta guía, aprenderás cómo utilizar una API en la parte cliente utilizando las funciones fetch, then, catch, finally, await y async.

  

## Paso 1: Obtener los datos de la API

Para obtener los datos de una API en la parte cliente, utilizaremos la función fetch. Esta función permite hacer peticiones HTTP desde JavaScript.

  

Para hacer una petición HTTP con fetch, simplemente llamamos a la función y le pasamos la URL de la API que deseamos consumir. Por ejemplo:

```javascript
fetch('https://miapi.com/datos')
```
La función **fetch** devuelve una **promesa** que se resuelve con la respuesta de la API. Podemos utilizar la función **then** para manejar la respuesta de la API.

 
```javascript
fetch('https://miapi.com/datos').then(response => {
	console.log(response);
});
```
En este ejemplo, utilizamos la función then para imprimir la respuesta de la API en la consola del navegador. La respuesta de la API se encuentra en el parámetro response.

## Paso 2: Convertir la respuesta en formato JSON

La respuesta de la API puede estar en diferentes formatos, pero el formato más común es JSON. Para trabajar con la respuesta de la API en JavaScript, debemos convertirla en un objeto JavaScript utilizando la función JSON.parse.

  

Podemos hacer esto en la función then que utilizamos en el Paso 1.

```javascript
fetch('https://miapi.com/datos')
	.then(response => response.json())
	.then(data => {
		console.log(data);
	});
```

En este ejemplo, utilizamos la función json para convertir la respuesta de la API en un objeto JavaScript. La respuesta convertida se encuentra en el parámetro data.

  

## Paso 3: Manejar errores

Cuando consumimos una API, es posible que ocurran errores, como una respuesta HTTP no válida o una conexión fallida. Para manejar estos errores, utilizamos la función catch.

```javascript
fetch('https://miapi.com/datos')
	.then(response => response.json())
	.then(data => {
		console.log(data);
	})
	.catch(error => {
		console.error(error);
	});
```
En este ejemplo, utilizamos la función catch para imprimir el error en la consola del navegador. El error se encuentra en el parámetro error.

Las promesas en JavaScript son un mecanismo para manejar operaciones asíncronas. En lugar de esperar a que una operación asíncrona se complete, las promesas permiten que el código continúe ejecutándose y se ejecuten acciones cuando la operación asíncrona se complete o falle.

## Paso 4: Promesas

Las promesas tienen dos estados posibles: pendiente (**pending**) y cumplida (**fulfilled**) o rechazada (**rejected**). Una vez que una promesa se resuelve, no se puede cambiar su estado.

Para crear una promesa, utilizamos la clase **Promise** y le pasamos una función que contiene la lógica de la operación asíncrona. Esta función toma dos argumentos: **resolve** y **reject**, resolve se utiliza para indicar que la operación asíncrona se ha completado correctamente y reject se utiliza para indicar que ha fallado.

A continuación, un ejemplo de cómo crear una promesa que se resuelve después de un cierto tiempo:

```javascript
const miPromesa = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('Operación completada');
	}, 2000);
});
```
Podemos utilizar **then** para ejecutar una acción cuando la promesa se resuelve:

```javascript
miPromesa.then(resultado => {
	console.log(resultado);
});
```
También podemos utilizar catch para manejar un posible error:
```javascript
miPromesa.catch(error => {
	console.error(error);
});
```
Si queremos ejecutar una acción independientemente de si la promesa se resuelve o falla, podemos utilizar finally:

```javascript
miPromesa.finally(() => {
	console.log('Operación finalizada');
});
```

## Paso 5: Utilizar async/await

Las funciones fetch, then, catch y finally utilizan promesas para manejar la respuesta de la API y los errores. Podemos utilizar las funciones async y await para trabajar con estas promesas de una manera más sencilla y fácil de leer.


En lugar de encadenar las funciones then y catch, podemos utilizar la palabra clave async antes de la función que realiza la petición HTTP y la palabra clave await antes de la función que convierte la respuesta en formato JSON. También podemos utilizar try y catch para manejar los errores.

```javascript
async function obtenerDatos() {

	try {
		const response = await fetch('https://miapi.com/datos');
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

obtenerDatos();
```
En este ejemplo, creamos una función obtenerDatos que utiliza async y await para obtener los datos de la API y convertirlos en un objeto JavaScript. También utilizamos try y catch para manejar los errores.

  

## Paso 6: Modificar el DOM con los datos recibidos

Una vez que hemos obtenido los datos de la API y los hemos convertido en un objeto JavaScript, podemos utilizarlos para modificar el DOM de la página web.

Por ejemplo, si tenemos una tabla en nuestra página web y queremos agregar filas con los datos de la API, podemos hacer lo siguiente:

```html
<table  id="tabla-datos">
	<thead>
		<tr>
			<th>Nombre</th>
			<th>Edad</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>
```
```javascript
async function obtenerDatos() {
	try {
		const response = await fetch('https://miapi.com/datos');
		const data = await response.json();
		const tabla = document.getElementById('tabla-datos');
	
		for (let i = 0; i < data.length; i++) {
			const fila = document.createElement('tr');
			const celdaNombre = document.createElement('td');
			celdaNombre.textContent = data[i].nombre;
			fila.appendChild(celdaNombre);
			const celdaEdad = document.createElement('td');
			celdaEdad.textContent = data[i].edad;
			fila.appendChild(celdaEdad);
			tabla.appendChild(fila);
		}
	} catch (error) {
		console.error(error);
	}
}

obtenerDatos();
```
En este ejemplo, creamos una función obtenerDatos que utiliza async y await para obtener los datos de la API y convertirlos en un objeto JavaScript. Luego, utilizamos un ciclo for para crear filas y celdas en la tabla y agregar los datos de la API. Finalmente, agregamos las filas a la tabla en el DOM de la página web.

