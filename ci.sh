#!/bin/bash

# Levantar los servicios de Docker en segundo plano
docker-compose up -d

# Esperar a que los servicios estén listos (puedes ajustar el tiempo de espera si es necesario)
echo "Esperando a que los servicios estén listos..."
#sleep 10

# Ejecutar los tests de Cypress y obtener el resultado
cd tests && npm install && npm run test
exit_code=$?

# Si los tests fallan, iniciar el proceso de fix de tests
