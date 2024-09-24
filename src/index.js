import { ApolloServer, gql } from "apollo-server"

const persons = [
    {"id":1,"first_name":"Allan","last_name":"Dripp","gender":"Male","email":"adripp0@phpbb.com","phone":"416-622-8936","city":"Chardonnière","street":"Dahle"},
    {"id":2,"first_name":"Ivonne","last_name":"Irwin","gender":"Female","email":"iirwin1@reference.com","phone":"690-755-8450","city":"Asan","street":"Miller"},
    {"id":3,"first_name":"Glori","last_name":"Jaskowicz","gender":"Female","email":"gjaskowicz2@eepurl.com","phone":"868-341-4801","city":"Yanshou","street":"Columbus"},
    {"id":4,"first_name":"Sib","last_name":"Yarrell","gender":"Bigender","email":"syarrell3@photobucket.com","phone":"888-239-1030","city":"Breu","street":"Warner"},
    {"id":5,"first_name":"Kaine","last_name":"Annice","gender":"Male","email":"kannice4@hp.com","phone":"592-428-8115","city":"Depok","street":"Arapahoe"},
    {"id":6,"first_name":"Laughton","last_name":"Melland","gender":"Male","email":"lmelland5@twitter.com","phone":"113-853-6340","city":"Mahendranagar","street":"Quincy"},
    {"id":7,"first_name":"Erie","last_name":"Armal","gender":"Genderqueer","email":"earmal6@xrea.com","phone":"858-648-7663","city":"Bradag","street":"Carey"},
    {"id":8,"first_name":"Filip","last_name":"Cardenas","gender":"Male","email":"fcardenas7@163.com","phone":"446-747-0802","city":"Daru","street":"Colorado"},
    {"id":9,"first_name":"Graehme","last_name":"Rattray","gender":"Male","email":"grattray8@state.tx.us","phone":"679-261-1911","city":"Huaguo","street":"Luster"},
    {"id":10,"first_name":"Anetta","last_name":"Knifton","gender":"Non-binary","email":"aknifton9@hibu.com","phone":"614-795-4701","city":"Brämhult","street":"Scoville"}
]


const typeDefinitions = gql`

    type Address {
        street: String!
        city: String!
    }

    type Person {
        id: Int!
        first_name: String!
        last_name: String!
        gender: String!
        email: String!
        phone: String!
        address: Address!
    }

    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(first_name: String!): Person
    }

`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const {first_name} = args
            return persons.find(person => person.first_name === first_name)
        }
    },
    Person: {
        address:(root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})