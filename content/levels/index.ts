import type { Lesson } from "@/lib/lesson";
import bits from "./bits";
import portasLogicas from "./portas-logicas";
import ascii from "./ascii";
import reversiveis from "./reversiveis";
import qubit from "./qubit";
import medida from "./medida";
import portas1Qubit from "./portas-1-qubit";
import circuitos from "./circuitos";
import vetores from "./vetores";
import produtoInterno from "./produto-interno";
import projecoes from "./projecoes";
import unitarias from "./unitarias";
import produtoExterno from "./produto-externo";
import unitariedade from "./unitariedade";
import produtoTensorial from "./produto-tensorial";
import medidaMultiplos from "./medida-multiplos";
import emaranhamento from "./emaranhamento";
import cnotToffoli from "./cnot-toffoli";
import naoClonagem from "./nao-clonagem";
import universalidade from "./universalidade";
import bell from "./bell";
import chsh from "./chsh";
import superdensa from "./superdensa";
import teletransporte from "./teletransporte";
import bb84 from "./bb84";

// The challenge trail, from the most basic level to the most advanced. Order matters: each level unlocks the next.
export const levels: Lesson[] = [
    bits,
    portasLogicas,
    ascii,
    reversiveis,
    qubit,
    medida,
    portas1Qubit,
    circuitos,
    vetores,
    produtoInterno,
    projecoes,
    unitarias,
    produtoExterno,
    unitariedade,
    produtoTensorial,
    medidaMultiplos,
    emaranhamento,
    cnotToffoli,
    naoClonagem,
    universalidade,
    bell,
    chsh,
    superdensa,
    teletransporte,
    bb84,
];

export const findLevel = (id: string) => levels.find((l) => l.id === id);
