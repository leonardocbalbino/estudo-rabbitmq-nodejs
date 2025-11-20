import amqp from 'amqplib';

async function main() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'admin',
        password: 'admin'
    }); //conectar ao servidor RabbitMQ

    const channel = await connection.createChannel(); //criar um canal
    await channel.assertQueue('minha_fila', { durable: true }); //criar fila 'minha_fila' se não existir

    channel.prefetch(1); //limitar o número de mensagens não confirmadas para 1

    channel.consume('minha_fila', (data) => {
        console.log(`Mensagem recebida: ${data.content.toString()}`);

        setTimeout(() => {
            console.log('Processamento da mensagem concluído');
            channel.ack(data); //confirmar que a mensagem foi processada
        }, 5000); //simular tempo de processamento de 5 segundos
    }); //consumir mensagens da fila 'minha_fila'

   
}

main();