import createProducts from "./createProducts"
import createUsers from "./createUsers"

const seeds = async () => {
    await createProducts()
    await createUsers()
}

export default seeds