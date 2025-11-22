import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

/**
 * function to drop database while perforimg e2e testing
 * @param config 
 */
export async function dropDatabase(config: ConfigService): Promise<void>{
    //create the connection to the datasource
    const AppDataSource = await new DataSource({
        type:'postgres',
        synchronize: config.get('database.synchronize'),
        port: config.get('database.port'),
        username: config.get('database.user'),
        password: config.get('database.password'),
        host:config.get('database.host'),
        database:config.get('database.name'),
    })
    //drop all tables
    await AppDataSource.dropDatabase();

    //close the connection
    await AppDataSource.destroy();
}