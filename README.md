# Trianafy
IMPORTANTE LEER

En caso de querer más datos de ejemplo, estos se encuentran en la carpeta Data en formato json. 
Estos pueden traerse con un mongoimport o meterlos manualmente con el postman.
Las listas deben crearse una vez se importen el ususario y las canciones.
El programa ya trae en el indes.js cargado una serie de datos de ejemplo.

¡¡¡ IMPORTANTE !!!
Estos datos estan comentados en un principio, SOLO DEBEN EJECUTARSE una sola vez.
1º Descomentar la lineas donde pone DATOS DE EJEMPLO hasta FIN DATOS DE EJEMPLO
2º volver a comentar tras iniciar el proyecto para que no se vuelvan a agregar en caso de reiniciar el programa.

.ENV
# Puerto
PORT=3000

# Secreto para la encriptación
JWT_SECRET=laSeguridadEsMiMayorEnemigoEnEstaVida

# Número de rondas utiliadas para el algoritmo de hashing de la contraseña
BCRYPT_ROUNDS=12

# Vida del token
JWT_LIFETIME=1d

# Algoritmo utilizado para el cifrado del token
JWT_ALGORITHM=HS256

# Base de Datos
DB_URI=mongodb://localhost:27017/trianafy
