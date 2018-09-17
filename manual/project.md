# Qué tiene el proyecto

Este apartado permite describir todos los ficheros y carpetas que tiene el proyecto de la SPA. Permitirá entender qué **tools** hay configuradas y cómo ejecutarlas para desarrollar. Además, se explican las decisiones más relevantes y los flujos automatizados de construcción más importantes.

![Structure](asset/project.png)

### Carpetas

* **dist**: contiene los outputs de la aplicación tales como los assets de la spa (dist/app) los outputs de documentación (dist/docs), los outputs de testing como informes de cobertura de código (dist/test), etc. Tiene una carpeta por prefijo de tarea que deja los ficheros output.

* **docker**: carpeta que contiene los Dorkfile y docker-compose, que permiten ejecutar el microservicio con la SPA en modo producción o desarrollo servida por un servidor express o por webpack-dev-server respectivamente dentro de un container con Node.

* **modules**: contiene el código de los módulos software que tiene la SPA, principalmente el módulo **app** que representa la aplicación.

![Structure](asset/modules.png)

La estructura interna de los *modules* contiene:
  * **app**: modulo principal que representa la propia SPA. Contiene:

    * **components**: con todos los web components de la aplicación. Cada web component se ubicará en una carpeta que se llame como el mismo. Un web component tendrá su fichero de estilos (.scss) su fichero javascript (jsx y js) y su container dentro si aplicara. Además tendría una carpeta de “components” donde recursivamente podrían incluirse otros web componenents y una carpeta de “specs” con los tests del web component.

    Dentro de los **components** está el componente connector, que es un HOC (High order component) que es capaz de aumentar los componentes para conectarlos con la gestión de estados centralizados de la capa de dominio (redux).

    * **state**:  contiene toda la lógica relacionada con el manejo del estado de la aplicación *app* de la SPA. Recoge el conjunto de efectos y efectos laterales que permiten representar todos los diferentes momentos por los que pasa la interfaz. El estado representa el conjunto de datos (o momento de datos)que está viviendo un instante de la aplicación (datos que representa/utiliza la interfaz). Esto son los servicios/proxies que comunican con el backend, toda la gestión de estado con reducers (un reducer es una función pura que modifica alguna parte del estado) y las sagas con redux saga. Una saga es una transacción de negocio de larga duración que utilizamos para provocar efectos secundarios derivados de una acción.
    
  * **core**: módulo que contiene todos los artefactos *core* de autenticación, autorización, trazabilidad, multi-idioma, gestión de excepciones, storage, etc.

* **node_modules**: carpeta con las dependencias npm necesarias para ejecutar tareas de la aplicación y la propia aplicación.

* **npm-scripts**: contiene los ficheros con las configuraciones necesarias para ejecutar las tareas de script recogidas en el package.json. Tiene una carpeta por prefijo de tarea: build, docs, install, test, etc.

* **startup**: contiene el **index.jsx** que será el fichero que arranca la aplicación. El que será construido en un bundle con webpack y punto de acceso y entrada al resto de web components del proyecto. 

* **styles**: contiene los assets reutilizables de la aplicación: los helpers de estilos, variables, settings, imágenes, fuentes, etc. Representa el core de la arquitectura de estilos.

### Ficheros

* **.babelrc**: contiene la configuración babel, herramienta utilizada para traspilar el javascript de ES6 y pasarlo a ES5 compatible con las versiones de los navegadores soportados. Tiene configurados los presets (conjuntos de plugins) para soportar el lenguaje JavaScript en su versión de especificación es2015 (o ES6) y para soportar el lenguaje JSX de react. Además está configurado un plugin que permite aplicar spread en properties de objetos (transform-object-rest-spread).

* **.eslintrc**: contiene la configuración de la herramienta de linting (ESLINT). Tiene aplicada la configuración de linting de AirBNB de base y algunas modificaciones. Permite al editor señalar los errores de linting.

* **.gitignore**: fichero que permite excluir del control de código fuente los ficheros indicados dentro de él. Principalmente excluye “dist” y “node_modules”.

* **appsettings.json**: contiene las settings del proyecto tales como la configuración necesaria de autenticación, nivel de logging, etc.

* **package.json**: fichero que almacena la información del paquete npm que conforma la SPA: qué dependencias tiene, qué scripts tenemos disponibles para trabajar, para lanzar test, hacer la build, lanzar linting, generar documentación, etc. 

Además contiene la configuración del test runner “jest” al final del fichero.

Las **tareas** que se pueden lanzar (sección “scripts” del package.json) son (teniendo instalado node y con la sintaxis ‘npm run TASK_NAME’):

  * **start**: recompila node-sass (hack que soluciona una problema con esta dependencia) y ejecuta la tarea start:dev

  * **start:dev**: ejecuta la tarea build:dev

  * **start:pro**: ejecuta la tarea build:pro y levanta el servidor express definido en el fichero app.js que sirve los estáticos de la SPA.

  * **build:services**: ejecuta la generación automática de proxies/servicios que se comunicarán con una api descrita en un fichero swagger.json con el formato OAS (Open Api Specification).

  *	**build:barrel**: ejecuta la generación del fichero “modules/app/components/barrel.generated.js” que es un punto único que importa los componentes que encuentre en el sistema de ficheros del proyecto para ser todos exportados. El código se genera a partir de los ficheros encontrandos con web components mediante expresiones regulares sobre el contenido de los mismos. En la configuración de webpack hay un alias “components” que se mapea con este fichero auto-generado, permitiendo no tener rutas relativas entre componentes, elemento que causa fragilidad e inmovilidad dado que si los cambios de ubicación se rompen las referencias. Además, este barrel es medianamente inteligente porque:

    * **Genera un diccionario** con clave nombre del componente y valor el propio componente, utilizado por el configurador de interfaz.

    * **Identifica si hay un container** asociado al componente que encuentra por convención NombreDeComponenteContainer y lo exporta sin el nombre de convención para que los que lo importen no conozcan si es container o no y eliminado la fragilidad si un container deja de serlo.

    * **Identifica por convención NombreDeComponent.config** si tiene un componente configurador del componente, información utilizada para el configurador de interfaz.

  * **build:html**: ejecuta la generación de los ficheros html y otros assets necesarios para ejecutar la SPA: 

    * **index.html**: fichero principal que contiene la SPA, generado con las referencias a scripts y css contenidas en modo desarrollo o producción marcadas en el fichero ‘npm-scripts/build/assets.json’.

    * **silent-renew.html**: se cargará en un iframe desde la  SPA y gestionará la vida y refresco de la sesión mediante la librería de OpenId Connect.

    * **auth.html**: fichero al cual redirigirá el servidor de Identity server con el token en la url que será capturado por el script auth.js y redirigirá a la SPA pasándole el token con el cual podrá hacer peticiones autorizadas.

  * **build:dll:dev**: genera con webpack una dll en modo desarrollo. Esta dll contiene los ficheros bundlelizados contenidos dentro del fichero ‘npm-scripts/build/vendors.js’. Estos ficheros serán construidos una única vez y permitirá que webpack no atienda a cambios en ellos ni los recompile continuamente. Es una optimización que acelera el tiempo de build de webpack. En “vendors.js” deben incluirse todas aquellas librerías que no haga falta recompilar una y otra vez.

  * **prebuild:dev**: en npm cuando escribimos una tarea con el prefijo ‘pre’ se ejecuta antes de la tarea que queramos lanzar. En este caso la tarea prebuild:dev se lanza antes que build:dev. Esta tarea lanza otras tareas necesarias como precondición para lanzar la build: primero build:services, luego build:barrel, luego build:html, y por último build:dell:dev

  *	**build:dev**: esta tarea lanza webpack-dev-server con la configuración de desarrollo, con el modo ‘hot’ activado que permite que al modificar los ficheros se recompile todo.

  *	**build:dll:pro**: genera con webpack una dll en modo producción equivalente a la tarea build:dll:dev pero con configuración de producción (minificación).

  * **prebuild:pro**: la tarea prebuild:pro se lanza antes que build:pro. Esta tarea lanza otras tareas necesarias como precondición para lanzar la build: primero build:services, luego build:barrel, luego build:html, y por último build:dell:pro

  *	**build:pro**: esta tarea lanza webpack en modo desarrollo generando los ficheros minificados, concatenados y optimizados de la SPA, sin ficheros de map.

  * **test**: lanza los tests con jest. La configuración de jest está en la parte de abajo del fichero package.json.

  * **test:watch**: ejecuta los tests con un watcher que los relanza cada vez que un fichero se modifica.

  * **test:coverage**: ejecuta los tests generando un informe de cobertura de código (especificado el output en la configuración de jest en el package.json).

  * **lint**: ejecuta la herramienta ESLINT con la configuración ubicada en el fichero .eslinrc sobre los ficheros indicados en la tarea.

  * **docs**: genera la documentación del api de los web components, resumen de tests y código javascript de la aplicación. El output y demás configuración está en el fichero npm-scripts/docs/esdoc.json

* **README.md**: fichero que contiene las instrucciones necesarias para entender la estructura del proyecto, las tareas que se pueden lanzar para desarrollar y otra información que nos permitan entender cómo desarrollar en este proyecto.

* **run.cmd**: fichero que permite lanzar con dos simples comandos: “run” ó “run pro”; los microservicios con los docker compose en modo desarrollo y producción respectivamente.
