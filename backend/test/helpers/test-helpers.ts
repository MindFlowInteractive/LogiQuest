import { Test, TestingModule } from '@nestjs/testing';  
import { INestApplication } from '@nestjs/common';       
import { AppModule } from '../../src/app.module';        

// creates a fn to set up a NestJS testing application
export async function createTestingApp(): Promise<INestApplication> {
  
  // create a testing module and import AppModule in it
  const module: TestingModule = await Test.createTestingModule({ 
    imports: [AppModule],  
  }).compile();  

  //create a Nest application instance from the compiled module above
  const app = module.createNestApplication();

  // Initialize the Nest application before returning it
  await app.init();  // Ensures all providers, services, and middleware are properly set up

  return app;  // return initialized testing application instance
}
