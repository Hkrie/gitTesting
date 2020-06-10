const items = [
    [8,7,6,5,4,3,2,1,0],
    ['z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

];
let firstTarget = null;

document.addEventListener("DOMContentLoaded", function(event) {

    //ll.4 - 87 create chess board with all chess pieces
    const table = document.createElement('table');
    table.id = 'chess_layout';
    document.body.appendChild(table);



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
        if(_this.firstChild != null){
        if((_this.firstChild.classList.contains('chess_white') && this2.firstChild.classList.contains('chess_white'))
        || (_this.firstChild.classList.contains('chess_black') && this2.firstChild.classList.contains('chess_black'))){
            console.log('equal color');
            document.getElementById(_this.id).style.backgroundColor = "initial";
            document.getElementById(this2.id).style.backgroundColor = "initial";
            return 1;
        }
        }
        //console.log(" The first chess piece moved was: ");
        //console.log(this2.id);
        //console.log(" The second chess piece moved was: ");
        //console.log(_this.id);
        if(_this.innerHTML === '<i class="fas fa-chess-king"></i>'){window.alert('Black wins the game')}
        else if(_this.innerHTML === '<i class="fas fa-chess-king chess_black"></i>'){window.alert('White wins the game')}
        if(this2.innerHTML !== ""){
            document.getElementById(_this.id).innerHTML = document.getElementById(this2.id).innerHTML;
            document.getElementById(this2.id).innerHTML = null;

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
          //const currentLocation = yPos;
          switch(getLocation){
              case "7":
                  document.getElementById(xPos + (yPos-1)).classList.add('nextLoc');
                  document.getElementById(xPos + (yPos-1)).style.backgroundColor = null;
                  document.getElementById(xPos + (yPos-2)).classList.add('nextLoc');
                  document.getElementById(xPos + (yPos-2)).style.backgroundColor = null;
                  break;
              case "6":
              case "5":
              case "4":
              case "3":
              case "2":
                  document.getElementById(xPos + (yPos-1)).classList.add('nextLoc');
                  document.getElementById(xPos + (yPos-1)).style.backgroundColor = null;
                  break;
              default: console.log('false Location');
          }}else{
              switch(getLocation){
                  case "2":console.log(xPos + (yPos+1));
                      document.getElementById(xPos + (yPos+1)).classList.add('nextLoc');
                      document.getElementById(xPos + (yPos+1)).style.backgroundColor = null;
                      document.getElementById(xPos + (yPos+2)).classList.add('nextLoc');
                      document.getElementById(xPos + (yPos+2)).style.backgroundColor = null;
                      break;
                  case "3":
                  case "4":
                  case "5":
                  case "6":
                  case "7":
                      document.getElementById(xPos + (yPos+1)).classList.add('nextLoc');
                      document.getElementById(xPos + (yPos+1)).style.backgroundColor = null;
                      break;
                  default: console.log('false Location');
          }}
        break;
      case "fa-chess-rook":
          for(let y = yPos-1; y > 0;y--) {
              document.getElementById(xPos + y).classList.add('nextLoc');
              document.getElementById(xPos + y).style.backgroundColor = null;
              if(document.getElementById(xPos + y).innerHTML !== ''){
                  removeUselessNextLocations(chessPiece[2]);
                  break;
                  }
          }

          for (let y = parseInt(yPos)+1; y<=8;y++){
              console.log(document.getElementById(xPos + y));
              document.getElementById(xPos + y).classList.add('nextLoc');
              document.getElementById(xPos + y).style.backgroundColor = null;
              if(document.getElementById(xPos + y).innerHTML !== ''){
                  removeUselessNextLocations(chessPiece[2]);
                  break;}
          }
          for(let x = xPosInNum+1; x<=8;x++){
              document.getElementById(items[1][x] + yPos).classList.add('nextLoc');
              document.getElementById(items[1][x] + yPos).style.backgroundColor = null;
              if(document.getElementById(items[1][x] + yPos).innerHTML !== ''){
                  removeUselessNextLocations(chessPiece[2]);
                  break;}
          }
          for(let x = xPosInNum-1; x>0;x--){
              document.getElementById(items[1][x] + yPos).classList.add('nextLoc');
              document.getElementById(items[1][x] + yPos).style.backgroundColor = null;
              if(document.getElementById(items[1][x] + yPos).innerHTML !== ''){
                  removeUselessNextLocations(chessPiece[2]);
                  break;}
          }
          break;
      case "fa-chess-king":
          const a1 = document.getElementById(xPos + (yPos-1));
          a1.classList.add('nextLoc');
          a1.style.backgroundColor = null;

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
  }
};

const removeUselessNextLocations = (chessColor)=>{
    let a = [];
    let i=0;
    let myTargets = document.getElementsByClassName('nextLoc');
    console.log(myTargets);
    //needed to expand to two for-loops as it wasn't working with one (reason unknown)
    for(let item of myTargets){
        if(item.hasChildNodes() === true){
        if(item.classList.contains('cords') || item.firstElementChild.classList.contains(chessColor)){
            a[i] = item.id;
            i++;
            }}}
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

