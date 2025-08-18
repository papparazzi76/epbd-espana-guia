import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Key, AlertTriangle, Download, Loader2, ShieldCheck, Euro } from 'lucide-react';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export const GuiaArrendador = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    // Simulate PDF download with toast notification
    setTimeout(() => {
      toast({
        title: "Descarga simulada",
        description: "La descarga del PDF se ha simulado correctamente.",
      });
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Guía EPBD 2024 para Arrendadores de Viviendas</title>
        <meta name="description" content="Infografía y guía de la normativa EPBD 2024 para arrendadores. Conoce tus obligaciones, fechas clave y cómo te afecta." />
        <link rel="canonical" href="https://guiaepbd2024.es/guia-arrendador" />
      </Helmet>
      
      <div className="bg-slate-50 min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
            <div id="infographic-arrendador-content" className="bg-white p-8 md:p-12 shadow-lg rounded-lg">
                <header className="text-center border-b-2 border-primary pb-6 mb-8">
                    <Key className="w-12 h-12 mx-auto text-primary mb-4"/>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Guía Rápida EPBD 2024</h1>
                    <p className="text-lg text-primary font-semibold">Para Arrendadores de Viviendas</p>
                </header>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center"><AlertTriangle className="w-6 h-6 mr-3 text-red-500"/>Fechas de Prohibición para Alquilar</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-r-lg">
                            <p className="font-bold text-red-800 text-2xl">2033</p>
                            <p className="text-red-700">Prohibido alquilar viviendas **Clase G**.</p>
                        </div>
                        <div className="bg-amber-100 border-l-4 border-amber-500 p-4 rounded-r-lg">
                            <p className="font-bold text-amber-800 text-2xl">2035</p>
                            <p className="text-amber-700">Prohibido alquilar viviendas **Clase F**.</p>
                        </div>
                         <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-r-lg">
                            <p className="font-bold text-blue-800 text-2xl">2025</p>
                            <p className="text-blue-700">**Fin de ayudas** para calderas de gas.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center"><ShieldCheck className="w-6 h-6 mr-3 text-primary"/>Tus Obligaciones Principales</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold text-lg">1</div>
                            <div>
                                <h3 className="font-bold text-gray-800">Certificado Energético Válido y Visible</h3>
                                <p className="text-sm text-gray-600">Es obligatorio incluir la calificación energética en todos los anuncios de alquiler.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold text-lg">2</div>
                            <div>
                                <h3 className="font-bold text-gray-800">Cumplir los Estándares Mínimos (MEPS)</h3>
                                <p className="text-sm text-gray-600">Planifica las reformas necesarias en tus inmuebles de clase F y G para poder seguir alquilándolos legalmente.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold text-lg">3</div>
                            <div>
                                <h3 className="font-bold text-gray-800">Informar al Inquilino</h3>
                                <p className="text-sm text-gray-600">Debes proporcionar información sobre la eficiencia energética de la vivienda en el contrato de arrendamiento.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center"><Euro className="w-6 h-6 mr-3 text-primary"/>Recomendaciones Estratégicas</h2>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-50 p-6 rounded-lg">
                            <h3 className="font-semibold text-green-800 mb-2">Recomendado ✅</h3>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                <li>Actúa primero sobre las viviendas de **Clase G**.</li>
                                <li>Invierte en mejoras que **aumenten el valor y la renta** del alquiler (aislamiento, bomba de calor).</li>
                            </ul>
                        </div>
                        <div className="bg-red-50 p-6 rounded-lg">
                            <h3 className="font-semibold text-red-800 mb-2">Evita ❌</h3>
                             <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                <li>**No esperes a 2032** para empezar a reformar.</li>
                                <li>**No ignores las viviendas de Clase F**, también quedarán fuera del mercado.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <footer className="text-center mt-10 pt-6 border-t">
                    <p className="text-gray-600 font-semibold">Una vivienda eficiente atrae mejores inquilinos y reduce la rotación.</p>
                    <p className="text-xs text-gray-500 mt-2">Guía informativa basada en la Directiva (UE) 2024/1275.</p>
                </footer>
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                    {isDownloading ? <><Loader2 className="w-5 h-5 animate-spin" />Generando...</> : <><Download className="w-5 h-5" />Descargar Guía PDF</>}
                </button>
            </div>
        </div>
      </div>
    </HelmetProvider>
  );
};