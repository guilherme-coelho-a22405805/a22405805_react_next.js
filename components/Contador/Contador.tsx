'use client';
import { useState, useEffect } from 'react';
// 1. Importamos o CSS como um objeto 'styles'
import styles from './contador.module.css';

export default function Contador() {
    const [valor, setValor] = useState(0);
    const [historico, setHistorico] = useState<number[]>([]);

    // Efeito para carregar do localStorage ao iniciar
    useEffect(() => {
        const valorGuardado = localStorage.getItem('valorContador');
        if (valorGuardado) {
            setValor(Number(valorGuardado));
        }
    }, []);

    // Efeito para guardar no localStorage quando muda
    useEffect(() => {
        localStorage.setItem('valorContador', valor.toString());
    }, [valor]);

    function atualizaValor(novoValor: number) {
        if (novoValor >= 0 && novoValor <= 10) {
            setValor(novoValor);
            setHistorico(prev => [...prev, novoValor]);
        }
    }

    // Lógica das cores
    let corTexto = 'red';
    if (valor >= 4 && valor <= 7) corTexto = 'orange';
    if (valor >= 8) corTexto = 'green';

    return (
        // 2. Usamos styles.card em vez de "card"
        <div className={styles.card}>
            <h2>Laboratório 10: Contador</h2>
            
            <div className={styles.valor} style={{ color: corTexto }}>
                {valor}
            </div>

            <div className={styles.btnGroup}>
                {/* Nota: Para usar duas classes juntas, usamos esta sintaxe com crase `` */}
                <button 
                    className={`${styles.btn} ${styles.btnDec}`} 
                    onClick={() => atualizaValor(valor - 1)}>
                    -
                </button>
                
                <button 
                    className={`${styles.btn} ${styles.btnReset}`} 
                    onClick={() => { setValor(0); setHistorico([]) }}>
                    Reset
                </button>
                
                <button 
                    className={`${styles.btn} ${styles.btnInc}`} 
                    onClick={() => atualizaValor(valor + 1)}>
                    +
                </button>
            </div>

            <div style={{ textAlign: 'left' }}>
                <h3>Histórico:</h3>
                <ul>
                    {historico.map((num, index) => (
                        <li key={index}>Valor alterado para: <strong>{num}</strong></li>
                    ))}
                </ul>
            </div>
        </div>
    );
}