

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



async  function ask(message){

    

        let h = _history;
        try{
        const messageList = h.map(([input_text, completion_text]) => ({ 
            role: "user" === input_text ? "ChatGPT" : "user", 
            content: input_text 
          })); 
          messageList.push({ role: "user", content: message }); 
      
          console.log("----------------");
          
          console.log("in history :"+JSON.stringify(h));
          console.log("<<<<<<<<<<<>>>>>>>>>>");
          console.log("send to :"+JSON.stringify(messageList));
          console.log("----------------");
          

          let GPTOutput = await _api.chat.completions.create({ 
              //model: "gpt-3.5-turbo-0125", 
              model: "gpt-4o", 
              messages: messageList, 
            })
            const output_text = GPTOutput.choices[0].message.content; 
            h.push([message, output_text]); 
            return output_text;
        }
        catch(e){
            reject(e);
        }
    
        return "error";
    }
 




module.exports = {
    setup,
    ask,
    newSession
}