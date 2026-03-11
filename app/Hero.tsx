
export default function Hero() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <h1 className="text-primary text-4xl font-bold mb-4 ">Eventus</h1>
            <p className="text-lg mb-6 text-gray-700">
                Encontre os melhores eventos na sua região e participe de experiências incríveis!
            </p>
            <button className="bg-primary text-white px-6 py-3 rounded-lg transition">
                Explorar Eventos
            </button>
        </main>
    );
}