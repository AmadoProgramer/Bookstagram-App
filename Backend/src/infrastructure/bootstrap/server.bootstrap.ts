import { AppDataSource } from '../config/data-base';
import { createApp } from '../web/app';
import { environmentVars } from '../config/environment-vars';

export const bootstrap = async () => {
  try {
    // Initialize Database
    console.log('🔌 Initializing database...');
    await AppDataSource.initialize();
    console.log('✅ Database initialized successfully');

    // Create Express app
    const app = createApp();

    // Start server
    const port = environmentVars.port;
    app.listen(port, () => {
      console.log(
        `🚀 Server is running at http://localhost:${port} - Environment: ${environmentVars.nodeEnv}`,
      );
    });
  } catch (error) {
    console.error('❌ Error during application bootstrap:', error);
    process.exit(1);
  }
};
