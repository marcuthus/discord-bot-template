import createClient from "./client"

async function start() {
    const client = createClient()

    await client.start()
}

start()
