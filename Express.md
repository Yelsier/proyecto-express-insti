# Express framework

  ~~~
  Framework de backend  Node.js que proporciona un conjunto de herramientas para aplicaciones web, peticiones y respuestas HTTP, enrutamiento y middleware para construir y desplegar aplicaciones a gran escala y preparadas para la empresa.
~~~

________________

  1. Que es Express
  2. Cómo Funciona Express.js
  3. Cómo trabajar con una aplicación Express.js 
     + Instalacion  y ejecución
     + Enrutamiento personalizado
     + Conexión con base de datos 

________________
 
## 1 - Que es Express
 Es un framework de backend minimalista, rápido , que proporciona características y herramientas robustas para desarrollar aplicaciones de backend escalables. Te ofrece el sistema de enrutamiento y características simplificadas para ampliar el framework con componentes.


Express fue creado para hacer API y aplicaciones web con facilidad, para poder ahorrar tiempo de codificación y para cumplir con la finalidad de que sea de uso facil, está escrito en javascript, ya que javascript es un lenguaje fácil, incluso si no tiene una experiencia previa. De esta forma Express permite que nuevos desarrolladores ingresen al campo del desarrollo web. Entonces los puntos principales de Express es;


- Tiempo eficiente
- Rápido
- Económico
- Fácil de aprender
- Asincrónico

Y para poder llevar acabo este contiene las siguientes funcionalidades de forma interna;

### **Desarrollo rápido del lado del servidor**
 El mayor beneficio de Express.js es la rápida velocidad de desarrollo del servidor que ofrece. 

### **Software intermedio**

Cuenta con un middleware para ampliar el acceso a todas las bases de datos. Se puede acceder a la base de datos dentro de Express.js a través del middleware. También otorga acceso a las solicitudes de los clientes junto con otro middleware delsistema. El middleware también es responsable de una serie de modificaciones, incluida la configuración de todas las funciones dentro de Express.js.

### **Enrutamiento**
Cuenta con la mejor configuración de enrutamiento dentro de la biblioteca de JavaScript. La configuración de enrutamiento utilizada por ExpressJS puede ayudar a preservar la página web mediante el uso de URL.

### **Plantillas**
Proporcionar motores para la creación de plantillas. Estos  se utilizan para crear plantillas dinámicas para los usuarios que pueden crear el lado del servidor de su sitio web HTML. Las plantillas HTML del lado del servidor pueden ayudar a los desarrolladores durante el inicio del viaje y pueden proporcionar resultados adecuados.

### **Depuración**
 Viene con un potente motor de depuración, que puede hacer que la depuración sea mucho más fácil que en otras plataformas. El mecanismo de depuración en el marco puede ayudar a eliminar errores de partes exactas de la aplicación sin alterar la configuración general.

### **JSON**
Express.json() es una función de middleware integrada en Express. Este método se usa para analizar las solicitudes entrantes con cargas JSON y se basa en el analizador de cuerpo.

Este método devuelve el middleware que solo analiza JSON y solo observa las solicitudes en las que el encabezado de tipo de contenido coincide con la opción de tipo.

________________
 ## 2 -  Cómo Funciona Express.js

 **1.** Express.js utiliza el modelo cliente-servidor para aceptar las solicitudes de los usuarios y devolver las respuestas al cliente, su funcionamiento no es tan diferente de cómo funcionan otros marcos populares, como Laravel.

 **2.** Cuando un usuario envía una solicitud desde su navegador web escribiendo la dirección de un sitio web, el navegador envía una solicitud HTTP a la aplicación/servidor.

 **3.**.El servidor recibirá la solicitud a través de una de sus rutas y la procesará utilizando el controlador que coincida con la ruta solicitada.

 **4.** Después del procesamiento, el servidor enviará una respuesta al cliente mediante HTTP, ya que es un protocolo de comunicación de ida y vuelta.

 **5.** La respuesta devuelta al cliente podría ser texto estándar, una página HTML dinámica que el navegador procesará y mostrará una hermosa página web, o datos JSON que los desarrolladores frontend manejarán para mostrar información en la página web.
________________
 ## 3 -  Cómo trabajar con una aplicación Express.js 

### **1. Instalación y ejecución:**

1. Tenemos que tener instalado Node js
   
2. Installamos el generador de Express
   + npm install -g express-generator
3. Instalamos la aplicación
   + npx express --view=ejs
  
4. Instalamos las dependencias
   + npm install

5. Podriamos ver todas las carpetas y documentos autogenerados:
   + Carpeta public: podremos crear documentos de JavaAcript y hojas de estilo estáticas

   + Carpeta rutas:  podemos crear secuencia de comandos del lado del servidor
   + Carpeta vistas:  donde crearemos el archivo de plantilla de node express
6. Para ejecutar el programa usamos el comando **npm start**, nos dirigimos a nuetsro navegador y ponemos en la barra de busqueda **localhost://300**, y tendriamos que visualizar el logo de express


### **2. Enrutamiento personalizado:**
  1. Creamos una documento .js en la carpeta de rutas y escribimos en el : 

     + <code>var express = require ('express');</code> con esto incluimos el modulo de express
     + <code> var router = express.Router(); </code> usando esta función creamos un nuevo objeto de enrutador 
     +  <code> router.get("/", function(request,response,next){
     responde.send("Hola a todos");
    });</code> 
          + esta función recibe dos parametros **"/"**, con esto indicamos lo que visualizaremos por defecto, si quisieramos dirigirnos a otra ruta seria **"/ayuda,home,...."** , el segundo parametro **function(request,response,next)** usamos una función "callback". Y nuestro usuario visualizara el mensaje de **Hola a todos**
     + Ahora nos dirigimos al documento **app.js** y añadimos <code> var nombreDeLaVariable = require ('./routes/nombreDelDocumento.js') </code>
         +  nos dirigimos a nuetsro navegador y ponemos en la barra de busqueda **localhost://300/nombreDelDocumento.js**, y tendriamos que visualizar Hola a todos
  
### **3. Conexión con base de datos:**

El processo de Conexión de una base de datos en Express depende de que tipo de base de datos quieras usar.

+ Conexión con MYSQL:
  + <code> npm install mysql </code> en el terminal
  + Luego, en tu archivo de servidor de Express, debes requerir el paquete de "mysql" y crear una conexión con la base de datos. Aquí hay un ejemplo básico de cómo podrías hacerlo:
~~~~
   const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tucontraseña',
  database: 'nombreDeTuBaseDeDatos'
});

connection.connect((error) => {
  if (error) {
    console.error('Error de conexión: ', error);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL!');
  }
});

~~~~
En este ejemplo, estamos creando una conexión a una base de datos MySQL local utilizando la configuración de host, usuario, contraseña y nombre de base de datos. Luego, utilizamos la función connect() para conectarnos a la base de datos. Si hay un error en la conexión, lo mostramos en la consola. De lo contrario, mostramos un mensaje de éxito en la consola.

Con esta conexión creada, puedes realizar consultas a la base de datos utilizando la función query() del objeto connection, como se muestra en el siguiente ejemplo:

~~~~
connection.query('SELECT * FROM usuarios', (error, results, fields) => {
  if (error) {
    console.error('Error en la consulta: ', error);
  } else {
    console.log('Resultados: ', results);
  }
});
~~~~

+ Conexión con PostgreSQL:
  +    <code> npm install pg </code> en el terminal
   Luego, en tu archivo de servidor de Express, debes requerir el paquete "pg" y crear una conexión con la base de datos. Aquí hay un ejemplo básico de cómo podrías hacerlo:

~~~
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'tuusuario',
  password: 'tucontraseña',
  database: 'nombredetubasededatos',
  port: 5432 // puerto predeterminado para PostgreSQL
});

client.connect((error) => {
  if (error) {
    console.error('Error de conexión: ', error);
  } else {
    console.log('Conexión exitosa a la base de datos PostgreSQL!');
  }
});
~~~

Con esta conexión creada, puedes realizar consultas a la base de datos utilizando la función query() del objeto client, como se muestra en el siguiente ejemplo:

~~~
client.query('SELECT * FROM usuarios', (error, results) => {
  if (error) {
    console.error('Error en la consulta: ', error);
  } else {
    console.log('Resultados: ', results.rows);
  }
});
~~~

