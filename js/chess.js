const items = [
    [8,7,6,5,4,3,2,1,0],
    ['z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

];
let firstTarget = null;
const chessGame = (event)=> {

    //ll.4 - 87 create chess board with all chess pieces
    const table = document.createElement('table');
    table.id = 'chess_layout';
    document.getElementById('chessWrapper').appendChild(table);



    document.getElementById('chess_layout').style.height = document.getElementById('chess_layout').style.width+"px";
    //rows 1-8
    for(let i=0;i<=8;i++){
        let b = [];
        b[i] = document.createElement('tr');
        b[i].id = items[0][i];
        b[i].classList.add('chess_row');
        document.getElementById('chess_layout').appendChild(b[i]);


        //cols A-H
        for(let j=0;j<=8;j++){
            let b = [];
            b[j] = document.createElement('td');
            b[j].id =  items[1][j] + items[0][i];
            b[j].classList.add('chess_col');



            switch (i){
                case 0:
                    switch (j) {
                        case 1:
                        case 8:  b[j].innerHTML = '<i class="fas fa-chess-rook chess_black"></i>';
                            break;
                        case 2:
                        case 7:  b[j].innerHTML = '<i class="fas fa-chess-knight chess_black"></i>';
                            break;
                        case 3:
                        case 6:  b[j].innerHTML = '<i class="fas fa-chess-bishop chess_black"></i>';
                            break;
                        case 4:  b[j].innerHTML = '<i class="fas fa-chess-queen chess_black"></i>';
                            break;
                        case 5:  b[j].innerHTML = '<i class="fas fa-chess-king chess_black"></i>';
                    }
                    break;
                case 1:
                    (j!==0)? b[j].innerHTML = '<i class="fas fa-chess-pawn chess_black"></i>' : b[j].innerHTML = items[0][i];
                    break;
                case 6:
                    (j!==0)? b[j].innerHTML = '<i class="fas fa-chess-pawn chess_white"></i>' : b[j].innerHTML = items[0][i];
                    break;
                case 7:
                    switch (j) {
                        case 1:
                        case 8:  b[j].innerHTML = '<i class="fas fa-chess-rook chess_white"></i>';
                            break;
                        case 2:
                        case 7:  b[j].innerHTML = '<i class="fas fa-chess-knight chess_white"></i>';
                            break;
                        case 3:
                        case 6:  b[j].innerHTML = '<i class="fas fa-chess-bishop chess_white"></i>';
                            break;
                        case 4:  b[j].innerHTML = '<i class="fas fa-chess-queen chess_white"></i>';
                            break;
                        case 5:  b[j].innerHTML = '<i class="fas fa-chess-king chess_white"></i>';
                    }
                    break;
                case 8:
                    if(j===0){
                        b[j].classList.add('cords');
                    }else {
                        b[j].classList.add('cords');
                        b[j].innerHTML = items[1][j];
                    }
            }

            if(j===0){
                b[j].classList.add('cords');
                if(i!==8){ b[j].innerHTML = items[0][i]}
            }

            document.getElementById(items[0][i]).appendChild(b[j]);

        }
    }

    for(let i = 0;i<=7;i++){
        for(let j = 1; j<=8;j++) {
            document.getElementById(items[1][j] + items[0][i]).addEventListener('click', chessMovement);
        }}
//set white to be the first player moving
    localStorage.setItem("player\'s turn", 'white');



};
document.addEventListener("DOMContentLoaded", (event)=>{
    chessGame(event);
    chessSideBar();
    chessLightbox();
});

function chessMovement(e){
                let _this = e.currentTarget;
                document.getElementById(_this.id).style.backgroundColor = "#8D2";
                switch(chessMovement2(_this)){
                    case -1:
                        firstTarget = _this;
                        break;
                    case 1:
                    firstTarget = null;
                    break;
                    default: console.log("impossible error at chessMovement");
                }
    return firstTarget;
}
function chessMovement2(_this){
    let this2 = firstTarget;

    if(_this === this2 || this2==null){
        if(this2 == null && _this.firstChild != null){
            //show the next possible Movements of the selected chess piece
            showPossibleMovements(_this);
        }


        if(document.getElementById(_this.id).innerHTML === ""){
            document.getElementById(_this.id).style.backgroundColor = "initial";
            if(this2 !== null){document.getElementById(this2.id).style.backgroundColor = "initial";}
            return 2;}
        return -1
    }else if(_this && this2){
        console.log(_this);
        console.log(this2);

        //check if the correct player is moving
        if(!this2.firstChild.classList.contains('chess_' + localStorage.getItem("player\'s turn"))){
        console.log('Player ' + localStorage.getItem("player\'s turn") + ' has to move next.');
            clearNextLocations();
            document.getElementById(_this.id).style.backgroundColor = "initial";
            document.getElementById(this2.id).style.backgroundColor = "initial";
            return 1;
        }

        //check whether the selected location is a possible movement location
        if(!(_this.classList.contains('nextLoc'))){
            console.log('false movement');
            clearNextLocations();
            document.getElementById(_this.id).style.backgroundColor = "initial";
            document.getElementById(this2.id).style.backgroundColor = "initial";
            return 1;
        }
        clearNextLocations();
        //check if both selected chess pieces are of equal color
        let movingChessPieceClassList = this2.firstChild.classList;
        if(_this.firstChild != null){
        if((_this.firstChild.classList.contains('chess_white') && movingChessPieceClassList.contains('chess_white'))
        || (_this.firstChild.classList.contains('chess_black') && movingChessPieceClassList.contains('chess_black'))){
            console.log('equal color');
            document.getElementById(_this.id).style.backgroundColor = "initial";
            document.getElementById(this2.id).style.backgroundColor = "initial";
            return 1;
        }else{
            (_this.firstChild.classList.contains('chess_white'))?
                document.getElementById('deadWhiteChessPieces').children[1].appendChild(_this.firstChild):
                document.getElementById('deadBlackChessPieces').children[1].appendChild(_this.firstChild)
        }
        }

        //check and declare winner
        if(_this.innerHTML === '<i class="fas fa-chess-king"></i>'){window.alert('Black wins the game')}
        else if(_this.innerHTML === '<i class="fas fa-chess-king chess_black"></i>'){window.alert('White wins the game')}
        if(this2.innerHTML !== ""){
            document.getElementById(_this.id).innerHTML = document.getElementById(this2.id).innerHTML;
            document.getElementById(this2.id).innerHTML = null;
            //swap the next player to move a chess piece white-black

            //check if pawn has reached enemy base
            if(_this.firstChild.classList.contains('fa-chess-pawn')) {
                let yPos = _this.id.charAt(1);
                if (yPos === "1" && movingChessPieceClassList.contains('chess_black')) {
                    console.log('black reached enemy base');
                    pawnSwapNotification(_this, "deadBlackChessPieces");
                } else if (yPos === "8" && movingChessPieceClassList.contains('chess_white')) {
                    console.log('white reached enemy base');
                    pawnSwapNotification(_this, "deadWhiteChessPieces");
                }
            }

            if(localStorage.getItem('player\'s turn') === 'white'){
                localStorage.setItem('player\'s turn', 'black')
            }else{
                localStorage.setItem('player\'s turn', 'white');
            }
        }
        document.getElementById(_this.id).style.backgroundColor = "initial";
        document.getElementById(this2.id).style.backgroundColor = "initial";
        return 1;
    }else{
        console.log("impossible error at chessMovement2");
    }

}
//function to remove the marks of the current possible movement locations
const clearNextLocations = () =>{
    let clearNextLoc = document.getElementsByClassName('nextLoc');
    for(let x = clearNextLoc.length-1; x >=0;x--){
        clearNextLoc[x].classList.remove('nextLoc');
    }
};
/*
* showPossibleMovements shows the next possible moves for the selected chess piece
* sets class to force player to use a move that is possible
* */
const showPossibleMovements = (myTarget)=>{
    const chessPiece = myTarget.firstChild.classList;
    const getLocation = myTarget.parentElement.id;
    const xPos = myTarget.id.charAt(0);
    const yPos = parseInt(myTarget.id.charAt(1));
    const xPosInNum = items[1].indexOf(xPos);
    //set possible movement locations for the black pawns
    //console.log( chessPiece[1]);

  switch (chessPiece[1]) {
      case "fa-chess-pawn":
          if(chessPiece.contains('chess_black')){
              //the four movements a black pawn can have at maximum:
              const b1 = document.getElementById(items[1][xPosInNum-1] + (yPos-1));
              const b2 = document.getElementById(items[1][xPosInNum+1] + (yPos-1));
              const b3 = document.getElementById(xPos + (yPos-1));
              const b4 = document.getElementById(xPos + (yPos-2));
              //the attack pattern of a black pawn
              const blackPawnAttack = () =>{
                  if(b1){
                      if(b1.innerHTML !== '' && !b1.classList.contains('cords')){
                          b1.classList.add('nextLoc');
                          b1.style.backgroundColor = null;
                      }
                  }
                  if(b2){
                      if(b2.innerHTML !== '' && !b2.classList.contains('cords')){
                          b2.classList.add('nextLoc');
                          b2.style.backgroundColor = null;
                      }
                  }

              };
          //const currentLocation = yPos;
          switch(getLocation){
              case "7":
                      if(b3.innerHTML === ''){
                          b3.classList.add('nextLoc');
                          b3.style.backgroundColor = null;
                            if(b4.innerHTML === ''){
                                b4.classList.add('nextLoc');
                                b4.style.backgroundColor = null;
                            }
                      }
                  blackPawnAttack();
                  break;
              case "6":
              case "5":
              case "4":
              case "3":
              case "2":
                  if(b3.innerHTML === ''){
                      b3.classList.add('nextLoc');
                      b3.style.backgroundColor = null;}
                  blackPawnAttack();
                  break;
              default: console.log('false Location');
          }}else{
              //the four movements a white pawn can have at maximum:
              const b5 = document.getElementById(items[1][xPosInNum-1] + (yPos+1));
              const b6 = document.getElementById(items[1][xPosInNum+1] + (yPos+1));
              const b7 = document.getElementById(xPos + (yPos+1));
              const b8 = document.getElementById(xPos + (yPos+2));
              const whitePawnAttack = () =>{
                  if(b5){
                      if(b5.innerHTML !== '' && !b5.classList.contains('cords')){
                          b5.classList.add('nextLoc');
                          b5.style.backgroundColor = null;
                      }
                  }
                  if(b6){
                      if(b6.innerHTML !== '' && !b6.classList.contains('cords')){
                          b6.classList.add('nextLoc');
                          b6.style.backgroundColor = null;
                      }
                  }

              };
              switch(getLocation){
                  case "2":
                      if(b7.innerHTML === ''){
                          b7.classList.add('nextLoc');
                          b7.style.backgroundColor = null;
                          if(b8.innerHTML === ''){
                              b8.classList.add('nextLoc');
                              b8.style.backgroundColor = null;
                          }
                      }
                      whitePawnAttack();
                      break;
                  case "3":
                  case "4":
                  case "5":
                  case "6":
                  case "7":
                      if(b7.innerHTML === ''){
                          b7.classList.add('nextLoc');
                          b7.style.backgroundColor = null;
                      }
                      whitePawnAttack();
                      break;
                  default: console.log('false Location');
          }}
          removeUselessNextLocations(chessPiece[2]);
        break;
      case "fa-chess-rook":
          for(let y = yPos-1; y > 0;y--) {
              document.getElementById(xPos + y).classList.add('nextLoc');
              document.getElementById(xPos + y).style.backgroundColor = null;
              if(document.getElementById(xPos + y).innerHTML !== ''){
                  break;
                  }
          }

          for (let y = parseInt(yPos)+1; y<=8;y++){
              console.log(document.getElementById(xPos + y));
              document.getElementById(xPos + y).classList.add('nextLoc');
              document.getElementById(xPos + y).style.backgroundColor = null;
              if(document.getElementById(xPos + y).innerHTML !== ''){
                  break;}
          }
          for(let x = xPosInNum+1; x<=8;x++){
              document.getElementById(items[1][x] + yPos).classList.add('nextLoc');
              document.getElementById(items[1][x] + yPos).style.backgroundColor = null;
              if(document.getElementById(items[1][x] + yPos).innerHTML !== ''){
                  break;}
          }
          for(let x = xPosInNum-1; x>0;x--){
              document.getElementById(items[1][x] + yPos).classList.add('nextLoc');
              document.getElementById(items[1][x] + yPos).style.backgroundColor = null;
              if(document.getElementById(items[1][x] + yPos).innerHTML !== ''){
                  break;}
          }
          removeUselessNextLocations(chessPiece[2]);
          break;
      case "fa-chess-king":
          const a1 = document.getElementById(xPos + (yPos-1));
          if(a1){a1.classList.add('nextLoc');
          a1.style.backgroundColor = null;}

          const a2 = document.getElementById(xPos + (yPos+1));
          if(a2){a2.classList.add('nextLoc');
          a2.style.backgroundColor = null;}

          const a3 = document.getElementById(items[1][xPosInNum+1] + yPos);
          if(a3){a3.classList.add('nextLoc');
          a3.style.backgroundColor = null;}

          const a4 = document.getElementById(items[1][xPosInNum+1] + (yPos+1));
          if(a4){a4.classList.add('nextLoc');
          a4.style.backgroundColor = null;}

          const a5 = document.getElementById(items[1][xPosInNum+1] + (yPos-1));
          if(a5){a5.classList.add('nextLoc');
          a5.style.backgroundColor = null;}

          const a6 = document.getElementById(items[1][xPosInNum-1] + yPos);
          if(a6){a6.classList.add('nextLoc');
          a6.style.backgroundColor = null;}

          const a7 = document.getElementById(items[1][xPosInNum-1] + (yPos+1));
          if(a7){a7.classList.add('nextLoc');
          a7.style.backgroundColor = null;}

          const a8 = document.getElementById(items[1][xPosInNum-1] + (yPos-1));
          if(a8){a8.classList.add('nextLoc');
          a8.style.backgroundColor = null;}

          removeUselessNextLocations(chessPiece[2]);
        break;
      case "fa-chess-bishop":
          let i =1;
          for(let y = yPos-1; y > 0;y--) {
              if(xPosInNum-i === 0){break;}
              let temp = document.getElementById(items[1][xPosInNum-i] + (y));
              temp.classList.add('nextLoc');
              temp.style.backgroundColor = null;
              i++;
              if(temp.innerHTML !== ''){
                  break;
              }
          }
          i =1;
          for(let y = yPos-1; y > 0;y--) {
              if(xPosInNum+i === 9){break;}
              let temp = document.getElementById(items[1][xPosInNum+i] + (y));
              temp.classList.add('nextLoc');
              temp.style.backgroundColor = null;
              i++;
              if(temp.innerHTML !== ''){
                  break;
              }
          }
          i =1;
          for (let y = (yPos+1); y<=8;y++){
              if(xPosInNum+i === 9){break;}
              let temp = document.getElementById(items[1][xPosInNum+i] + (y));
              temp.classList.add('nextLoc');
              temp.style.backgroundColor = null;
              i++;
              if(temp.innerHTML !== ''){
                  break;
              }
          }
          i=1;
          for (let y = (yPos+1); y<=8;y++){
              if(xPosInNum-i === 0){break;}
              let temp = document.getElementById(items[1][xPosInNum-i] + (y));
              temp.classList.add('nextLoc');
              temp.style.backgroundColor = null;
              i++;
              if(temp.innerHTML !== ''){
                  break;
              }
          }
          removeUselessNextLocations(chessPiece[2]);
          break;
      case "fa-chess-queen":
          for(let y = yPos-1; y > 0;y--) {
              document.getElementById(xPos + y).classList.add('nextLoc');
              document.getElementById(xPos + y).style.backgroundColor = null;
              if(document.getElementById(xPos + y).innerHTML !== ''){
                  break;
              }
          }

          for (let y = parseInt(yPos)+1; y<=8;y++){
              console.log(document.getElementById(xPos + y));
              document.getElementById(xPos + y).classList.add('nextLoc');
              document.getElementById(xPos + y).style.backgroundColor = null;
              if(document.getElementById(xPos + y).innerHTML !== ''){
                  break;}
          }
          for(let x = xPosInNum+1; x<=8;x++){
              document.getElementById(items[1][x] + yPos).classList.add('nextLoc');
              document.getElementById(items[1][x] + yPos).style.backgroundColor = null;
              if(document.getElementById(items[1][x] + yPos).innerHTML !== ''){
                  break;}
          }
          for(let x = xPosInNum-1; x>0;x--){
              document.getElementById(items[1][x] + yPos).classList.add('nextLoc');
              document.getElementById(items[1][x] + yPos).style.backgroundColor = null;
              if(document.getElementById(items[1][x] + yPos).innerHTML !== ''){
                  break;}
          }
          let j =1;
          for(let y = yPos-1; y > 0;y--) {
              if(xPosInNum-j === 0){break;}
              let temp = document.getElementById(items[1][xPosInNum-j] + (y));
              temp.classList.add('nextLoc');
              temp.style.backgroundColor = null;
              j++;
              if(temp.innerHTML !== ''){
                  break;
              }
          }
          j =1;
          for(let y = yPos-1; y > 0;y--) {
              if(xPosInNum+j === 9){break;}
              let temp = document.getElementById(items[1][xPosInNum+j] + (y));
              temp.classList.add('nextLoc');
              temp.style.backgroundColor = null;
              j++;
              if(temp.innerHTML !== ''){
                  break;
              }
          }
          j =1;
          for (let y = (yPos+1); y<=8;y++){
              if(xPosInNum+j === 9){break;}
              let temp = document.getElementById(items[1][xPosInNum+j] + (y));
              temp.classList.add('nextLoc');
              temp.style.backgroundColor = null;
              j++;
              if(temp.innerHTML !== ''){
                  break;
              }
          }
          j=1;
          for (let y = (yPos+1); y<=8;y++){
              if(xPosInNum-j === 0){break;}
              let temp = document.getElementById(items[1][xPosInNum-j] + (y));
              temp.classList.add('nextLoc');
              temp.style.backgroundColor = null;
              j++;
              if(temp.innerHTML !== ''){
                  break;
              }
          }
          removeUselessNextLocations(chessPiece[2]);
          break;
      case "fa-chess-knight":
          const d1 = document.getElementById(items[1][xPosInNum+1] + (yPos+2));
          if(d1){d1.classList.add('nextLoc');
              d1.style.backgroundColor = null;}
          const d2 = document.getElementById(items[1][xPosInNum+1] + (yPos-2));
          if(d2){d2.classList.add('nextLoc');
              d2.style.backgroundColor = null;}

          const d3 = document.getElementById(items[1][xPosInNum-1] + (yPos+2));
          if(d3){d3.classList.add('nextLoc');
              d3.style.backgroundColor = null;}
          const d4 = document.getElementById(items[1][xPosInNum-1] + (yPos-2));
          if(d4){d4.classList.add('nextLoc');
              d4.style.backgroundColor = null;}

          const d5 = document.getElementById(items[1][xPosInNum+2] + (yPos+1));
          if(d5){d5.classList.add('nextLoc');
              d5.style.backgroundColor = null;}
          const d6 = document.getElementById(items[1][xPosInNum+2] + (yPos-1));
          if(d6){d6.classList.add('nextLoc');
              d6.style.backgroundColor = null;}

          const d7 = document.getElementById(items[1][xPosInNum-2] + (yPos+1));
          if(d7){d7.classList.add('nextLoc');
              d7.style.backgroundColor = null;}
          const d8 = document.getElementById(items[1][xPosInNum-2] + (yPos-1));
          if(d8){d8.classList.add('nextLoc');
              d8.style.backgroundColor = null;}
          removeUselessNextLocations(chessPiece[2]);

          break;
      default: console.log('unknown chess piece detected');
  }
};

const removeUselessNextLocations = (chessColor)=>{
    let a = [];
    let i=0;
    let myTargets = document.getElementsByClassName('nextLoc');
    //needed to expand to two for-loops as it wasn't working with one (reason unknown)
    for(let item of myTargets){
        if(item.hasChildNodes() === true){
        if(item.classList.contains('cords') || item.firstElementChild.classList.contains(chessColor)){
            a[i] = item.id;
            i++;
            }
        }else if(item.id === 'z0'){
            a[i] = item.id;
            i++;
        }}
    for(let j of a){
        document.getElementById(j).classList.remove('nextLoc');
    }
};

/*former one for-loop solution (not working)
const removeUselessNextLocations = (chessColor)=>{
    let myTargets = document.getElementsByClassName('nextLoc');
    console.log(myTargets);
    for(let item of myTargets){
        if(item.hasChildNodes() === true){
        if(item.classList.contains('cords') || item.firstElementChild.classList.contains(chessColor)){
            document.getElementById(item.id).classList.remove('nextLoc');
            }
        }}
};
*/
const chessSideBar = () =>{
  const rightSiteBar = document.createElement('table');
  rightSiteBar.id = 'chessRightSiteBar';

    const rightTrack1 = document.createElement('tr');
    rightTrack1.id = 'deadWhiteChessPieces';
    const rightCol1 = document.createElement('td');
    const rightCol1_2 = document.createElement('td');
    rightCol1_2.innerHTML = '<i class="fas fa-khanda"></i>';
    rightCol1.classList.add('mh-5');
    rightCol1.innerHTML = '<i class="fas fa-chess-queen"></i><i class="fas fa-chess-queen"></i><i class="fas fa-chess-rook"></i><i class="fas fa-chess-pawn"></i><i class="fas fa-chess-pawn"></i><i class="fas fa-chess-pawn"></i><i class="fas fa-chess-pawn"></i><i class="fas fa-chess-pawn"></i><i class="fas fa-chess-pawn"></i><i class="fas fa-chess-pawn"></i><i class="fas fa-chess-pawn"></i><i class="fas fa-chess-pawn"></i>';
    rightTrack1.appendChild(rightCol1_2);
    rightTrack1.appendChild(rightCol1);
    rightSiteBar.appendChild(rightTrack1);

    //will show the leftover time, wins:loses, who's turn it is right now etc.
    const rightTrack2 = document.createElement('tr');
    rightTrack2.classList.add('StatsPanel');
    const rightCol2 = document.createElement('td');
    rightTrack2.appendChild(rightCol2);
    rightSiteBar.appendChild(rightTrack2);

    const rightTrack3 = document.createElement('tr');
    rightTrack3.id = 'deadBlackChessPieces';
    const rightCol3 = document.createElement('td');
    const rightCol3_2 = document.createElement('td');
    rightCol3_2.innerHTML = '<i class="fas fa-khanda"></i>';
    rightCol3.classList.add('mh-5');
    rightCol3.innerHTML = '<i class="fas fa-chess-pawn"></i><i class="fas fa-chess-queen"></i><i class="fas fa-chess-rook"></i><i class="fas fa-chess-queen"></i><i class="fas fa-chess-pawn"></i><i class="fas fa-chess-pawn"></i><i class="fas fa-chess-pawn"></i><i class="fas fa-chess-pawn"></i><i class="fas fa-chess-pawn"></i><i class="fas fa-chess-pawn"></i><i class="fas fa-chess-pawn"></i><i class="fas fa-chess-pawn"></i>';
    rightTrack3.appendChild(rightCol3_2);
    rightTrack3.appendChild(rightCol3);
    rightSiteBar.appendChild(rightTrack3);

    document.getElementById('chessWrapper').appendChild(rightSiteBar);
};
/*
* chessNotification() creates the notification-panel for the chess game
* all game-intern-notifications will  be displayed as an extension of it
*
* chessNotification is recreated whenever a new notification should be shown
* reason: window can be changed (size) in the middle of the game -> absolute position
* i could have just updated the position, but that can be saved for the poor dude (future me) who probably refactors everything
* */

const chessLightbox = ()=>{
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.id = 'chessLightbox';
    document.getElementById('chessWrapper').appendChild(lightbox);
};
const chessNotification = ()=>{
    const choosingPanel = document.createElement('div');
    // choosingPanel.innerHTML = "<i class='fas fa-crown'></i>";
    choosingPanel.id = 'chessNotification';
    document.getElementById('chessLightbox').appendChild(choosingPanel);
    const notificationStyle = document.getElementById('chessNotification').style;
    //Position of the row id='8' === uppermost row of the board
    const getPosition = document.getElementById('8').getBoundingClientRect();
    notificationStyle.top = getPosition.top+4 + 'px';
    notificationStyle.left = getPosition.left-1 + 'px';
    notificationStyle.width = getPosition.width+1 + 'px';
    notificationStyle.height = document.getElementById('chess_layout').getBoundingClientRect().height+1 + 'px'; //height of board
};

const pawnSwapNotification = (triggerElement, color) =>{
    chessNotification();
    // let pawn = this
    //let color = 'deadWhiteChessPieces';
    document.getElementById('chessLightbox').classList.add('chessShow');
    let choices = [];
    const deadChessPieces = document.getElementById(color).getElementsByTagName('td')[1].children;
    for(let item of deadChessPieces){
        let itemClass = item.classList[1];
        if(!(itemClass === "fa-chess-pawn") && !choices.includes(itemClass)){
            choices.push(itemClass);
        }
        /*console.log(item);
        if(item.classList.contains("fa-chess-queen")) {
            chessPiece = document.createElement('i');
            chessPiece.classList.add('fas fa-chess-queen');
            document.getElementById('chessNotification').appendChild(chessPiece);
        }*/
    }
    const output = document.getElementById('chessNotification');
    for(let i = 0; i<choices.length;i++){
        let iButton = document.createElement('a');
        iButton.id = choices[i];
        let iElement = document.createElement('i');
        iElement.classList.add('fas');
        iElement.classList.add(choices[i]);
        iElement.id = choices[i];
        iButton.appendChild(iElement);

        iButton.addEventListener('click', (ev)=>{
            const eventTarget = ev.target.id;
            //remove the selected chess piece from deadChessPieces
            const deadRemove = document.getElementById(color).children[1];
            for(let item of deadRemove.children){
                if(item.classList.contains(eventTarget)){
                    deadRemove.removeChild(item);
                    break;
                }
            }
            //remove the pawnSwapNotification
            const toRemove = document.getElementById('chessLightbox').innerHTML = '';
            document.getElementById('chessLightbox').classList.remove('chessShow');
            const target = document.getElementById(triggerElement.id);
            console.log(target);
            target.removeChild(target.childNodes[0]);
            target.appendChild(iElement);
            (color === "deadWhiteChessPieces")? target.firstElementChild.classList.add('chess_white') : target.firstElementChild.classList.add('chess_black');
        });
        output.appendChild(iButton);
    }

};

const winningNotification = (color) =>{
    //TODO add winning notification
};

