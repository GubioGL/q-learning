import type { LevelText } from "@/lib/lesson";
import bits from "./bits";
import portasLogicas from "./portas-logicas";
import ascii from "./ascii";
import reversiveis from "./reversiveis";
import qubit from "./qubit";
import medida from "./medida";
import portas1Qubit from "./portas-1-qubit";
import esferaDeBloch from "./esfera-de-bloch";
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

const texts: Record<string, LevelText> = {
    bits,
    "portas-logicas": portasLogicas,
    ascii,
    reversiveis,
    qubit,
    medida,
    "portas-1-qubit": portas1Qubit,
    "esfera-de-bloch": esferaDeBloch,
    circuitos,
    vetores,
    "produto-interno": produtoInterno,
    projecoes,
    unitarias,
    "produto-externo": produtoExterno,
    unitariedade,
    "produto-tensorial": produtoTensorial,
    "medida-multiplos": medidaMultiplos,
    emaranhamento,
    "cnot-toffoli": cnotToffoli,
    "nao-clonagem": naoClonagem,
    universalidade,
    bell,
    chsh,
    superdensa,
    teletransporte,
    bb84,
};

export default texts;
