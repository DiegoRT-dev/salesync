export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      
      <div className="flex flex-col items-center gap-3">
        
        <div className="w-10 h-10 border-4 border-btn border-t-transparent rounded-full animate-spin" />

        <p className="text-tx-secondary">
          Cargando...
        </p>

      </div>

    </div>
  );
}