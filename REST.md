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
- 


## **Rutas**

Las rutas o el direccionamiento de una página es una serie de rutas en la url que el programa utilizara para realizar según que acciones. Las acciones que se realizarán se basan en los verbos que están preestablecidos para cualquier sistema **REST** como hemos explicado anteriormente.

A continuación veremos un ejemplo básico de uso de rutas en una API:

    https://midominio.com/alumnos

Con esta ruta estaremos entrando a la API ubicada en _midominio.com_ y a la ruta _/alumnos_. El verbo por defecto en cualquier página es el **GET** 

   
 




## **CRUD**


## Webs HTTP