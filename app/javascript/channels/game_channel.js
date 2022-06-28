import consumer from "channels/consumer"

document.addEventListener("turbo:load",()=>{
  
  const game_id = location.pathname.split('/')[2]
 
  const game = consumer.subscriptions.create({channel:"GameChannel",game_id:game_id}, {
    connected() {
      sessionStorage.setItem(`checked_box_${game_id}`,JSON.stringify({user1 : [], user2 : []}))
      if(location.search.split("=")[1] == '2'){
        game.send({second_palyer:"connected"})
      }
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      let gameBox = document.getElementById("game-box")
      if(data["second_palyer"]){ // if second_palyer connected then show the game boxes
        location.search.split("=")[1] != '2' ? (document.getElementById("invite-link").style.display = "none") : ""
        gameBox.style.display = "block"
        return 
      }

      let winner = document.getElementById("winner")

      document.getElementById(`div_${data["box_id"]}`).style.backgroundImage = `url(/assets/${data["user"]}.png)`
      document.getElementById(`div_${data["box_id"]}`).removeAttribute("onclick")
      let user_record = JSON.parse(sessionStorage.getItem(`checked_box_${game_id}`))
      user_record[`user${data["user"]}`].push(data["box_id"])
      sessionStorage.setItem(`checked_box_${game_id}`,JSON.stringify(user_record))
      
      let winnerArr = [['1','2','3'],['4','5','6'],['7','8','9'],['1','4','7'],['2','5','8'],['3','6','9'],['1','5','9'],['3','5','7']];
      if (user_record[`user${data["user"]}`].length > 2){
        winnerArr.forEach((value)=>{
            if(value.every(e => user_record[`user${data["user"]}`].includes(e))){
              gameBox.remove()
              winner.innerText = `user${data["user"]} Won !`
            }
        })
      }
      
      if(user_record["user1"].length + user_record["user2"].length == 9){
        gameBox.remove()
        winner.innerText = `Tie !`
      }

      document.getElementById("turn").innerText = (data["user"] == '1') ? 2 : 1
    }


  });

  document.getElementById("game-button").addEventListener("click",()=>{
    const data = {
      user : location.search.split("=")[1],
      box_id :  sessionStorage.getItem("box_id")
    }
    game.send(data)
  })

})

