import { AppDataSource } from '../config/data-base';
import { createApp } from '../web/app';
import { environmentVars } from '../config/environment-vars';

export const bootstrap = async () => {
  try {
    // Initialize Database
    console.log('🔌 Iniciando base de datos...');
    await AppDataSource.initialize();
    console.log('✅ Base de datos iniciada  correctamente');

    const app = createApp();

    const port = environmentVars.port;
    app.listen(port, () => {
      console.log(
        `🚀 Servidor esta corriendo en el http://localhost:${port} - Environment: ${environmentVars.nodeEnv}`,
      );
    });
  } catch (error) {
    console.error('❌ Error durante la application bootstrap:', error);
    process.exit(1);
  }
};
