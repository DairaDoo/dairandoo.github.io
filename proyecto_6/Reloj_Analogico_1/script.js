function actualizarReloj()
{
    const horaActual = new Date();
    const horas = horaActual.getHours() % 12;
    const minutos = horaActual.getMinutes();
    const segundos = horaActual.getSeconds();

    const gradoHora = ( horas + minutos / 60 ) * 30;
    const gradoMinuto = ( minutos + segundos / 60 ) * 6;
    const gradoSegundos =  segundos * 6 ;

    // recordar usar acentos graves en el rotate, no comillas dobles ni simples, estas:
    document.getElementById("aguja-hora").style.transform = `rotate(${gradoHora}deg)`;
    document.getElementById("aguja-minuto").style.transform = `rotate(${gradoMinuto}deg)`;
    document.getElementById("aguja-segundo").style.transform = `rotate(${gradoSegundos}deg)`;
}

setInterval(actualizarReloj, 1000);

actualizarReloj(); // llamamos la función actualizar reloj inmediatamente al actualizar la página.