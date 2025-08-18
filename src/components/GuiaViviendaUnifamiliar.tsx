import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Home, Calendar, ShieldCheck, Euro, Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export const GuiaViviendaUnifamiliar = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    
    // Aseguramos que las librerías están disponibles en el objeto window
    const { jsPDF } = window.jspdf || {};
    const html2canvas = window.html2canvas;

    const input = document.getElementById('infographic-content');
    
    if (input && html2canvas && jsPDF) {
      html2canvas(input, { 
        scale: 2, // Aumenta la escala para mejor calidad
        useCORS: true,
        backgroundColor: '#ffffff'
      }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
          });
          pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
          pdf.save("guia-propietario-vivienda-unifamiliar-EPBD2024.pdf");
          setIsDownloading(false);
        }).catch(err => {
            console.error("Error durante la generación del canvas:", err);
            toast({
                title: "Error al generar PDF",
                description: "Hubo un problema al crear la imagen de la guía.",
                variant: "destructive",
            });
            setIsDownloading(false);
        });
    } else {
        console.error("Error: No se pudo encontrar el elemento para generar el PDF o las librerías jspdf/html2canvas no están cargadas.");
        toast({
            title: "Error de carga",
            description: "Las herramientas para generar el PDF no se cargaron correctamente. Por favor, recarga la página.",
            variant: "destructive",
        });
        setIsDownloading(false);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Guía EPBD 2024 para Viviendas Unifamiliares</title>
        <meta 
          name="description" 
          content="Infografía y guía práctica de la normativa de eficiencia energética EPBD 2024 para propietarios de viviendas unifamiliares." 
        />
        <link rel="canonical" href="https://guiaepbd2024.es/guia-vivienda-unifamiliar" />
      </Helmet>
      
      <div className="bg-slate-50 min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
            {/* Contenido de la infografía que se convertirá en PDF */}
            <div id="infographic-content" className="bg-white p-8 md:p-12 shadow-lg rounded-lg">
                <header className="text-center border-b-2 border-primary pb-6 mb-8">
                    <Home className="w-12 h-12 mx-auto text-primary mb-4"/>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Guía Rápida EPBD 2024</h1>
                    <p className="text-lg text-primary font-semibold">Para Propietarios de Vivienda Unifamiliar</p>
                </header>

                {/* Sección Fechas Clave */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center"><Calendar className="w-6 h-6 mr-3 text-primary"/>Fechas Límite que NO puedes olvidar</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-amber-100 border-l-4 border-amber-500 p-4 rounded-r-lg">
                            <p className="font-bold text-amber-800 text-2xl">2030</p>
                            <p className="text-amber-700">Mínimo **Clase E** para vender o alquilar.</p>
                        </div>
                        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-r-lg">
                            <p className="font-bold text-red-800 text-2xl">2033</p>
                            <p className="text-red-700">Mínimo **Clase D** para vender o alquilar.</p>
                        </div>
                        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-r-lg col-span-1 md:col-span-2">
                            <p className="font-bold text-blue-800 text-2xl">2025</p>
                            <p className="text-blue-700">**Fin de las ayudas públicas** para instalar nuevas calderas de gas o gasóleo.</p>
                        </div>
                    </div>
                </section>

                {/* Sección Plan de Acción */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center"><ShieldCheck className="w-6 h-6 mr-3 text-primary"/>Tu Plan de Acción en 3 Pasos</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold text-lg">1</div>
                            <div>
                                <h3 className="font-bold text-gray-800">Diagnóstico: Obtén tu Certificado Energético</h3>
                                <p className="text-sm text-gray-600">Es el primer paso y es obligatorio. Te dirá la "letra" de tu casa y qué mejoras son más urgentes.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold text-lg">2</div>
                            <div>
                                <h3 className="font-bold text-gray-800">Prioriza las Mejoras Clave</h3>
                                <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                                    <li><span className="font-semibold">Aislamiento térmico:</span> La inversión más rentable para reducir tu factura.</li>
                                    <li><span className="font-semibold">Ventanas eficientes:</span> Elimina fugas de calor y frío.</li>
                                    <li><span className="font-semibold">Bomba de calor:</span> Sustituye tu caldera y accede a subvenciones.</li>
                                    <li><span className="font-semibold">Paneles solares:</span> Genera tu propia energía y mejora varias letras de golpe.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold text-lg">3</div>
                            <div>
                                <h3 className="font-bold text-gray-800">Aprovecha las Ayudas Públicas</h3>
                                <p className="text-sm text-gray-600">No empieces ninguna obra sin antes solicitar las subvenciones disponibles.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección Ayudas */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center"><Euro className="w-6 h-6 mr-3 text-primary"/>Financiación y Ahorro</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-50 p-6 rounded-lg text-center">
                            <p className="text-sm text-green-700">Subvenciones Next Generation</p>
                            <p className="text-4xl font-bold text-green-600 my-2">Hasta 80%</p>
                            <p className="text-xs text-gray-600">del coste de la obra cubierto.</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-lg text-center">
                            <p className="text-sm text-green-700">Deducciones en IRPF</p>
                            <p className="text-4xl font-bold text-green-600 my-2">Hasta 60%</p>
                            <p className="text-xs text-gray-600">de la inversión (máx. 15.000€).</p>
                        </div>
                    </div>
                </section>

                <footer className="text-center mt-10 pt-6 border-t">
                    <p className="text-gray-600 font-semibold">¡No esperes al último momento! Adapta tu vivienda y empieza a ahorrar.</p>
                    <p className="text-xs text-gray-500 mt-2">Guía informativa basada en la Directiva (UE) 2024/1275.</p>
                </footer>
            </div>

            {/* Botón de descarga fuera del contenido del PDF */}
            <div className="mt-8 text-center">
                <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                    {isDownloading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Generando PDF...
                        </>
                    ) : (
                        <>
                            <Download className="w-5 h-5" />
                            Descargar Guía en PDF
                        </>
                    )}
                </button>
            </div>
        </div>
      </div>
    </HelmetProvider>
  );
};
