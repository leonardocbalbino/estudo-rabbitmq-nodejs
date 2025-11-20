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

    // channel.publish('', 'minha_fila', Buffer.from('Minha Mensagem de teste')); //publicar mensagem na fila 'minha_fila' utilizando o publish

    channel.sendToQueue('minha_fila', Buffer.from('Outra Mensagem de teste')); //enviar mensagem para a fila 'minha_fila' utilizando o sendToQueue

    //Criar fila no manager no menu Queues

    await channel.close(); //fechar o canal
    await connection.close(); //fechar a conexão
}

main();