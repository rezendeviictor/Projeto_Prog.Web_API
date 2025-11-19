import app from "./app";
import { AppDataSource } from "./datasource";
import dotenv from "dotenv";
dotenv.config();

AppDataSource.initialize()
    .then(() => {
        console.log('🎉 Database connection established successfully!');
    })
    .catch((err: any) => { 
        console.error('❌ Error connecting to the database:', err);
        process.exit(1);
    });

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
    console.log(`✨ API (Petshop) is ready to use!`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/docs`);
});