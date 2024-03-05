
function ingresarIP() {
  let ip; // Se inicializa la variable 'ip'
  do {
    ip = prompt("Ingrese su IP:");
  } while (!isNaN(ip)); // Se valida la IP con la función 'validar'

  return ip;
}

  const direccionIP = ingresarIP();
    
    // funcion validar ip
 function validarIP(direccionIP) {
    const octetos = direccionIP.split(".");
    if (octetos.length !== 4) {
      return false;
    }
    for (let i = 0; i < octetos.length; i++) {
        const octeto = octetos[i];
      if (isNaN(octeto)) {
        return false;
      }
      const numero = parseInt(octeto);
      if (numero < 0 || numero > 255) {
        return false;
      }
    }
    return true;
  }
  const validar = validarIP(direccionIP);
  

  if (validarIP(direccionIP)) {
    console.log("La dirección IP es válida");
  } else {
    console.log("La dirección IP no es válida");
  }

     // funcion clasificar ip 
  function obtenerClaseIP(direccionIP) {
    const octetos = direccionIP.split(".");
    const primerOcteto = parseInt(octetos[0]);
  
    if (primerOcteto >= 0 && primerOcteto <= 127) {
      return ("Clase A");
    } else if (primerOcteto >= 128 && primerOcteto <= 191) {
      return ("Clase B");
    } else if (primerOcteto >= 192 && primerOcteto <= 223) {
      return ("Clase C");
    } else if (primerOcteto >= 224 && primerOcteto <= 239) {
      return ("Clase D");
    } else {
      return ("Clase E");
    }
  }
       // funcion para bloquear ip de la 122 a 127
  function bloquearIP(direccionIP){
    const octetos = direccionIP.split(".");
    const primerOcteto = parseInt(octetos[0]);
  
    if (primerOcteto >= 112 && primerOcteto <= 127) {
      return (" bloqueada");
    }else /*if(primerOcteto <= 112 && primerOcteto >= 127)*/{ 
      return ("libre");
    }
    
}

  
  const claseIP = obtenerClaseIP(direccionIP);
  const ipbloqueada = bloquearIP(direccionIP);
  alert("La dirección IP " + direccionIP + " es de: " + claseIP + " y esta " + ipbloqueada);

  function generarNombreAleatorio() {
    const nombres = ["Juan", "María", "Pedro", "Ana", "José", "Rosa", "Luis", "Camila"];
    return nombres[Math.floor(Math.random() * nombres.length)];
  }

  function generarEstadoAleatorio() {
    const estados = ["Activo", "Inactivo", "Suspendido"];
    return estados[Math.floor(Math.random() * estados.length)];
  }
  function generarPaisAleatorio() {
    const paises = ["Argentina", "Brasil", "Chile", "Colombia", "Ecuador", "México", "Perú", "Uruguay", "Venezuela"];
    return paises[Math.floor(Math.random() * paises.length)];
  }
 

  const ips = [];
  for(let i = 0; i < 3; i++){
  ips.push({
    ip: ingresarIP(),
    claseIP,
    responsable: generarNombreAleatorio(),
    estado: generarEstadoAleatorio(),
    pais: generarPaisAleatorio(),
  });
  }
for (const ip of ips) {
  console.log(`Dirección IP: ${ip.ip}`);
  console.log(`Clase: ${ip.claseIP}`);
  console.log(`Responsable: ${ip.responsable}`);
  console.log(`Estado: ${ip.estado}`);
  console.log(`País: ${ip.pais}`);
  console.log("---");
}

function filtrarIPs(ips) {
  const pais = prompt("Ingrese el país a filtrar (dejar vacío para no filtrar):");
  const nombre = prompt("Ingrese el nombre del responsable a filtrar (dejar vacío para no filtrar):");
  const claseIP = prompt("Ingrese la clase IP a filtrar (dejar vacío para no filtrar):");

  const resultados = ips.filter(
    (ip) =>
      (pais === "" || ip.pais === pais) &&
      (nombre === "" || ip.responsable.includes(nombre)) &&
      (claseIP === "" || ip.claseIP === claseIP)
  );

  if (resultados.length === 0) {
    console.log("No se encontraron resultados");
  }

  // Bloque 'else' innecesario eliminado
  console.log("Resultados encontrados:");
  for (const resultado of resultados) {
    console.log(`- IP: ${resultado.ip}`);
    console.log(`  Clase: ${resultado.claseIP}`);
    console.log(`  Responsable: ${resultado.responsable}`);
    console.log(`  Estado: ${resultado.estado}`);
    console.log(`  País: ${resultado.pais}`);
    console.log("---");
  }
}
filtrarIPs(ips);