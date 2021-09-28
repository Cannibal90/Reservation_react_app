
export class Service {
    handleError = (text: string) => {
        if(!text) return Promise.reject()
        console.log(JSON.parse(text))
        //TODO jakis show error z stora
    }
}