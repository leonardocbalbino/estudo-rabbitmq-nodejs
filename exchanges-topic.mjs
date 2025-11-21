import amqp from 'amqplib';

async function main() {
    const connection = await amqp.connect({
            hostname: 'localhost',
            port: 5672,
            username: 'admin',
            password: 'admin'
        }); //conectar ao servidor RabbitMQ
    const channel = await connection.createChannel(); //criar um canal

   // Fila > system_logs

   // logs.system.info

   // logs.system.erro

   await channel.assertExchange('system_exchange', 'topic'); //criar exchange 'meu_exchange' do tipo direct se não existir
    await channel.assertQueue('system_logs', { durable: true });

    await channel.bindQueue('system_logs', 'system_exchange', 'logs.#');

    channel.publish('system_exchange', 'logs.system.info', Buffer.from('Mensagem de log de informação do sistema'));
    channel.publish('system_exchange', 'logs.system.erro', Buffer.from('Mensagem de log de erro do sistema'));  

  // await channel.close(); 
    // await connection.close();
    
}
main();