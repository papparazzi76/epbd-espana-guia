import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Search, Calendar, ShieldCheck, Euro, Download, Loader2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export const FuturoComprador = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Descarga iniciada",
        description: "La guía para futuros compradores se descargará próximamente.",
      });
      setIsDownloading(false);
    }, 1000);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Guía EPBD 2024 para Futuros Compradores</title>
        <meta name="description" content="Infografía y guía de la normativa EPBD 2024 para compradores de vivienda. Conoce qué aspectos evaluar antes de comprar." />
        <link rel="canonical" href="https://guiaepbd2024.es/guia-futuro-comprador" />
      </Helmet>
      
      <div className="bg-slate-50 min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
            <div id="infographic-comprador-content" className="bg-white p-8 md:p-12 shadow-lg rounded-lg">
                <header className="text-center border-b-2 border-primary pb-6 mb-8">
                    <Search className="w-12 h-12 mx-auto text-primary mb-4"/>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Guía Rápida EPBD 2024</h1>
                    <p className="text-lg text-primary font-semibold">Para Futuros Compradores de Vivienda</p>
                </header>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center"><AlertTriangle className="w-6 h-6 mr-3 text-red-500"/>¿Qué debo revisar antes de comprar?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-r-lg">
                            <h3 className="font-bold text-blue-800 text-lg mb-2">Certificado Energético</h3>
                            <p className="text-blue-700 text-sm">Exige ver el CEE actualizado. Una vivienda Clase F y G podría quedar **sin poder venderse** a partir de 2030.</p>
                        </div>
                        <div className="bg-amber-100 border-l-4 border-amber-500 p-4 rounded-r-lg">
                            <h3 className="font-bold text-amber-800 text-lg mb-2">Coste de Reformas</h3>
                            <p className="text-amber-700 text-sm">Si la vivienda es F o G, calcula **entre 10.000-30.000€** adicionales para cumplir la normativa.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center"><Calendar className="w-6 h-6 mr-3 text-primary"/>Fechas Clave para tu Compra</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-r-lg">
                            <p className="font-bold text-green-800 text-xl">2024-2030</p>
                            <p className="text-green-700 text-sm">Ventana ideal para comprar viviendas F/G con **descuento** y reformarlas.</p>
                        </div>
                        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-r-lg">
                            <p className="font-bold text-red-800 text-xl">2030</p>
                            <p className="text-red-700 text-sm">Obligación de acometer mejoras para la reducción de consumo un 16%.</p>
                        </div>
                        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-r-lg">
                            <p className="font-bold text-red-800 text-xl">2035</p>
                            <p className="text-red-700 text-sm">Obligación de acometer mejoras para la reducción de consumo un 22%.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center"><ShieldCheck className="w-6 h-6 mr-3 text-primary"/>Checklist del Comprador Inteligente</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold text-lg">1</div>
                            <div>
                                <h3 className="font-bold text-gray-800">Solicita el Certificado Energético Actualizado</h3>
                                <p className="text-sm text-gray-600">No aceptes uno de hace más de 10 años (no tienen validez). Debe reflejar el estado actual de la vivienda.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold text-lg">2</div>
                            <div>
                                <h3 className="font-bold text-gray-800">Evalúa el Potencial de Mejora</h3>
                                <p className="text-sm text-gray-600">Pregunta por las medidas recomendadas en el CEE. Algunas mejoras son más fáciles y baratas que otras.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold text-lg">3</div>
                            <div>
                                <h3 className="font-bold text-gray-800">Negocia el Precio en Base a las Reformas</h3>
                                <p className="text-sm text-gray-600">Si necesita reformas para cumplir la normativa, ese coste debe reflejarse en una rebaja del precio de venta.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center"><Euro className="w-6 h-6 mr-3 text-primary"/>Oportunidades y Financiación</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-50 p-6 rounded-lg">
                            <h3 className="font-semibold text-green-800 mb-2">Oportunidades ✅</h3>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                <li>Comprar viviendas F/G con **descuento significativo**.</li>
                                <li>Acceder a **subvenciones del 80%** para reformas.</li>
                                <li>Revalorizar la vivienda tras las mejoras energéticas.</li>
                            </ul>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="font-semibold text-blue-800 mb-2">Financiación Disponible</h3>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                <li>**Préstamos verdes** con tipos de interés más bajos.</li>
                                <li>**Deducciones IRPF** hasta 15.000€ por mejoras energéticas.</li>
                                <li>**Fondos Next Generation** para rehabilitación integral.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <footer className="text-center mt-10 pt-6 border-t">
                    <p className="text-gray-600 font-semibold">Compra con conocimiento: una vivienda eficiente es una inversión segura.</p>
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
