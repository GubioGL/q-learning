import type { Locale } from "@/lib/i18n/locales";
import type { Lesson, LevelText } from "@/lib/lesson";
import en from "./en";
import es from "./es";
import bits from "./bits";
import portasLogicas from "./portas-logicas";
import ascii from "./ascii";
import reversiveis from "./reversiveis";
import qubit from "./qubit";
import medida from "./medida";
import esferaDeBloch from "./esfera-de-bloch";
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
import algebraBooleana from "./algebra-booleana";
import somadores from "./somadores";
import qubitsFisicos from "./qubits-fisicos";
import numerosComplexos from "./numeros-complexos";
import identidadesDeCircuito from "./identidades-de-circuito";
import hermitianas from "./hermitianas";
import somadorQuantico from "./somador-quantico";
import registradores from "./registradores";
import rotacoes from "./rotacoes";
import oraculos from "./oraculos";
import deutschJozsa from "./deutsch-jozsa";
import bernsteinVazirani from "./bernstein-vazirani";
import grover from "./grover";
import qft from "./qft";
import estimacaoDeFase from "./estimacao-de-fase";
import shor from "./shor";
import hhl from "./hhl";
import modeloCoprocessador from "./modelo-coprocessador";
import complexidade from "./complexidade";
import portasNativas from "./portas-nativas";
import estadosMagicos from "./estados-magicos";
import mbqc from "./mbqc";
import opticaLinear from "./optica-linear";
import trotterizacao from "./trotterizacao";
import vqe from "./vqe";
import qaoa from "./qaoa";

// The challenge trail, from the most basic level to the most advanced. Order matters: each level unlocks the next.
export const levels: Lesson[] = [
    bits,
    portasLogicas,
    algebraBooleana,
    somadores,
    ascii,
    reversiveis,
    qubit,
    medida,
    portas1Qubit,
    esferaDeBloch,
    qubitsFisicos,
    circuitos,
    numerosComplexos,
    vetores,
    produtoInterno,
    projecoes,
    unitarias,
    identidadesDeCircuito,
    produtoExterno,
    unitariedade,
    hermitianas,
    produtoTensorial,
    medidaMultiplos,
    emaranhamento,
    cnotToffoli,
    somadorQuantico,
    registradores,
    naoClonagem,
    rotacoes,
    universalidade,
    bell,
    chsh,
    superdensa,
    teletransporte,
    bb84,
    oraculos,
    deutschJozsa,
    bernsteinVazirani,
    grover,
    qft,
    estimacaoDeFase,
    shor,
    hhl,
    modeloCoprocessador,
    complexidade,
    portasNativas,
    estadosMagicos,
    mbqc,
    opticaLinear,
    trotterizacao,
    vqe,
    qaoa,
];

const TEXTS: Partial<Record<Locale, Record<string, LevelText>>> = { en, es };

// Levels in the visitor's language; what is not translated yet stays in Portuguese.
export function getLevels(locale: Locale): Lesson[] {
    return levels.map((level) => {
        const text = TEXTS[locale]?.[level.id];
        if (!text) return level;
        return {
            ...level,
            ...text,
            challenges: level.challenges.map((c, i) => ({ ...c, ...text.challenges[i] })),
        };
    });
}

export const findLevel = (id: string, locale: Locale) => getLevels(locale).find((l) => l.id === id);
