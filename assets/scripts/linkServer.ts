import { _decorator, Component, EditBox, Label, Node } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('linkServer')
export class linkServer extends Component {

    @property({ type: Node })
    inputfromServer: Node | null = null;

    @property({ type: EditBox })
    userInput: EditBox | null = null;

    private userTextInput: string = '';
    private dataFromServer: { content: string }[] = [];

    start() 
    {
        this.userInput.node.on(EditBox.EventType.EDITING_DID_ENDED, this.takeUserInput, this);

        fetch("http://localhost:4000/jokes")
        .then((response: Response) => {
            console.log("response", response);
            return response.json();
        })
        .then((value) => {
            this.dataFromServer = value;
            console.log("value", value);
            this.displayJokes();
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });




        // const xhr = new XMLHttpRequest();
        // xhr.open('GET', 'http://localhost:4000/jokes', true);
        // xhr.onreadystatechange = () => {
        //     if (xhr.readyState === XMLHttpRequest.DONE) {
        //         if (xhr.status === 200) {
        //             console.log("response", xhr.responseText);
        //             this.dataFromServer = JSON.parse(xhr.responseText);
        //             console.log("value", this.dataFromServer);
        //             this.displayJokes();
        //         } else {
        //             console.error('Fetch error:', xhr.statusText);
        //         }
        //     }
        // };
        // xhr.send();

    }


    takeUserInput() 
    {
        this.userTextInput = this.userInput.string;
        this.sendDataToServer(this.userTextInput);
    }

    displayJokes() 
    {
        this.dataFromServer.forEach((jokeObj) => {
            let newNode = new Node();
            let labelComponent = newNode.addComponent(Label);
            labelComponent.string = jokeObj.content;
            this.inputfromServer.addChild(newNode);
        });
    }

    sendDataToServer(data: string) 
    {
        fetch("http://localhost:4000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },   
           body: JSON.stringify({ userInput: data })
        })
        .then((response: Response) => {
            return response.json();
        })
        .then((value) => {
            console.log("input response:", value);
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });





        // const encodedUserInput = encodeURIComponent(this.userTextInput);
        // const url = `http://localhost:4000/user?userInput=${encodedUserInput}`;
        // fetch(url)
        // .then((response: Response) => {
        //     return response.json();
        // })
        // .then((value) => {
        //     console.log("input response:", value);
        // })
        // .catch((error) => {
        //     console.error('Fetch error:', error);
        // });


        // const encodedUserInput = encodeURIComponent(this.userTextInput);
        // const url = `http://localhost:4000/user?userInput=${encodedUserInput}`;
        // const xhr = new XMLHttpRequest();
        // xhr.open('GET', url , true);
        // xhr.onreadystatechange = () => {
        //     if (xhr.readyState === XMLHttpRequest.DONE) {
        //         if (xhr.status === 200)  console.log("input response:", xhr.responseText);
        //         else  console.error('Fetch error:', xhr.statusText);
        //     }
        // };
        // xhr.send();

    }
  



    update(deltaTime: number) {
        // Your update logic
    }





}
























