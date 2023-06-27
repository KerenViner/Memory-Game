var selectedCards = [];
var matchedCards = 0;
var numberOfCards = 12;

function createCards(){ //creates Cards from images, adds the decorative background to the cards, creates doubles

    for (i=1; i<=numberOfCards; i++){

        setOne = () => {
            var div_containter = document.createElement('div');
            div_containter.className="flip_container";
            div_containter.id = "setOne"
        
            document.getElementsByTagName("body")[0].appendChild(div_containter);
        
            var front = document.createElement('div');
            front.className="front";
            front.innerHTML += '<img src="'+ "Playing_Cards/Spades_"+ i + ".png"+'" />';
        
            var back = document.createElement('div');
            back.className="back";
            back.innerHTML += '<img src="Playing_Cards/Back.png" />';

            div_containter.append(front, back);
        }

        setTwo = () => {
            var div_containter = document.createElement('div');
            div_containter.className="flip_container";
            div_containter.id = "setTwo";
        
            document.getElementsByTagName("body")[0].appendChild(div_containter);
        
            var front = document.createElement('div');
            front.className="front";
            front.innerHTML += '<img src="'+ "Playing_Cards/Spades_"+ i + ".png"+'" />';
        
            var back = document.createElement('div');
            back.className="back";
            back.innerHTML += '<img src="Playing_Cards/Back.png" />';

            div_containter.append(front, back);
        }

        setOne();
        setTwo();
    }

}

function Match(){
    for (card of selectedCards){
        //console.log(card.firstChild)
        card.firstChild.classList.toggle("matched");
    }

    matchedCards+=1;
    console.log(matchedCards);

    selectedCards.splice(0,2);

    if (matchedCards === numberOfCards){
        gameReload();
    }
}

function flipBackCards(){
    for (card of selectedCards){
        card.classList.toggle("flipped");
    }

    selectedCards.splice(0,2);
}

function shuffle(){ //shuffles the cards
    createCards();

    var parent = document.querySelector(".game");
    //console.log(parent);
    var divs = parent.children;
    //console.log(divs);
    var frag = document.createDocumentFragment();
    while (divs.length) {
        frag.appendChild(divs[Math.floor(Math.random() * divs.length)]);
    }
    parent.appendChild(frag);

}

function gameMechanics(){
    const card = document.querySelectorAll(".flip_container").forEach(card =>{
        card.addEventListener("click", () => {

            if (selectedCards.length < 2){
                if (!card.className.includes('flipped') && !card.className.includes('matched')){
                    card.classList.toggle("flipped");
                    selectedCards.push(card);
                    }
            }

            if (selectedCards.length  === 2){
                if (selectedCards[0].innerHTML === selectedCards[1].innerHTML){
                    console.log("Match");
                    setTimeout(() => {
                        Match();
                    }, 1000);
                    
                }
                else{
                    console.log("Not match")    
                    setTimeout(() => {
                        flipBackCards();
                    }, 1200);                
                    
                }
            }
        })
    })
        
}



function gameReload(){
    //console.log(numberOfCards, matchedCards);
    tsParticles.load("tsparticles", {
        particles: {
          color: {
            value: ["#A020F0", "#00ff00", "#FFA500"],
          },
        },
        preset: "confetti",
      });

      setTimeout(() => {
        location.reload();
      }, 4000);

}



window.onload = function (){
    shuffle();

    gameMechanics();
};
