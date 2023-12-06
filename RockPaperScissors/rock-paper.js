let score = JSON.parse(localStorage.getItem('score')) ||   
        {
            wins: 0,
            losses: 0,
            ties:0
        }; 

        document.querySelector('.js-btn-rock')
            .addEventListener('click',()=>{
                const computerMove1 = pickComputerMove();
                //If rock picked
                playGame('rock',computerMove1);
            });

        document.querySelector('.js-btn-paper')
            .addEventListener('click',()=>{
                const computerMove2 = pickComputerMove();
                playGame('paper',computerMove2)
            });

        document.querySelector('.js-btn-scissors')
            .addEventListener('click',()=>{
                const computerMove3 = pickComputerMove();
                //If scissors picked
                playGame('scissors',computerMove3);
            });


        document.body.addEventListener('keydown',(event)=>{
                if(event.key === 'a'){
                    autoPlay();
                }
            });

        document.querySelector('.js-reset-btn')
            .addEventListener('click',()=>{
                score.wins =0; 
                score.losses=0; 
                score.ties = 0;
                localStorage.removeItem('score');
                updateScoreElement(); 

                document.querySelector('.js-result')
                .innerHTML = '';
            });

        document.body.addEventListener('keydown',(event)=>{

            if(event.key === 'Backspace'){
                const resetResponse = confirm("Are you sure you want reset the score");
                if(resetResponse === true){
                    score.wins =0; 
                    score.losses=0; 
                    score.ties = 0;
                    localStorage.removeItem('score');
                    updateScoreElement(); 
    
                    document.querySelector('.js-result')
                    .innerHTML = '';
                }

            }

            




   
        });

        


        document.body.addEventListener('keydown',(event)=>{
            if(event.key === 'r'){
                const computerMove1 = pickComputerMove();
                //If rock picked
                playGame('rock',computerMove1);
            }else if(event.key === 'p'){
                const computerMove2 = pickComputerMove();
                //If paper picked
                playGame('paper',computerMove2)
            }else if(event.key === 's'){
                const computerMove3 = pickComputerMove();
                //If scissors picked
                playGame('scissors',computerMove3);
            }
        });



        updateScoreElement();

        let isAutoPlaying = false;
        let intervalID;

        function autoPlay(){
            if(!isAutoPlaying){
                intervalID = setInterval(() => {
                    const computerMove = pickComputerMove();
                    const pick = pickComputerMove();
                    playGame(pick,computerMove);
                },2000);
                isAutoPlaying = true;
            }else{
                clearInterval(intervalID);
                isAutoPlaying = false;
            }
        }

        

        function playGame(thePick,computerMove){
            //If rock picked
            let result = '';
            if(thePick ==='rock'){
                if(computerMove === 'rock'){
                    result = 'Tie';
                }else if(computerMove === 'paper'){
                    result = 'You Lose';
                }else if(computerMove === 'scissors'){
                    result = 'You won';
                }else{
                    console.log('ERROR');
                }
            }
            //If paper picked
            if(thePick === 'paper'){
                if(computerMove === 'rock'){
                result = 'You won'
                }else if(computerMove === 'paper'){
                    result = 'Tie';
                }else if(computerMove === 'scissors'){
                    result = 'You Lose';
                }else{
                    console.log('ERROR');
                }
            }
            //If scissors picked
            if(thePick === 'scissors' ){
                if(computerMove === 'rock'){
                    result = 'You Lose'
                }else if(computerMove === 'paper'){
                    result = 'You won';
                }else if(computerMove === 'scissors'){
                    result = 'Tie';
                }else{
                    console.log('ERROR');
                }
            }
            /*
            
            const score = {
            wins:0,
            losses:0,
            ties:0
            };
            
            */

            if(result === 'You won'){
                score.wins++;
            }else if(result === 'You Lose'){
                score.losses++;
            }else if(result === 'Tie'){
                score.ties++;
            }

            localStorage.setItem('score',JSON.stringify(score));

            updateScoreElement();
    
            updateResultElement(thePick,computerMove,result);           
        }

        function updateScoreElement(){
            document.querySelector('.js-score')
              .innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Draws: ${score.ties}`;
        }

        function updateResultElement(thePick,computerMove,result){
            document.querySelector('.js-result')
              .innerHTML = `${result} <p> </p> You ${thePick} , computer  ${computerMove}. `;
        }

        function pickComputerMove() {

            const randomNumber = Math.random();
            let computerMove = '';
            
                if (randomNumber >= 0 && randomNumber < 1 / 3) {
                    computerMove = 'rock';
                } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
                    computerMove = 'paper';
                } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
                    computerMove = 'scissors';
                } else {
                    console.log('ERROR');
                }

                return computerMove;
            }