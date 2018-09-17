# Introducción

Completa este apartado con la descripción funcional de alto nivel del proyecto. De permitir poder describir con pocas palabras la empresa, contexto y alcance de la aplicación.

# Cómo empezar

Lo primero que debes hacer es instalar [Docker for windows](https://download.docker.com/win/stable/Docker%20for%20Windows%20Installer.exe) y después ejecutar la aplicación en modo desarrollo con el comando:

```bash
    run
```

Esto ejecutará la **instalación de paquetes NPM** y levantará la aplicación en **http://localhost:8080**, desde donde podrás acceder y visualizar la aplicación. 

Lo siguiente que debes hacer es **generar la documentación** siguiendo los pasos del punto siguiente, y por último debes **instalar las extensiones** que te permitirán tener una mejor experiencia de desarrollo.

# Cómo ejecutar la aplicación

Puedes ejecutar la aplicación en docker (hay que tener instalado Docker for windows/linux) en modo desarrollo:

```bash
    run.cmd
```

o en modo producción:


```bash
    run.cmd pro
```

# ¿Qué tareas puedo ejecutar? (build, test, lint.. etc)

Si estás leyendo la documentación generada en formato HTML, accede a la sección *Aditional documentation*, en el sub-apartado de **Tareas de desarrolo** para ver todas las tareas que puedes ejecutar. 

Si lo estás leyendo en markdown, ve al fichero *./manual/developmentTasks.md* para ver la información relativa a qué tareas puedes lanzar y cómo lanzarlas.

# Cómo generar la documentación

Para generar la documentación tenemos dos formas dependiendo de si tenemos o no node y npm instalados. 

* Si tenemos Node + npm instalados y ejecutamos el *npm install* sobre el directorio, debemos abrir una consola en la ruta de la SPA y ejecutar el comando:

```bash
    npm run docs
```

* Si **NO** tenemos Node + npm instalados debemos acceder al container de docker (habiendo ejecutado la aplicación descrito en el punto *Cómo empezar*) y después ejecutar el comando de npm:

Si no está ejecutándose la aplicación, la ejecutamos:

```bash
    run
```
    
Obtenemos las primera letras del identificador del container levantado por docker ejecutando:

```bash
    docker ps
```

donde veremos el identificador del container para la app *dev_app-spa-dev*:

![Structure](./assets/docker_ps.png)
    
y luego nos conectamos a su consola poniendo las primeras letras del identificador del contenedor:

```bash
    docker exec -it f2623 bash
```

y dentro del container ejecutamos el script para generar la documentación:

```bash
    npm run docs
```

![Structure](./assets/docker_exec_and_npm_run_docs.png)
    
Lo **recomendable** para entender el proyecto es generar la documentación y leerla con el formato html generado en *dist/docs/index.html*.

Si no dispones de la posibilidad de utilizar la opción recomendable, puedes leer el texto plano en 3 ubicaciones del proyecto:

- **manuales**: en la carpeta *manual*. Contiene explicaciones de alto nivel de cada aspecto del proyecto.
- **api**: la api de los componentes puedes encontrarla con comentarios sobre el código de dichos componentes en formato esdoc.
- **tests**: los tests documentan casos de uso de cada componente. Puedes encontrar los tests de cada componente en su propia carpeta accediendo a la sub-carpeta *specs*.

# Configura tu editor

Si usas **Visual Studio Code**, instala las extensiones para TSLINT y lector de configuración:

    * **EditorConfig**: https://github.com/editorconfig/editorconfig-vscode

    * **TSLint**: https://github.com/Microsoft/vscode-tslint

En el caso de que no lo utilices, te recomendamos instalar las extensiones/plugins equivalentes para tu editor. 
