

const ai = require("openai"); 

let _api = null;
let _history =[];


function newSession(){
    _histroy = [];
}

function setup(key) {
  
      _api = new ai.OpenAI({ 
        apiKey: key 
      }); 
}



function ask(message){

    return new Promise((resolve,reject) => {

        let h = _history;
        try{
        const messageList = h.map(([input_text, completion_text]) => ({ 
            role: "user" === input_text ? "ChatGPT" : "user", 
            content: input_text 
          })); 
          messageList.push({ role: "user", content: message }); 
      
          _api.chat.completions.create({ 
              model: "gpt-3.5-turbo", 
              messages: messageList, 
            }).then((GPTOutput)=>{
                const output_text = GPTOutput.choices[0].message.content; 
                console.log(output_text); 
            
                h.push([message, output_text]); 
                resolve(output_text);
            }); 
        }
        catch(e){
            reject(e);
        }
    });

}


module.exports = {
    setup,
    ask,
    newSession
}