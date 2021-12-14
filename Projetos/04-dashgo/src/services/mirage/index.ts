import { createServer, Factory, Model, Response, ActiveModelSerializer } from "miragejs";
import faker from "faker";

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        id(index: number) {
          return index + 1;
        },
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
      server.createList('user', 200);
    },

    routes() {
      this.namespace = 'api';

      //Incluindo um delay de 750 ms na resposta da API fake
      this.timing = 750; 

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
          .users
          .slice(pageStart, pageEnd);

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        );
      });

      this.get('/users/:id');
      this.post('/users');

      // Após definir as rotas do miragejs, limpar o namespace 
      // para não impactar nas rotas de API do Next
      this.namespace = '';
      this.passthrough()
    }
  });

  return server;
}