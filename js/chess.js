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
        if(document.getElementById(_this.id).innerHTML === ""){
            document.getElementById(_this.id).style.backgroundColor = "initial";
            if(this2 !== null){document.getElementById(this2.id).style.backgroundColor = "initial";}
            return 2;}
        return -1
    }else if(_this && this2){
       /* if((document.getElementById(_this.id).firstChild.classList.contains('chess_white') && document.getElementById(this2.id).classList.contains('chess_white'))
        || (document.getElementById(_this.id).classList.contains('chess_black') && document.getElementById(this2.id).classList.contains('chess_black'))){
            console.log('equal color');
            document.getElementById(_this.id).style.backgroundColor = "initial";
            document.getElementById(this2.id).style.backgroundColor = "initial";
            return 1;
        }*/
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
/*
const createWinningNotification = (color)=>{
    const notificationPanel = document.createElement('div');
    notificationPanel.classList.add('chessWinningNotificationPanel');
    const notificationPanelContent = document.createElement('span');
    notificationPanelContent.classList.add('chessWinningNotificationPanelContent');
    notificationPanelContent.innerHTML = color + " wins the game";
    notificationPanel.classList.add('active');
    document.body.appendChild(notificationPanel);
    notificationPanel.appendChild(notificationPanelContent);
};*/
