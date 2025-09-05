import {app} from '../server.ts'
import fastifySqlite from 'fastify-sqlite'

async function main () {
  app.register(fastifySqlite, {
    dbFile: 'foo.db'
  })
  await app.ready()

  app.sqlite.all('SELECT * FROM myTable', (err, rows) => {
    // do something
  })
}
main()
