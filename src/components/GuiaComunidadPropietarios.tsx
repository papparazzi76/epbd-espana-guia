import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Building, Calendar, ShieldCheck, Euro, Download, Loader2, Users } from 'lucide-react';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export const GuiaComunidadPropietarios = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Descarga iniciada",
        description: "La guía para comunidades de propietarios se descargará próximamente.",
      });
      setIsDownloading(false);
    }, 1000);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Guía EPBD 2024 para Comunidades de Propietarios</title>
        <meta 
          name="description" 
          content="Infografía y guía práctica de la normativa EPBD 2024 para comunidades de propietarios y administradores de fincas." 
        />
        <link rel="canonical" href="https://guiaepbd2024.es/guia-comunidad-propietarios" />
      </Helmet>
      
      <div className="bg-slate-50 min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
            <div id="infographic-comunidad-content" className="bg-white p-8 md:p-12 shadow-lg rounded-lg">
                <header className="text-center border-b-2 border-primary pb-6 mb-8">
                    <Building className="w-12 h-12 mx-auto text-primary mb-4"/>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Guía Rápida EPBD 2024</h1>
                    <p className="text-lg text-primary font-semibold">Para Comunidades de Propietarios</p>
                </header>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center"><Calendar className="w-6 h-6 mr-3 text-primary"/>Fechas Clave para la Comunidad</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-r-lg">
                            <p className="font-bold text-blue-800 text-2xl">2025</p>
                            <p className="text-blue-700">La nueva normativa debe estar **traspuesta a la legislación española**.</p>
                        </div>
                        <div className="bg-amber-100 border-l-4 border-amber-500 p-4 rounded-r-lg">
                            <p className="font-bold text-amber-800 text-2xl">2027</p>
                            <p className="text-amber-700">**Obligación de instalar paneles solares** en renovaciones importantes de edificios.</p>
                        </div>
                        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-r-lg col-span-1 md:col-span-2">
                            <p className="font-bold text-red-800 text-2xl">2033</p>
                            <p className="text-red-700">Los edificios deben tener como mínimo la **Clase D** para poder vender o alquilar sus viviendas.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center"><ShieldCheck className="w-6 h-6 mr-3 text-primary"/>Plan de Acción para la Comunidad</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold text-lg">1</div>
                            <div>
                                <h3 className="font-bold text-gray-800">Convocar Junta e Informar</h3>
                                <p className="text-sm text-gray-600">El primer paso es informar a todos los propietarios sobre las nuevas obligaciones y los beneficios de actuar pronto.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold text-lg">2</div>
                            <div>
                                <h3 className="font-bold text-gray-800">Auditoría y Certificado Energético del Edificio</h3>
                                <p className="text-sm text-gray-600">Contratar a un técnico para obtener el CEE del edificio completo. Este documento es la base para planificar la renovación.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold text-lg">3</div>
                            <div>
                                <h3 className="font-bold text-gray-800">Plan de Renovación y Ayudas</h3>
                                <p className="text-sm text-gray-600">Definir un plan de mejoras por fases (fachada, cubierta, calderas, solar) y solicitar las ayudas específicas para comunidades.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center"><Euro className="w-6 h-6 mr-3 text-primary"/>Financiación y Ayudas para Comunidades</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-50 p-6 rounded-lg text-center">
                            <p className="text-sm text-green-700">Subvenciones para Edificios</p>
                            <p className="text-4xl font-bold text-green-600 my-2">Hasta 80%</p>
                            <p className="text-xs text-gray-600">del coste en rehabilitación integral (Fondos NextGen).</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-lg text-center">
                            <p className="text-sm text-green-700">Deducción IRPF por propietario</p>
                            <p className="text-4xl font-bold text-green-600 my-2">Hasta 60%</p>
                            <p className="text-xs text-gray-600">de la inversión individual (máx. 15.000€).</p>
                        </div>
                    </div>
                     <div className="mt-6 bg-blue-50 p-4 rounded-lg text-center">
                        <p className="font-semibold text-blue-800 flex items-center justify-center gap-2"><Users className="w-5 h-5"/> ¡Importante!</p>
                        <p className="text-sm text-blue-700 mt-1">Las ayudas para comunidades suelen ser más generosas y cubren actuaciones de gran impacto como el aislamiento de la fachada (SATE).</p>
                    </div>
                </section>

                <footer className="text-center mt-10 pt-6 border-t">
                    <p className="text-gray-600 font-semibold">Una rehabilitación energética integral revaloriza todo el edificio.</p>
                    <p className="text-xs text-gray-500 mt-2">Guía informativa basada en la Directiva (UE) 2024/1275.</p>
                </footer>
            </div>

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
