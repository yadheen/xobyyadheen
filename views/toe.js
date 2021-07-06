 const cellelem = document.querySelectorAll('[datacell]');
 const pop = document.querySelector('.pop')
 const popcontent = document.querySelector('#popcontent')
 const body = document.querySelector('body')
 const restart = document.querySelector('#restart_butt')
 const sw1 = document.querySelector('#sw1')
 const sw2 = document.querySelector('#sw2')


 import { io } from 'socket.io-client';
 const socket = io("http://localhost:3000");



 restart.addEventListener('click', start)
 const win = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6]

 ]
 let flag
 let turn

 start()

 // const swbutton = document.getElementById('swbutt');
 // swbutton.addEventListener('click', switchclick);

 // function switchclick() {
 //     if (!turn) {
 //         swbutton.innerHTML = 'O';
 //         turn = !turn
 //     } else {
 //         swbutton.innerHTML = 'X';
 //         turn = !turn

 //     }
 // }


 function start() {

     remove()
     console.log('h')


     turn = 0
     sw1.classList.add('show')
     sw2.classList.remove('show')

     cellelem.forEach(cell => {
         cell.innerHTML = "";
         cell.disabled = false
         cell.addEventListener('click', clickevent, { once: true });
         cell.addEventListener('mouseover', onmouseover);
         cell.addEventListener('mouseout', onmouseout);
     })
 }
 let temp
 let hoverflag

 function add() {
     body.classList.add('show')
     popcontent.classList.add('show')

     pop.classList.add('show')
 }

 function remove() {

     popcontent.innerHTML = ``
     body.classList.remove('show')
     pop.classList.remove('show')
     popcontent.classList.remove('show')

 }

 function onmouseout(e) {
     const cell = e.target
     cell.innerHTML = ""


 }

 function onmouseover(e) {
     console.log("mouse")
     const cell = e.target;
     // console.log([...cellelem].indexOf(cell))

     if (!turn) {

         cell.innerHTML = 'X';

     } else {

         cell.innerHTML = 'O';


     }
 }

 function clickevent(e) {

     // swbutton.disabled = true;

     const cell = e.target;
     cell.disabled = true
     if (!turn) {
         cell.innerHTML = 'X';


     } else {
         cell.innerHTML = 'O';




     }
     temp = cell.innerHTML
     if (iswin(temp)) {
         cellelem.forEach(i => {
             i.disabled = true
         })


         setTimeout(() => {
             popcontent.innerHTML = `${temp} WON`

             add()
             respawn()



         }, 1000);

     } else if (isdraw()) {


         setTimeout(() => {
             popcontent.innerHTML = `DRAW`

             respawn()


         }, 1000);
     }

     hover();

     turn = !turn
 }

 function hover() {
     if (turn) {
         sw2.classList.remove('show')
         sw1.classList.add('show')


     } else {
         sw1.classList.remove('show')
         sw2.classList.add('show')
     }

 }

 function respawn() {
     setTimeout(() => {
         // location.reload();
         start();

     }, 3000);
 }

 function isdraw() {

     return [...cellelem].every(cell => {
         return (cell.innerHTML == 'X' || cell.innerHTML == 'O')
     })
 }

 function iswin(e) {

     return win.some(comb => {
         return comb.every(i => {


             return (cellelem[i].innerHTML == (e))

         })
     })

 }