document.addEventListener('DOMContentLoaded', function() {
    const entradaInput = document.getElementById('entrada');
    const almoço1Input = document.getElementById('almoço1');
    const almoço2Input = document.getElementById('almoço2');
    const saídaInput = document.getElementById('saida');
    const hdInput = document.getElementById('hd');

    // Adicionar o event listener para os campos de horários
    entradaInput.addEventListener('change', validarHorarios);
    almoço1Input.addEventListener('change', validarHorarios);
    almoço2Input.addEventListener('change', validarHorarios);
    saídaInput.addEventListener('change', validarHorarios);

    function validarHorarios() {
        const horaEntrada = entradaInput.value;
        const horaAlmoço1 = almoço1Input.value;
        const horaAlmoço2 = almoço2Input.value;
        const horaSaida = saídaInput.value;

        if (horaEntrada && horaAlmoço1 && horaAlmoço2 && horaSaida) {
            const [entradaHoras, entradaMinutos] = horaEntrada.split(':').map(Number);
            const [almoço1Horas, almoço1Minutos] = horaAlmoço1.split(':').map(Number);
            const [almoço2Horas, almoço2Minutos] = horaAlmoço2.split(':').map(Number);
            const [saidaHoras, saidaMinutos] = horaSaida.split(':').map(Number);

            // Validar se o início do almoço é maior que a hora de entrada
            if (almoço1Horas < entradaHoras || (almoço1Horas === entradaHoras && almoço1Minutos <= entradaMinutos)) {
                alert('O início do almoço deve ser maior que a hora de entrada.');
                almoço1Input.focus(); // Foca o campo para correção
                return false;
            }

            // Validar se o retorno do almoço é maior que o início do almoço
            if (almoço2Horas < almoço1Horas || (almoço2Horas === almoço1Horas && almoço2Minutos <= almoço1Minutos)) {
                alert('O retorno do almoço deve ser maior que o início do almoço.');
                almoço2Input.focus(); // Foca o campo para correção
                return false;
            }

            // Validar se a hora de saída é maior que o retorno do almoço
            if (saidaHoras < almoço2Horas || (saidaHoras === almoço2Horas && saidaMinutos <= almoço2Minutos)) {
                alert('A hora de saída deve ser maior que o retorno do almoço.');
                saídaInput.focus(); // Foca o campo para correção
                return false;
            }
        }
        return true; // Retorna true se todas as validações estiverem corretas
    }

    document.getElementById('calcularBtn').addEventListener('click', function() {
        const horaEntrada = entradaInput.value;
        const horaAlmoço1 = almoço1Input.value;
        const horaAlmoço2 = almoço2Input.value;
        const horaSaida = saídaInput.value;
        const HD = hdInput.value;

        if (horaEntrada && horaSaida && horaAlmoço1 && horaAlmoço2 && HD) {
            // Revalida todos os horários antes de calcular
            if (!validarHorarios()) return; // Interrompe o cálculo se a validação falhar

            // Converter horas para minutos
            const [entradaHoras, entradaMinutos] = horaEntrada.split(':').map(Number);
            const [almoço1Horas, almoço1Minutos] = horaAlmoço1.split(':').map(Number);
            const [almoço2Horas, almoço2Minutos] = horaAlmoço2.split(':').map(Number);
            const [saidaHoras, saidaMinutos] = horaSaida.split(':').map(Number);
            const [hdHoras, hdMinutos] = HD.split(':').map(Number);

            const minutosEntrada = (entradaHoras * 60) + entradaMinutos;
            const minutosAlmoço1 = (almoço1Horas * 60) + almoço1Minutos;
            const minutosAlmoço2 = (almoço2Horas * 60) + almoço2Minutos;
            const minutosSaida = (saidaHoras * 60) + saidaMinutos;
            const minutosHD = (hdHoras * 60) + hdMinutos;

            // Calcular minutos trabalhados
            const minutosTrabalhados1 = minutosAlmoço1 - minutosEntrada;
            const minutosTrabalhados2 = minutosSaida - minutosAlmoço2;

            // Calcular minutos totais trabalhados
            const minutosTrabalhados = minutosTrabalhados1 + minutosTrabalhados2;

            // Converter minutos trabalhados para horas e minutos
            const horasTrabalhadas = Math.floor(minutosTrabalhados / 60);
            const minutosRestantesTrabalhados = minutosTrabalhados % 60;

            // Calcular saldo de banco de horas
            const saldoMinutos = minutosTrabalhados - minutosHD;
            const saldoHoras = Math.floor(Math.abs(saldoMinutos) / 60) * Math.sign(saldoMinutos);
            const saldoMinutosRestantes = Math.abs(saldoMinutos % 60);

            // Exibir resultado
            const resultado = document.getElementById('resultado');
            resultado.innerHTML = `
                <p>Horas Trabalhadas: ${horasTrabalhadas}h ${minutosRestantesTrabalhados}m</p>
                <p>Saldo de Banco de Horas: ${saldoHoras}h ${saldoMinutosRestantes}m</p>
            `;
        } else {
            alert('Por favor, insira todos os horários.');
        }
    });
});
