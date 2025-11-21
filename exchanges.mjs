import amqp from 'amqplib';

async function main() {
    const connection = await amqp.connect({
            hostname: 'localhost',
            port: 5672,
            username: 'admin',
            password: 'admin'
        }); //conectar ao servidor RabbitMQ
    const channel = await connection.createChannel(); //criar um canal

    await channel.assertExchange('meu_exchange', 'direct'); //criar exchange 'meu_exchange' do tipo direct se não existir

    //criar filas customizadas
    await channel.assertQueue('notificacao', { durable: true }); 

    //ligar a fila 'notificacao' à exchange 'meu_exchange' com a routing key 'email'
    await channel.bindQueue('notificacao', 'meu_exchange', 'email');

    //enviar mensagem para a exchange 'meu_exchange' com a routing key 'email'
    channel.publish('meu_exchange', 'email', Buffer.from('Mensagem para notificação por email'));

    
 // await channel.close(); 
    // await connection.close();
   
}
main();