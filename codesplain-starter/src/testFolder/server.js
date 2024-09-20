import { setupServer } from "msw/lib/node";
import {rest} from 'msw'

// How a handlers actually look like
// const handlers = [
//     rest.get('/api/repositories', (req,res,ctx) => {
//         const language = req.url.searchParams.get('q').split('language:')[1];

//         return res(
//             ctx.json({
//                 items: [
//                     {id:1, full_name: `${language}_one`},
//                     {id:2, full_name: `${language}_two`}
//                 ]
//             })
//         )
//     })
// ];

export function createServer(handlerConfig) {
    const handlers = handlerConfig.map(config => {
        return rest[config.method || 'get'](config.path, (req, res, ctx) => {
            return res(ctx.json(config.res(req, res,ctx)));
        });
    });

    const server = setupServer(...handlers);

    beforeAll(() => {
        server.listen();
    })
    afterEach(() => {
        server.resetHandlers();
    })
    afterAll(() => {
        server.close();
    })
}