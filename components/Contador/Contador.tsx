'use client'; 

import { useState, useEffect } from 'react';
import styles from './contador.module.css';

export default function Contador() {
    // --- 2. GESTÃO DE ESTADO (useState) ---
    // 'valor': Guarda o número atual do contador.
    const [valor, setValor] = useState(0);

    // 'historico': Guarda a lista de todos os valores selecionados.
    // <number[]>: define explicitamente que este estado é um Array de números.
    const [historico, setHistorico] = useState<number[]>([]);

    // --- 3. Local Storage ---
    // Este useEffect corre apenas UMA vez quando o componente é criado.
    // O array de dependências vazio [] garante essa execução única.
    useEffect(() => {
        const valorGuardado = localStorage.getItem('valorContador');
        
        // Só atualizamos o estado se existir algo guardado 
        if (valorGuardado) {
            setValor(Number(valorGuardado)); 
        }
    }, []);

    // --- 4. PERSISTÊNCIA DE DADOS  ---
    // Este useEffect corre SEMPRE que a variável 'valor' muda.
    // O array de dependências [valor] controla isto.
    useEffect(() => {
        // Guardamos no browser. O localStorage só aceita Strings.
        localStorage.setItem('valorContador', valor.toString());
    }, [valor]);

    // --- 5. LÓGICA ---
    function atualizaValor(novoValor: number) {
        // Validação: Impede que o contador saia do intervalo [0, 10]
        if (novoValor >= 0 && novoValor <= 10) {
            setValor(novoValor);
            setHistorico(prev => [...prev, novoValor]);
        }
    }

    // --- 6. ESTILOS DINÂMICOS cores para o botão que dependem dos números---
    // Calculamos a cor em cada renderização com base no valor atual.
    // Não precisamos de guardar isto num useState separado.
    let corTexto = 'red';
    if (valor >= 4 && valor <= 7) corTexto = 'orange';
    if (valor >= 8) corTexto = 'green';

    // --- 7. RENDERIZAÇÃO (JSX) ---
    return (
        // Uso de CSS 
        <div className={styles.card}>
            <h2>Laboratório 10: Contador</h2>
            
            <div className={styles.valor} style={{ color: corTexto }}>
                {valor}
            </div>

            <div className={styles.btnGroup}>
                {/* Botão de Decrementar */}
                <button 
                    className={`${styles.btn} ${styles.btnDec}`} 
                    onClick={() => atualizaValor(valor - 1)}>
                    -
                </button>
                
                {/* Botão de Reset */}
                <button 
                    className={`${styles.btn} ${styles.btnReset}`} 
                    onClick={() => { setValor(0); setHistorico([]) }}>
                    Reset
                </button>
                
                {/* Botão de Incrementar */}
                <button 
                    className={`${styles.btn} ${styles.btnInc}`} 
                    onClick={() => atualizaValor(valor + 1)}>
                    +
                </button>
            </div>

            <div style={{ textAlign: 'left' }}>
                <h3>Histórico:</h3>
                <ul>
                    {/* RENDERIZAÇÃO DE LISTAS */}
                    {/* Transformei cada número do histórico num elemento <li> */}
                    {historico.map((num, index) => (
                        <li key={index}>Valor alterado para: <strong>{num}</strong></li>
                    ))}
                </ul>
            </div>
        </div>
    );
}