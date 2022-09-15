import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import { doc } from "prettier"





async function start(){
    const PORT = process.env.PORT || 2000
    const app = await NestFactory.create(AppModule)
    const config = new DocumentBuilder()
    
    .setTitle('Event API')
    .setDescription("REST API")
    .setVersion('1.0.0')
    .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)


    await app.listen(PORT, () => console.log(`serever is running on port ${PORT} `))

}

start()