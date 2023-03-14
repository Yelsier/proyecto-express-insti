# Documentación REST

## **¿Qué es REST?**

REST (Representational State Transfer) es una interfaz para conectar varios sistemas basados en HTTP y permitir el intercambio y compartición de datos. Los formatos utilizados a la hora de compartir estos datos son **XML** y **JSON**.

Hoy en día el mas utilizado es **JSON** debido a su popularidad en las aplicaciones de hoy en día, aunque la elección del formato dependerá de las necesidades de acada proyecto.

### ¿Por qué utilizar REST API?

- Te da la posibilidad de enviar un **request** a un servidor con toda la información necesaria y obtener una sola **response**.
- Se apoya en un protocolo que es el que se utiliza para las página web, ya está consolidado por lo que no va a sufrir cambios e inestabilidades.
- Se apoya en los verbos utilizados por HTTP:
    - **GET**: Para obtener recursos, solo lectura.
    - **POST**: Para subir nuevos recursos a nuestra base de datos.
    - **PUT**: Para modificar un recurso.
    - **DELETE**: Para eliminar un recuro. 
  
        No olvidar que existen infinidad de verbos y cada uno tiene su uso.

        Hay que tener en cuenta de que esto no es más que una nomenclatura y unos estándares de uso para cada uno, aun así, se podría obtener recursos accediendo por POST y se podría subir productos mediante GET ya qué al mandar una acción al servidor, el programa redirigirá a la acción deseada.

- Todos los objetos se manipulan mediante URL, ya que le enviaremos una url con una ruta y parámetros específicos y el servidor nos devolverá una respuesta en base a nuestra petición.

### Ventajas de REST

- Nos permite separar cliente de servidor. Nos permite separar la parte de backend de la de frontend (Ej: C# y React).
- Es totalmente independiente de la plataforma por lo que no importa el sistema (Windows, Linux, Mac etc...) ni el lenguaje usado.
- Podemos añadir restricciones, podemos hacer nuestra API pública entera o parcialmente, o privada. Hacer uso de keys etc...


## **Rutas**

Las rutas o el direccionamiento de una página es una serie de rutas en la url que el programa utilizara para realizar según que acciones. Las acciones que se realizarán se basan en los verbos que están preestablecidos para cualquier sistema **REST** como hemos explicado anteriormente.

 Al hacer la petición en el código podremos especificarleel verbo a utilizar los parámetros, cabeceras etc...

 Ejemplos de enrutamiento básico para una **BBDD** con la tabla Alumnos:

    GET: https://midominio.com/alumnos

Accederemos directamente a la ruta y nos devolverá una respuesta con un JSON de Alumnos.

    GET: https://midominio.com/alumnos/{id}

Al acceder a esta ruta, le especificamos un identificador único, por lo que el servidor nos devolverá una respuesta con el objeto que contenga este identificador.

    GET: https://midominio.com/alumnos/{id}/asignaturas

Otra convención a la hora de hacer rutas en nuestra API es poder acceder a las propiedades (normalmente Listas/Enumerables) de un objeto en específico. De esta manera podremos obtener los datos de un objeto directamente sin tener que manipularlo.

    POST: https://midominio.com/alumnos

Para hacer un POST, tendremos que acceder a la misma ruta pero especificando el verbo como POST y pasándole en el cuerpo de la petición el objeto que quieres añadir a la **BBDD**.

    PUT: https://midominio.com/alumnos/{id}

Para hacer un PUT tendremos que acceder a la ruta especificando el id del objeto que queremos modificar y al igual que en el POST, tendremos que pasar en el cuerpo de la petición el objeto con las modificaciones ya hechas.

    DELETE: https://midominio.com/alumnos/{id}

Finalmente, podremos eliminar un objeto de la **BBDD** especificando el id del objeto que queremos eliminar.

Hay herramientas que nos sirven a la hora de trabajar con peticiones, para ver valores devueltos, parametros etc... Una de ella muy conocida es **POSTMAN**, tanto la versión web como la versión escritorio, hay que tener en cuenta que si trabajamos a menudo en local (localhost) tendremos que utilizar la versión de escritorio ya que la versión web no puede acceder a nuestro servidor local.

Es una herramienta muy gráfica y en la que podemos escribir muy fácilmmente parámetros en la petición, datos en  el body, cabeceras etc...


## **CRUD**

Son las siglas de **CREATE**, **READ**, **UPDATE** y **DELETE**.

Básicamente se habla de **CRUD** cuando queremos crear un servidor para el mantenimineto de una **BBDD**.
El mantenimiento básico sería lo comentado al principio, poder crear, leer, editar y eliminar datos de la base de datos. 

Para hacer esto tendremos que utilizar los verbos que utilizan **REST** y **HTTP** como con los ejemplos vistos anteriormente en las rutas. 