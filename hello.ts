interface Person {
    name: string,

    getName(): string;
}

class Mike implements Person {
    name: string;

    constructor() {
        this.name = "Mike";
    }

    getName() {
        return this.name;
    }
}

function sayHello(recipient: Person): void {
    console.log(`Hello, ${recipient.name}!`);
    console.log(`Hello again, ${recipient.getName()}!`);
}

sayHello(new Mike());
