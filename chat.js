

const ai = require("openai"); 

let _api = null;
let _history =[];


function newSession(){
    _history = [];
}

function build(key) {
  
      _api = new ai.OpenAI({ 
        apiKey: key 
      }); 
      return _api;
}
function setup(ai){
    _api = ai;
}



async  function ask(message){

    

        let h = _history;
        try{
      
          h.push({ role: "user", content: message});
          console.log("----------------");
          
          console.log("in history :"+JSON.stringify(h));
          console.log("<<<<<<<<<<<>>>>>>>>>>");
         
          

          let GPTOutput = await _api.chat.completions.create({ 
              //model: "gpt-3.5-turbo-0125", 
              model: "gpt-4o-mini", 
              messages: h, 
            })
            const output_text = GPTOutput.choices[0].message.content; 
            h.push({role: "system", content: output_text}); 
            return output_text;
        }
        catch(e){
           console.log(e);
        }
    
        return "error";
    }
 




module.exports = {
    setup,
    ask,
    newSession,
    build
}