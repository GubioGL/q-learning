import { getCursosServer } from "@/db/server-query";
import CursosClient from "./cursos-client";

export default async function CursosPageServer() {
    // Busca dados no servidor
    const cursosData = await getCursosServer();
    
    return <CursosClient initialCursos={cursosData} />;
} 