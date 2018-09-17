
# Tareas de desarrollo

Las **tareas** que se pueden lanzar están configuradas en la sección “scripts” del **package.json**. Teniendo instalado node + npm y con la sintaxis:

```bash
  npm run TASK_NAME:
```

En caso de no tener instalado node se puede acceder a la consola del container de docker tal y como se explica en el README.md.

El fichero *package.json* las contiene en su sección *scripts*:

![Scripts](../assets/npm-scripts.png)

Las tareas que tenemos configurados en nuestro proyecto son:

  * **setup**: instala las dependencias npm del proyecto y recompila node-sass (hack que soluciona una problema con esta dependencia necesaria para generar los estilos a partir de los SCSS).

  ```bash
    npm run setup
  ```

  * **start**: ejecuta la tarea *start:dev*.

  ```bash
    npm start
  ```

  ó

  ```bash
    npm run start
  ```

  * **start:dev**: ejecuta la tarea build:dev.

  ```bash
    npm run start:dev
  ```

  * **start:pro**: ejecuta la tarea build:pro y levanta el servidor express configurado en el fichero *startup/server.js* que sirve los estáticos de la SPA (html, css y js bundles minificados).

  ```bash
    npm run start:pro
  ```

  * **build:services**: ejecuta la generación automática de proxies/servicios que se comunicarán con una api descrita en un fichero *swagger.json* (ubicado en la carpeta *npm-scripts/build/services*) con el formato OAS (Open Api Specification). Este fichero *swagger.json* será auto-generado a su vez por una herramienta de backend que en tiempo de build se lanzará leyendo los controladores/acciones de dicho proyecto y generando el *swagger.json*.

  ```bash
    npm run build:services
  ```

  *	**build:barrel**: ejecuta la generación del fichero “modules/veas/components/Veas.barrel.js” que es un punto único que importa los componentes que encuentre en el sistema de ficheros del proyecto para ser todos exportados. El código se genera a partir de los ficheros encontrandos con web components, pipes, directivas y providers, mediante expresiones regulares sobre el contenido de los mismos. Este barrel se utiliza para registrar en el module de Veas lo que encuentra dentro del módulo.

  ```bash
    npm run build:barrel
  ```

  *	**build:dev**: esta tarea lanza mediante angular-cli un webpack-dev-server con la configuración de desarrollo, con el modo ‘hot’ activado que permite que al modificar los ficheros se recompile todo.

  ```bash
    npm run build:dev
  ```
  
  *	**build:pro**: esta tarea lanza mediante angular cli la tool de webpack en modo desarrollo generando los ficheros minificados, concatenados y optimizados de la SPA, sin ficheros de map.

  ```bash
    npm run build:pro
  ```
  
  * **test**: lanza los tests con karma. La configuración de karma está ubicada en ficheros dentro de la carpeta *npm-scripts/test*.
  
  ```bash
    npm test
  ```
  
  ó

  ```bash
    npm run test
  ```

  * **test:watch**: ejecuta los tests con un watcher que los relanza cada vez que un fichero se modifica.
  
  ```bash
    npm run test:watch
  ```

  * **test:coverage**: ejecuta los tests generando un informe de cobertura de código (especificado el output en la configuración de angular-cli.json).

  ```bash
    npm run test:coverage
  ```

  * **lint**: ejecuta la herramienta TSLINT con la configuración ubicada en el fichero *tslint.json* sobre los ficheros indicados en la configuración descrita en el *angular-cli.json*.

  ```bash
    npm run lint
  ```

  * **docs**: genera la documentación del api de los web components, tutoriales y código javascript de la aplicación. El output y demás configuración está en el scripts y genera la documentación en *dist/docs*.

  ```bash
    npm run docs
  ```
