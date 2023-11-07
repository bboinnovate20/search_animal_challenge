// npm install  -D typescript ts-node-dev @types/express @types/cors
import express, {Request, Response} from 'express';
import cors from 'cors';
import { Chance } from 'chance';

const app = express();

app.use(cors());
app.use(express.json());

//make animal
const chance = new Chance();

interface Animal {
    id: number,
    type: string,
    age: string | number,
    name: string
}

const animal: Animal[] = [...Array(50).keys()].map((id) => {
    return {
        id,
        type: chance.animal(),
        age: chance.age(),
        name: chance.name()
    }
});


//endpoints
app.get("", (req: Request, res: Response) => {
    type query = string | "";
    
    const q: query = req.query.q?.toString().toLowerCase() || "";

    const results = animal.filter(animal => animal.type.toLowerCase().includes(q));

    res.send(results);
});


app.listen(8000, () => {
    console.log("Listening...., http://localhost:8000");
})