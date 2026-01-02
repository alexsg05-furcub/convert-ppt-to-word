document.getElementById("convertBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");

  if (!fileInput.files.length) {
    status.textContent = "Selecciona un archivo PPT o PPTX";
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  status.textContent = "Convirtiendo...";

  try {
    const response = await fetch("/convert", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      status.textContent = "Error en la conversión";
      return;
    }

    // Crear blob y URL
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    // Crear enlace temporal
    const a = document.createElement("a");
    a.href = url;
    a.download = "resultado.docx";
    
    // Este paso asegura que la descarga se dispare automáticamente
    document.body.appendChild(a); // necesario en algunos navegadores
    a.click();
    document.body.removeChild(a); // limpiar

    // Liberar memoria
    URL.revokeObjectURL(url);

    status.textContent = "Conversión completada y archivo descargado";

  } catch (error) {
    console.error(error);
    status.textContent = "Ocurrió un error al conectar con el backend";
  }
});
