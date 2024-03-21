
let ipsGuardadas = []; 

 // Funcion validar IP

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

// Funcion mostrar las ip guardadas en el array

function mostrarIPsGuardadas() {
  const ipsList = document.getElementById('ipsList');
  ipsList.innerHTML = ''; 
  ipsGuardadas.forEach(ipData => {
    const listItem = document.createElement('li');
    listItem.textContent = `IP: ${ipData.ip}, Clase: ${ipData.claseIP}, Responsable: ${ipData.responsable}, Estado: ${ipData.estado}, País: ${ipData.pais}`;
    ipsList.appendChild(listItem);
  });
}

document.getElementById("ipForm").addEventListener("submit", function(event) {
  event.preventDefault(); 
  // Capturamos la IP ingresada
  const direccionIP = document.getElementById("ipInput").value.trim(); 
  const validar = validarIP(direccionIP); 
  if (validar) { 
    console.log("La dirección IP es válida");
    console.log("Clase de IP:", obtenerClaseIP(direccionIP)); 
    console.log("Estado de la IP:", bloquearIP(direccionIP)); 
    
    // Agregar la IP al array de IPs guardadas junto con otros datos
    ipsGuardadas.push({
      ip: direccionIP,
      claseIP: obtenerClaseIP(direccionIP),
      responsable: obtenerResponsableAleatorio(),
      estado: obtenerEstadoAleatorio(),
      pais: obtenerPaisAleatorio()
    });

    // Actualizar el archivo JavaScript con las IPs guardadas
    actualizarIPsJavaScript();
  } else {
    console.log("La dirección IP no es válida");
  }
});

function obtenerResponsableAleatorio() {
  const responsables = ["Juan", "María", "Pedro", "Ana", "José", "Rosa", "Luis", "Camila"];
  return responsables[Math.floor(Math.random() * responsables.length)];
}

function obtenerEstadoAleatorio() {
  const estados = ["Activo", "Inactivo", "Suspendido"];
  return estados[Math.floor(Math.random() * estados.length)];
}

function obtenerPaisAleatorio() {
  const paises = ["Argentina", "Brasil", "Chile", "Colombia", "Ecuador", "México", "Perú", "Uruguay", "Venezuela"];
  return paises[Math.floor(Math.random() * paises.length)];
}

function actualizarIPsJavaScript() {
  // Convertir el array de IPs guardadas a JSON 
  const contenido = `let ipsGuardadas = ${JSON.stringify(ipsGuardadas)};`;

  const blob = new Blob([contenido], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);

  const script = document.createElement("script");
  script.src = url;

  const existingScript = document.getElementById("ipsScript");
  if (existingScript) {
    existingScript.parentNode.removeChild(existingScript);
  }

  script.id = "ipsScript";
  document.body.appendChild(script);

  mostrarIPsGuardadas();
}
   //funcion separar clases de ip
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

function bloquearIP(direccionIP) {
  const octetos = direccionIP.split(".");
  const primerOcteto = parseInt(octetos[0]);

  if (primerOcteto >= 112 && primerOcteto <= 127) {
    return ("Bloqueada");
  } else {
    return ("Libre");
  }
}
   
function mostrarResultados(resultados) {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "";

  if (resultados.length === 0) {
    resultadoDiv.textContent = "No se encontraron resultados";
  } else {
    const lista = document.createElement("ul");
    resultados.forEach(ip => {
      
      const item = document.createElement("li");
      item.textContent = `IP: ${ip.ip}, Clase: ${ip.claseIP}, Responsable: ${ip.responsable}, Estado: ${ip.estado}, País: ${ip.pais}`;
      lista.appendChild(item);
    });
    resultadoDiv.appendChild(lista);
  }
}
//capturar datos para filtrar,  y evita que el formulariorecargue la pagina cuando se envia


document.getElementById("filtroForm").addEventListener("submit", function(event) {
  event.preventDefault(); 
  
  const pais = document.getElementById("pais").value;
  const responsable = document.getElementById("responsable").value;
  const clases = Array.from(document.querySelectorAll('input[name="clase"]:checked')).map(el => el.value);

  filtrarIPs(pais, responsable, clases);
});

function filtrarIPsGuardadas(pais, responsable, clases) {
  const resultados = ipsGuardadas.filter(ip => {
    return (!pais || ip.pais.toLowerCase().includes(pais.toLowerCase())) &&
           (!responsable || ip.responsable.toLowerCase().includes(responsable.toLowerCase())) &&
           (clases.length === 0 || clases.includes(ip.claseIP));
  });

  mostrarResultados(resultados);
}
