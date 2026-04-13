import ProductList from "@/components/ProductList";
export default function Productos(){
    return(
        <div className="min-h-full p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-head">Lista de Productos</h1>
                </div>
            <div className="p-6">
                <ProductList />
            </div>
            </div>
        </div>
    );
}