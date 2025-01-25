import { client, db } from '.'
import { stock } from './schema'

async function seed() {
  await db.delete(stock)

  await db
    .insert(stock)
    .values([
      { description: 'Macbook 16GB', quantity: 5 },
      { description: 'Monitor IPS Samsung', quantity: 3 },
      { description: 'Ipad 3ª', quantity: 1 },
    ])
    .returning()
}

seed().finally(() => {
  client.end()
})