"""Um simulador de computador quântico em NumPy, para o capítulo "Hands on" do livro.

Convenção: o qubit 0 é o mais à esquerda (bit mais significativo), como em np.kron e no site.
Rode `python3 simulador.py` para executar os exemplos e as checagens.
"""
import numpy as np

# --- 1. Estados ---------------------------------------------------------------

def ket(bits: str) -> np.ndarray:
    """Estado da base, por exemplo ket("01") = |01>."""
    estado = np.zeros(2 ** len(bits), dtype=complex)
    estado[int(bits, 2)] = 1
    return estado


# --- 2. Portas de 1 qubit -----------------------------------------------------

I = np.eye(2, dtype=complex)
X = np.array([[0, 1], [1, 0]], dtype=complex)
Y = np.array([[0, -1j], [1j, 0]], dtype=complex)
Z = np.array([[1, 0], [0, -1]], dtype=complex)
H = np.array([[1, 1], [1, -1]], dtype=complex) / np.sqrt(2)
S = np.diag([1, 1j])
T = np.diag([1, np.exp(1j * np.pi / 4)])


def Rx(theta: float) -> np.ndarray:
    return np.cos(theta / 2) * I - 1j * np.sin(theta / 2) * X


def Ry(theta: float) -> np.ndarray:
    return np.cos(theta / 2) * I - 1j * np.sin(theta / 2) * Y


def Rz(theta: float) -> np.ndarray:
    return np.cos(theta / 2) * I - 1j * np.sin(theta / 2) * Z


# --- 3. Aplicar portas num registrador de n qubits ----------------------------

def aplicar(estado: np.ndarray, porta: np.ndarray, alvo: int) -> np.ndarray:
    """Aplica uma porta de 1 qubit no qubit `alvo`: kron(I, ..., porta, ..., I)."""
    n = int(np.log2(len(estado)))
    total = np.array([[1]], dtype=complex)
    for q in range(n):
        total = np.kron(total, porta if q == alvo else I)
    return total @ estado


def cnot(estado: np.ndarray, controle: int, alvo: int) -> np.ndarray:
    """CNOT: troca o bit `alvo` em todo índice cujo bit `controle` vale 1."""
    n = int(np.log2(len(estado)))
    novo = estado.copy()
    for i in range(len(estado)):
        if (i >> (n - 1 - controle)) & 1:
            novo[i ^ (1 << (n - 1 - alvo))] = estado[i]
    return novo


# --- 4. Medida ----------------------------------------------------------------

def probabilidades(estado: np.ndarray) -> np.ndarray:
    """Regra de Born: P(x) = |amplitude de x|^2."""
    return np.abs(estado) ** 2


def medir(estado: np.ndarray, vezes: int = 1000, semente: int = 0) -> dict:
    """Sorteia resultados como um computador quântico real e conta quantas vezes saiu cada um."""
    n = int(np.log2(len(estado)))
    sorteio = np.random.default_rng(semente).choice(len(estado), size=vezes, p=probabilidades(estado))
    contagem: dict = {}
    for x in sorteio:
        chave = format(x, f"0{n}b")
        contagem[chave] = contagem.get(chave, 0) + 1
    return dict(sorted(contagem.items()))


# --- 5. Estado de Bell --------------------------------------------------------

def bell() -> np.ndarray:
    """H no qubit 0 e CNOT(0 -> 1) levam |00> a (|00> + |11>)/sqrt(2)."""
    return cnot(aplicar(ket("00"), H, 0), 0, 1)


# --- 6. Deutsch-Jozsa (oráculo de fase) ---------------------------------------

def deutsch_jozsa(f: list) -> str:
    """f é a tabela de f(x) para x = 0..2^n-1. Devolve 'constante' ou 'balanceada'."""
    n = int(np.log2(len(f)))
    estado = ket("0" * n)
    for q in range(n):
        estado = aplicar(estado, H, q)
    estado = estado * np.array([(-1) ** fx for fx in f])  # oráculo de fase: |x> -> (-1)^f(x) |x>
    for q in range(n):
        estado = aplicar(estado, H, q)
    return "constante" if probabilidades(estado)[0] > 0.5 else "balanceada"


# --- 7. Grover ----------------------------------------------------------------

def grover(n: int, marcado: int) -> np.ndarray:
    """Busca o índice `marcado` entre N = 2^n itens. Devolve as probabilidades finais."""
    N = 2 ** n
    estado = np.ones(N, dtype=complex) / np.sqrt(N)
    k = int(round(np.pi / (4 * np.arcsin(1 / np.sqrt(N))) - 0.5))  # número ótimo de iterações
    for _ in range(k):
        estado[marcado] *= -1                     # oráculo: inverte o sinal do item marcado
        estado = 2 * estado.mean() - estado       # difusão: reflete em torno da média
    return probabilidades(estado)


# --- 8. Transformada de Fourier quântica --------------------------------------

def qft(n: int) -> np.ndarray:
    """Matriz da QFT em n qubits: F[j, k] = w^(j*k) / sqrt(N), com w = e^(2*pi*i/N)."""
    N = 2 ** n
    j, k = np.meshgrid(np.arange(N), np.arange(N), indexing="ij")
    return np.exp(2j * np.pi * j * k / N) / np.sqrt(N)


# --- Exemplos e checagens -----------------------------------------------------

if __name__ == "__main__":
    b = bell()
    print("Bell:", np.round(b, 3), "medidas:", medir(b))
    assert np.allclose(b, (ket("00") + ket("11")) / np.sqrt(2))

    assert np.allclose(H @ X @ H, Z)                                   # identidade de circuito
    assert np.allclose(Rz(np.pi / 4), np.exp(-1j * np.pi / 8) * T)     # T = Rz(pi/4) a menos de fase global
    assert np.allclose(aplicar(ket("0"), Rx(np.pi), 0), -1j * ket("1"))

    print("DJ [0,0,0,0]:", deutsch_jozsa([0, 0, 0, 0]), "| DJ [0,1,1,0]:", deutsch_jozsa([0, 1, 1, 0]))
    assert deutsch_jozsa([1, 1, 1, 1]) == "constante" and deutsch_jozsa([0, 1, 1, 0]) == "balanceada"

    p = grover(3, marcado=5)
    print("Grover n=3, P(marcado) =", round(p[5], 4))
    assert abs(p[5] - 0.9453125) < 1e-9

    F = qft(2)
    assert np.allclose(F.conj().T @ F, np.eye(4))                      # a QFT é unitária
    assert np.allclose(F @ ket("00"), np.ones(4) / 2)
    print("Tudo certo.")
