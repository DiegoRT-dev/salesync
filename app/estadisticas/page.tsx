import Estadisticas from "@/components/Estadisticas";

export default function EstadisticasPage(){
    return(
        <div className="bg-secondary min-h-full p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold text-head mb-6">Estadisticas</h1>
            <Estadisticas />
            </div>
        </div>
    );
}