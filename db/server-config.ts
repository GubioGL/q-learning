import { config } from "dotenv";

// Carrega as variáveis de ambiente apenas no servidor
if (typeof window === "undefined") {
    config();
}

export {}; 