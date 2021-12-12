import { createServer, Factory, Model } from "miragejs";
import faker from "faker";

type User = {
  name: string;
  email: string;
  created_at: string
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(index: number) {
          return `User ${index + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        }
      })
    },

    seeds(server) {
      server.createList('user', 10);
    },

    routes() {
      this.namespace = 'api';

      //Incluindo um delay de 750 ms na resposta da API fake
      this.timing = 750; 

      this.get('/users');
      this.post('/users');

      // Após definir as rotas do miragejs, limpar o namespace 
      // para não impactar nas rotas de API do Next
      this.namespace = '';
      this.passthrough()
    }
  });

  return server;
}